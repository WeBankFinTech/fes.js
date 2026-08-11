import process from 'node:process';

export default (port: number) => {
    process.send?.({
        type: 'UPDATE_PORT',
        port,
    });
};
