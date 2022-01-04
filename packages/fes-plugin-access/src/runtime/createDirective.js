import { watch } from 'vue';

const cache = new WeakMap();
const setDisplay = (el, access) => {
    if (access.value) {
        el.style.display = el._display;
    } else {
        el.style.display = 'none';
    }
};
export default function createDirective(useAccess) {
    return {
        beforeMount(el) {
            const ctx = {};
            ctx.watch = (path) => {
                el._display = el._display || el.style.display;
                const access = useAccess(path);
                setDisplay(el, access);
                return watch(access, () => {
                    setDisplay(el, access);
                });
            };
            cache.set(el, ctx);
        },
        mounted(el, binding) {
            const ctx = cache.get(el);
            if (ctx.unwatch) {
                ctx.unwatch();
            }
            ctx.unwatch = ctx.watch(binding.value);
        },
        updated(el, binding) {
            const ctx = cache.get(el);
            if (ctx.unwatch) {
                ctx.unwatch();
            }
            ctx.unwatch = ctx.watch(binding.value);
        },
        beforeUnmount(el) {
            const ctx = cache.get(el);
            if (ctx.unwatch) {
                ctx.unwatch();
            }
        }
    };
}
