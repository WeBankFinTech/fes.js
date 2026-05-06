import type { IPluginAPI } from '@fesjs/shared';
import type { Server as HttpsServer } from 'node:https';
import type { ViteDevServer } from 'vite';
import os from 'node:os';
import process from 'node:process';
import pc from 'picocolors';
import { createServer as createViteServer } from 'vite';
import getDevConfig from './getDevConfig';

interface Args {
    args?: Record<string, any>;
    rawArgv?: Record<string, any>;
    options?: Record<string, any>;
    program?: any;
    https?: boolean;
}

// Vite 8 uses http2.createSecureServer when HTTPS is enabled, which creates
// Http2ServerRequest/Http2ServerResponse objects that are incompatible with
// Connect middleware (parseurl, finalhandler, etc.).
// This function replaces the HTTP/2 server with a standard HTTPS server
// that produces compatible IncomingMessage/ServerResponse objects.
async function replaceHttp2WithHttps(server: ViteDevServer): Promise<HttpsServer | undefined> {
    const httpServer = server.httpServer;
    if (!httpServer || (httpServer as any).constructor.name !== 'Http2SecureServer') {
        return undefined;
    }

    // Extract the TLS credentials from the HTTP/2 server
    const secureContext = (httpServer as any)._sharedCreds;
    if (!secureContext?.context) {
        return undefined;
    }

    // Get the resolved HTTPS options from Vite config
    const httpsOptions = (server.config as any).server?.https;
    if (!httpsOptions) {
        return undefined;
    }

    // Migrate upgrade listeners (for WebSocket/HMR) from the old server
    // before closing it, so they can be re-attached to the new server.
    const upgradeListeners = (httpServer as any).listeners('upgrade').slice();

    // Create a standard HTTPS server
    const https = await import('node:https');
    const newServer = https.createServer(httpsOptions, server.middlewares);

    // Re-attach upgrade listeners to the new server
    for (const listener of upgradeListeners) {
        newServer.on('upgrade', listener);
    }

    // Close the HTTP/2 server (it hasn't started listening yet)
    httpServer.close();

    // Replace the httpServer reference on the Vite server object
    (server as any).httpServer = newServer;

    return newServer;
}

export default (api: IPluginAPI) => {
    const {
        paths,
        utils: { rimraf },
    } = api;

    let server: ViteDevServer | undefined;
    let customHttpsServer: HttpsServer | undefined;

    function destroy() {
        customHttpsServer?.close();
        if (server) {
            server.close().catch(() => {});
        }
    }

    api.registerCommand({
        command: 'dev',
        description: 'start a local http service for development',
        options: [
            {
                name: '--port',
                description: 'http service port, like 8000',
            },
            {
                name: '--https',
                description: 'whether to turn on the https service',
            },
        ],
        async fn({ args = {} }: Args) {
            rimraf.sync(paths.absTmpPath);

            await api.applyPlugins({
                key: 'onGenerateFiles',
                type: api.ApplyPluginsType.event,
            });

            await api.startWatch();

            server = await createViteServer(await getDevConfig(api, args));

            // Replace HTTP/2 server with standard HTTPS if applicable
            customHttpsServer = await replaceHttp2WithHttps(server);

            if (customHttpsServer) {
                // For custom HTTPS server, we need to listen manually
                // because Vite's internal listen() uses the old httpServer closure
                const port = server.config.server.port;
                const host = server.config.server.host;
                await new Promise<void>((resolve, reject) => {
                    customHttpsServer!.listen(
                        port,
                        host === true ? undefined : (host as string) || undefined,
                        () => resolve(),
                    );
                    customHttpsServer!.on('error', reject);
                });

                // Set resolvedUrls for printUrls()
                const resolvedPort = (customHttpsServer.address() as any).port;
                const base = server.config.base === './' || server.config.base === '' ? '/' : server.config.base;
                const networkInterfaces = os.networkInterfaces();
                const networkUrls: string[] = [];
                for (const nInterface of Object.values(networkInterfaces)) {
                    for (const detail of nInterface ?? []) {
                        if (detail.family === 'IPv4' && detail.address && !detail.address.includes('127.0.0.1')) {
                            networkUrls.push(`https://${detail.address}:${resolvedPort}${base}`);
                        }
                    }
                }
                (server as any).resolvedUrls = {
                    local: [`https://localhost:${resolvedPort}${base}`],
                    network: networkUrls,
                };
            }
            else {
                await server.listen();
            }

            server.printUrls();

            return {
                destroy,
            };
        },
    });

    api.registerMethod({
        name: 'restartServer',
        fn() {
            // eslint-disable-next-line no-console
            console.log(pc.gray('Try to restart dev server...'));
            destroy();
            if (typeof process !== 'undefined' && process.send) {
                process.send({
                    type: 'RESTART',
                });
            }
        },
    });
};
