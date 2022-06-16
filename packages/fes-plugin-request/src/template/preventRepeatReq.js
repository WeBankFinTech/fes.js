const requestMap = new Map();

const mergeRequestMap = new Map();
const requestQueue = new Map();

function handleCachingStart(ctx) {
    const isRequesting = mergeRequestMap.get(ctx.key);
    if (isRequesting) {
        return new Promise((resolve) => {
            const queue = requestQueue.get(ctx.key) || [];
            requestQueue.set(ctx.key, queue.concat(resolve));
        });
    }
    mergeRequestMap.set(ctx.key, true);
}

function handleRepeatRequest(ctx) {
    const queue = requestQueue.get(ctx.key);
    if (queue && queue.length > 0) {
        queue.forEach((resolve) => {
            if (ctx.error) {
                resolve({
                    error: ctx.error,
                });
            } else {
                resolve({
                    response: ctx.response,
                });
            }
        });
    }
    requestQueue.delete(ctx.key);
    mergeRequestMap.delete(ctx.key);
}

export default async (ctx, next) => {
    if (ctx.config.mergeRequest) {
        const result = await handleCachingStart(ctx);
        if (result) {
            Object.keys(result).forEach((key) => {
                ctx[key] = result[key];
            });
            return;
        }
    } else {
        if (requestMap.get(ctx.key) && !ctx.config.mergeRequest) {
            ctx.error = {
                type: 'REPEAT',
                msg: '重复请求',
                config: ctx.config,
            };
            return;
        }
        requestMap.set(ctx.key, true);
    }

    await next();

    if (ctx.config.mergeRequest) {
        handleRepeatRequest(ctx);
    } else {
        requestMap.delete(ctx.key);
    }
};
