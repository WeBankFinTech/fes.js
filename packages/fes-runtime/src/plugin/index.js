/**
 * @copy 该文件代码大部分出自 umi，有需要请参考：
 * https://github.com/umijs/umi/blob/master/packages/runtime/src/Plugin/Plugin.ts
 */

import { assert } from '../utils';

function _compose({ fns, args }) {
    if (fns.length === 1) {
        return fns[0];
    }
    const last = fns.pop();
    return fns.reduce((a, b) => () => b(a, args), last);
}

function isPromiseLike(obj) {
    return !!obj && typeof obj === 'object' && typeof obj.then === 'function';
}

export const ApplyPluginsType = {
    compose: 'compose',
    event: 'event',
    modify: 'modify'
};

export default class Plugin {
    constructor(opts) {
        this.validKeys = opts?.validKeys || [];
        this.hooks = {};
        // 共享
        this.shared = {};
    }

    share(key, obj) {
        assert(!Object.keys(this.shared).includes(key), 'share failed, key repeat');
        this.shared[key] = obj;
    }

    getShared(key) {
        return this.shared[key];
    }

    register(plugin) {
        assert(!!plugin.apply, 'register failed, plugin.apply must supplied');
        assert(!!plugin.path, 'register failed, plugin.path must supplied');
        Object.keys(plugin.apply).forEach((key) => {
            assert(
                this.validKeys.indexOf(key) > -1,
                `register failed, invalid key ${key} from plugin ${plugin.path}.`
            );
            if (!this.hooks[key]) this.hooks[key] = [];
            this.hooks[key] = this.hooks[key].concat(plugin.apply[key]);
        });
    }

    getHooks(keyWithDot) {
        const [key, ...memberKeys] = keyWithDot.split('.');
        let hooks = this.hooks[key] || [];
        if (memberKeys.length) {
            hooks = hooks
                .map((hook) => {
                    try {
                        let ret = hook;
                        for (const memberKey of memberKeys) {
                            ret = ret[memberKey];
                        }
                        return ret;
                    } catch (e) {
                        return null;
                    }
                })
                .filter(Boolean);
        }
        return hooks;
    }

    applyPlugins({
        key,
        type,
        initialValue,
        args,
        async
    }) {
        const hooks = this.getHooks(key) || [];

        if (args) {
            assert(
                typeof args === 'object',
                'applyPlugins failed, args must be plain object.'
            );
        }

        switch (type) {
            case ApplyPluginsType.modify:
                if (async) {
                    return hooks.reduce(
                        async (memo, hook) => {
                            assert(typeof hook === 'function' || typeof hook === 'object' || isPromiseLike(hook),
                                `applyPlugins failed, all hooks for key ${key} must be function, plain object or Promise.`);
                            if (isPromiseLike(memo)) {
                                memo = await memo;
                            }
                            if (typeof hook === 'function') {
                                const ret = hook(memo, args);
                                if (isPromiseLike(ret)) {
                                    return ret;
                                }
                                return ret;
                            }
                            if (isPromiseLike(hook)) {
                                hook = await hook;
                            }
                            return { ...memo, ...hook };
                        },
                        isPromiseLike(initialValue)
                            ? initialValue
                            : Promise.resolve(initialValue)
                    );
                }
                return hooks.reduce((memo, hook) => {
                    assert(
                        typeof hook === 'function' || typeof hook === 'object',
                        `applyPlugins failed, all hooks for key ${key} must be function or plain object.`
                    );
                    if (typeof hook === 'function') {
                        return hook(memo, args);
                    }
                    return { ...memo, ...hook };
                }, initialValue);


            case ApplyPluginsType.event:
                return hooks.forEach((hook) => {
                    assert(
                        typeof hook === 'function',
                        `applyPlugins failed, all hooks for key ${key} must be function.`
                    );
                    hook(args);
                });

            case ApplyPluginsType.compose:
                return () => _compose({
                    fns: hooks.concat(initialValue),
                    args
                })();
            default:
                return null;
        }
    }
}
