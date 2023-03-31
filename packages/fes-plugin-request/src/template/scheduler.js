class Scheduler {
    constructor() {
        this.middlewares = [];
    }

    use(fn) {
        if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
        this.middlewares.push(fn);
        return this;
    }

    compose() {
        return (context, next) => {
            let index = -1;
            const dispatch = (i) => {
                if (i <= index) return Promise.reject(new Error('next() called multiple times'));
                index = i;
                let fn = this.middlewares[i];
                if (index === this.middlewares.length) fn = next;
                if (!fn) return Promise.resolve();
                try {
                    return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
                } catch (e) {
                    return Promise.reject(e);
                }
            };
            return dispatch(0);
        };
    }
}

export default new Scheduler();
