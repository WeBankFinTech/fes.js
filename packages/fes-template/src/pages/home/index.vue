<template>
    <div class="login-panel">
        <div class="login-panel-swap">
            <div class="logo">
                <span class="logo-text">
                    xx运营平台
                </span>
            </div>
            <div class="split" />
            <div class="login-form">
                <div :class="getStyle('userFocus')" class="line">
                    <input
                        ref="username"
                        v-model="username"
                        @input="input"
                        @keydown.enter="login"
                        @focus="focusHandler('userFocus')"
                        @blur="blurHandler('userFocus')"
                        type="text"
                        name="username"
                        autocomplete="off"
                        autofocus
                        placeholder="用户名"
                    >
                </div>
                <div :class="getStyle('passwordFocus')" class="line">
                    <input
                        ref="password"
                        v-model="password"
                        @input="input"
                        @keydown.enter="login"
                        @focus="focusHandler('passwordFocus')"
                        @blur="blurHandler('passwordFocus')"
                        type="password"
                        name="password"
                        autocomplete="off"
                        placeholder="密码"
                    >
                </div>
                <div class="line">
                    <button @click="login">
                        登录
                    </button>
                </div>
                <div v-show="error" class="error">
                    <Icon type="exclamation-circle" />{{error}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    FesLeft: false,
    FesData() {
        return {
            userFocus: false,
            passwordFocus: false,
            username: '',
            password: '',
            error: '' // 请输入正确的密码，8-16位
        };
    },
    FesReady() {
        this.$nextTick(() => {
            this.$refs.username.focus();
        });
        this.initStyle();

        if (this.FesStorage.get('userLogin') === true) {
            this.getRole();
        }
    },
    methods: {
        login() {
            if (this.validate()) {
                // this.FesApi.fetch('login').then(() => {
                    // 设置用户、角色等
                this.FesApp.set('FesUserName', 'harrywan');
                this.FesApp.set('FesRoleName', '管理员');
                this.FesStorage.set('userLogin', true);
                this.getRole();
                // });
            }
        },
        getRole() {
            // this.FesApi.fetch('getRoleName').then((res) => {
                // 默认跳入rolesConfig的第一项
            this.FesApp.setRole("admin");
            // });
        },
        input() {
            this.error = '';
        },
        validate() {
            const { username } = this;
            const { password } = this;
            if (username === '' || username == null) {
                this.error = '请输入用户名';
                return false;
            }
            if (!/^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$/.test(username)) {
                this.error = '请输入正确邮箱账号';
                return false;
            }
            if (password === '' || password == null) {
                this.error = '请输入密码';
                return false;
            }
            return true;
        },
        getStyle(type) {
            let style = '';
            if (this[type] && this.isIE(9)) {
                if (type === 'passwordFocus' && !this.password) {
                    style += ' ie-palceholder ie-palceholder-password';
                } else if (type === 'userFocus' && !this.username) {
                    style += ' ie-palceholder';
                }
            }
            return style;
        },
        initStyle() {
            if (this.isIE(9)) {
                !this.password && (this.passwordFocus = true);
                !this.username && (this.userFocus = true);
            }
        },
        focusHandler(type) {
            this.isIE(9) && (this[type] = false);
        },
        blurHandler(type) {
            this[type] = true;
        },
        isIE(ver) {
            const b = document.createElement('b');
            b.innerHTML = `<!--[if IE ${ver}]><i></i><![endif]-->`;
            return b.getElementsByTagName('i').length === 1;
        }
    }
};
</script>
