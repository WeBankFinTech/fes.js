import portfinder from 'portfinder';

export default async function getPort(userPort) {
    const defaultPort = process.env.PORT || userPort;
    return portfinder.getPortPromise({
        port: defaultPort ? parseInt(String(defaultPort), 10) : 8000,
    });
}
