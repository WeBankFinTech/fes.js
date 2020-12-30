const requestMap = new Map();

export default async (ctx, next) => {
    const key = ctx.key;
    if (requestMap.get(key)) {
        ctx.error = {
            type: 'REPEAT',
            msg: '重复请求'
        };
        return;
    }
    requestMap.set(key, true);

    await next();

    requestMap.delete(key);
};
