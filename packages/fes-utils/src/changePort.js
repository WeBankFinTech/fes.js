export default (port) => {
    process.send({
        type: 'UPDATE_PORT',
        port,
    });
};
