import {
    defineComponent,
    computed,
    readonly,
    ref
} from 'vue';
import LayoutNav from './LayoutNav';


export default function generateLayout(config) {
    return defineComponent(() => {
        const menu = readonly(config.menu);
        const themeRef = ref(config.theme);
        const modeRef = ref(config.mode || 'vertical');
        const animateRef = ref(false);
        const leftHiddenRef = ref(false);
        const headerRef = ref(false);
        const rootCls = computed(() => {
            const arr = [
                'layout',
                `layout-mode-${modeRef.value}`,
                `layout-theme-${themeRef.value}`
            ];
            if (leftHiddenRef.value) {
                arr.push('layout-left-hidden');
            }
            if (!headerRef.value) {
                arr.push('layout-header-hide');
            }
            if (animateRef.value) {
                arr.push('layout-animate');
            }
            return arr;
        });
        function toggleMenu() {
            animateRef.value = true;
            setTimeout(() => {
                animateRef.value = false;
            }, 300);
            leftHiddenRef.value = !leftHiddenRef.value;
        }

        return () => (
            <div class={rootCls}>
                <div class="layout-left">
                    <LayoutNav
                        menuMode={modeRef.value}
                        menu={menu}
                        theme={themeRef.value}
                    />
                    {
                        modeRef.value === 'vertical' && (<span onClick={toggleMenu} class="layout-left-fold-menu">
                            <span>
                                <Icon type={`ios-arrow-${leftHiddenRef.value ? 'forward' : 'back'}`} />
                                <Icon type={`ios-arrow-${leftHiddenRef.value ? 'forward' : 'back'}`} />
                            </span>
                        </span>)
                    }
                </div>
                <div class="layout-right">
                    {
                        headerRef.value && (<div class="layout-right-header">
                            <fes-header />
                        </div>)
                    }
                    <div class="layout-right-body">
                        <router-view />
                    </div>
                </div>
            </div >
        );
    });
}
