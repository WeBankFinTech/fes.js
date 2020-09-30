

import { defineComponent, computed } from 'vue';
import { useFesContext } from '@webank/fes-core';
import RightRender from './RightRender';
import RouteMenu from './RouteMenu.vue';

const DEFAULT_THEME = {
    light: 'light',
    blue: 'dark',
    dark: 'dark'
};

function useMenu(menu) {
    // 根据当前权限控制，显示 ｜ 隐藏菜单
    const { useI18n, accessibleElementTags, accessibleValidator } = useFesContext();
    const accessibleMenu = computed(() => {
        if (accessibleElementTags) {
            const menuData = [];
            // 循环menu，可以访问页面才放入新对象中
            for (let i = 0; i < menu.length; i++) {
                const item = menu[i];
                if (item.path && (!item.subMenu || item.subMenu.length === 0)) {
                    if (accessibleValidator(item.path)) {
                        menuData.push(item);
                    }
                } else if (item.subMenu && item.subMenu.length > 0) {
                    const subMenu = [];
                    for (let j = 0; j < item.subMenu.length; j++) {
                        const subItem = item.subMenu[j];
                        if ((subItem.path && accessibleValidator(subItem.path)) || !subItem.path) {
                            subMenu.push(subItem);
                        }
                    }
                    if (subMenu.length > 0) {
                        menuData.push({
                            ...item,
                            subMenu
                        });
                    }
                } else {
                    menuData.push(item);
                }
            }
            return menuData;
        }
        return menu;
    });
    const localeMenu = computed(() => {
        if (useI18n) {
            const { t } = useI18n();
            // 给菜单title搞国际化
            return accessibleMenu.map((element) => {
                const copyElement = { ...element };
                copyElement.title = t(element.title);
                // 子菜单
                if (copyElement.subMenu) {
                    copyElement.subMenu = element.subMenu.map((son) => {
                        const copySon = { ...son };
                        copySon.title = t(son.title);
                        return copySon;
                    });
                }
                return copyElement;
            });
        }
        return accessibleMenu;
    });
    return localeMenu;
}

export default defineComponent((props) => {
    const clickLogo = () => props.clickLogo && props.clickLogo;
    const menuTheme = computed(() => DEFAULT_THEME[props.theme] || DEFAULT_THEME.light);
    const menu = useMenu(props.menu);

    return () => (
        <div class="layout-left-body">
            <div class={['layout-left-logo', 'has-logo-event' && props.clickLogo]} onClick={clickLogo}>
                <img src="~assets/images/logo.png" />
                <p>{props.projectName}</p>
            </div>
            <div class="layout-left-menu">
                <RouteMenu menu={menu} type={menuTheme} mode={props.menuMode} auto-close={true} />
            </div>
            <RightRender rightRender={props.rightRender} layout={props.layout} />
        </div>
    );
});
