const net = require('net');

function checkout(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.once('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                resolve(checkout(port + 1));
            }
        });

        server.once('listening', () => {
            server.close(() => {
                resolve(port);
            });
        });

        server.listen(port);
    });
}

module.exports = function getPort(basePort) {
    basePort = basePort || 5000;
    return checkout(basePort);
};
