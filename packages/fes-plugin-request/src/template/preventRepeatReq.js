const requestQueue = new Map();

export default (ctx, next) => {
    const key = ctx.key;
    if (requestQueue.get(key)) {
        ctx.error = {
            type: 'REPEAT',
            msg: '重复请求'
        };
        return;
    }
    requestQueue.set(key, true);

    next();

    requestQueue.delete(key);
};
