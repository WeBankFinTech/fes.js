<template>
    <div class="layout-left-body">
        <div v-if="!fesFesx.FesHideLeftLogo" :class="{ 'hasLogoEvent': fesFesx.FesLogoEvent }" @click="LogoClick" class="layout-left-logo">
            <img src="~assets/images/logo.png">
            <p>{{fesName}}</p>
        </div>
        <div class="layout-left-menu">
            <fes-route-menu :menu="fesMenu" :type="menuTheme" :mode="menuMode" :auto-close="true" />
        </div>

        <fes-left ref="commonleft" />

        <div v-if="!showCommonLeft" class="layout-left-user">
            <div class="layout-left-user-name">
                <p>{{fesFesx.FesUserName}}</p>
                <p>{{fesFesx.FesRoleName}}</p>
            </div>
            <div class="layout-left-user-logout">
                <Icon @click="logout" type="md-log-out" size="28" />
            </div>
        </div>
    </div>
</template>
<script>
import fesConfig from '../../config';
import _fes from '../../fesx/_fesx';

export default {
    data() {
        // 主题颜色和菜单组件颜色的映射
        const obj = {
            light: 'light',
            blue: 'dark',
            dark: 'dark'
        };
        return {
            fesFesx: _fes,
            menuData: fesConfig.menu || [],
            menuMode: this.$parent.mode,
            menuTheme: obj[this.$parent.theme],
            showCommonLeft: false
        };
    },
    computed: {
        fesName() {
            const fesName = _fes.get('FesName');
            if (fesName.slice(0, 6) === '$i18n.') {
                return this.$t(fesName.slice(6));
            }
            return fesName;
        },
        fesMenu() {
            const menu = this.menuData;
            // 给菜单title搞国际化
            menu.forEach((element) => {
                if (!element.__title) {
                    element.__title = element.title;
                }
                if (element.__title.slice(0, 6) === '$i18n.') {
                    element.title = this.$t(element.__title.slice(6));
                }
                // 子菜单
                if (element.subMenu) {
                    element.subMenu.forEach((son) => {
                        if (!son.__title) {
                            son.__title = son.title;
                        }
                        if (son.__title.slice(0, 6) === '$i18n.') {
                            son.title = this.$t(son.__title.slice(6));
                        }
                    });
                }
            });
            return menu;
        }
    },
    mounted() {
        this.showCommonLeft = this.$refs.commonleft
            && this.$refs.commonleft.$el
            && this.$refs.commonleft.$el.innerHTML
            && this.$refs.commonleft.$el.innerHTML.trim() !== '';

        this.FesApp.on('fes_logout', () => {
            // FesName不能清除
            const fesName = _fes.get('FesName');
            _fes.clear();
            _fes.set('FesName', fesName);
        });
    },
    methods: {
        logout() {
            this.FesApp.set('FesRoleId', null);
            const FesLogoutFn = this.FesApp.get('FesLogout');
            if (this.FesUtil.isFunction(FesLogoutFn)) {
                FesLogoutFn.call(this.FesApp);
            }
            this.FesApp.trigger('fes_logout', this.FesApp);
        },
        LogoClick() {
            const logoClick = this.fesFesx.get('FesLogoEvent');
            if (this.FesUtil.isFunction(logoClick)) {
                logoClick.call(this);
            }
            this.FesApp.trigger('fes_logo_click', this.FesApp);
        }
    }
};
</script>
