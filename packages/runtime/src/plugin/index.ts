import { assert } from '../utils';

interface ComposeOptions {
    fns: Array<(...args: any[]) => any>;
    args?: any;
}

function _compose({ fns, args }: ComposeOptions) {
    if (fns.length === 1) {
        return fns[0];
    }

    const last = fns.pop();

    return fns.reduce((a, b) => () => b(a, args), last) as (...args: any[]) => any;
}

function isPromiseLike(obj: any): obj is Promise<any> {
    return !!obj && typeof obj === 'object' && typeof obj.then === 'function';
}

export const ApplyPluginsType = {
    compose: 'compose',
    event: 'event',
    modify: 'modify',
} as const;

type ApplyPluginsTypeEnum = typeof ApplyPluginsType[keyof typeof ApplyPluginsType];

interface PluginOptions {
    validKeys?: string[];
}

interface PluginApply {
    [key: string]: any[];
}

interface PluginItem {
    apply: PluginApply;
    path: string;
}

interface Shared {
    [key: string]: any;
}

interface Hooks {
    [key: string]: any[];
}

interface ApplyPluginsOptions<T = any> {
    key: string;
    type: ApplyPluginsTypeEnum;
    initialValue?: T;
    args?: any;
    async?: boolean;
}

export default class Plugin {
    private validKeys: string[];
    private hooks: Hooks;
    private shared: Shared;

    constructor(opts?: PluginOptions) {
        this.validKeys = opts?.validKeys || [];
        this.hooks = {};
        // 共享
        this.shared = {};
    }

    share(key: string, obj: any): void {
        assert(!Object.keys(this.shared).includes(key), 'share failed, key repeat');
        this.shared[key] = obj;
    }

    getShared<T = any>(key: string): T {
        return this.shared[key];
    }

    register(plugin: PluginItem): void {
        assert(!!plugin.apply, 'register failed, plugin.apply must supplied');
        assert(!!plugin.path, 'register failed, plugin.path must supplied');
        Object.keys(plugin.apply).forEach((key) => {
            assert(this.validKeys.includes(key), `register failed, invalid key ${key} from plugin ${plugin.path}.`);
            if (!this.hooks[key]) {
                this.hooks[key] = [];
            }
            this.hooks[key] = this.hooks[key].concat(plugin.apply[key]);
        });
    }

    getHooks(keyWithDot: string): any[] {
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
                    }
                    catch {
                        return null;
                    }
                })
                .filter(Boolean);
        }
        return hooks;
    }

    applyPlugins<T = any>({ key, type, initialValue, args, async }: ApplyPluginsOptions<T>): T | Promise<T> {
        const hooks = this.getHooks(key) || [];

        if (args) {
            assert(typeof args === 'object', 'applyPlugins failed, args must be plain object.');
        }

        switch (type) {
            case ApplyPluginsType.modify:
                if (async) {
                    return hooks.reduce(
                        async (memo, hook) => {
                            assert(
                                typeof hook === 'function' || typeof hook === 'object' || isPromiseLike(hook),
                                `applyPlugins failed, all hooks for key ${key} must be function, plain object or Promise.`,
                            );
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
                        isPromiseLike(initialValue) ? initialValue : Promise.resolve(initialValue),
                    );
                }
                return hooks.reduce((memo, hook) => {
                    assert(
                        typeof hook === 'function' || typeof hook === 'object',
                        `applyPlugins failed, all hooks for key ${key} must be function or plain object.`,
                    );
                    if (typeof hook === 'function') {
                        return hook(memo, args);
                    }
                    return { ...memo, ...hook };
                }, initialValue as any);

            case ApplyPluginsType.event:
                return hooks.forEach((hook) => {
                    assert(typeof hook === 'function', `applyPlugins failed, all hooks for key ${key} must be function.`);
                    hook(args);
                }) as any;

            case ApplyPluginsType.compose: {
                const composed = _compose({
                    fns: hooks.concat(initialValue as any),
                    args,
                });
                return composed as unknown as T;
            }
            default:
                return null as any;
        }
    }
}
