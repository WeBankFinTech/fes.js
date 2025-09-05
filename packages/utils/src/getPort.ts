import portfinder from 'portfinder';

export default async function getPort(defaultPort?: string | number): Promise<number> {
    return portfinder.getPortPromise({
        port: defaultPort ? Number.parseInt(String(defaultPort), 10) : 8000,
    });
}
