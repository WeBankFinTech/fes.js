
const throttleMap = new Map();

export default async (ctx, next) => {
    if (ctx.config.throttle) {
        if (throttleMap.get(ctx.key) >= Date.now()) {
            ctx.error = {
                type: 'FREQUENTLY',
                msg: '请求过于频繁'
            };
            return;
        }
    }
    await next();
    throttleMap.set(ctx.key, Date.now() + ctx.config.throttle);
};
