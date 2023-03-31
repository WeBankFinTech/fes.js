import portfinder from 'portfinder';

export default async function getPort(defaultPort) {
    return portfinder.getPortPromise({
        port: defaultPort ? parseInt(String(defaultPort), 10) : 8000,
    });
}
