<template>
    <div class="login-panel">
        <div class="login-panel-swap">
            <div class="login-project">
                <div class="title">
                    <!-- <img class="logo" src="~@/assets/images/favicon.png" /> -->
                    <span class="text">Fes.js 运营平台</span>
                </div>
                <div class="desc">fes.js是一个优秀的中台应用前端解决方案</div>
            </div>
            <div class="login-form">
                <div :class="{ focus: currentFoucs === 'userFocus' }" class="input-swap">
                    <Icon class="icon" type="md-person" />
                    <input
                        ref="username"
                        v-model="username"
                        @input="input"
                        @keydown.enter="login"
                        @focus="focusHandler('userFocus')"
                        @blur="blurHandler('userFocus')"
                        class="input"
                        type="text"
                        name="username"
                        autocomplete="off"
                        autofocus
                        placeholder="用户名: 符合邮箱规则即可"
                    />
                </div>
                <div :class="{ focus: currentFoucs === 'passwordFocus' }" class="input-swap">
                    <Icon class="icon" type="md-eye-off" />
                    <input
                        ref="password"
                        v-model="password"
                        @input="input"
                        @keydown.enter="login"
                        @focus="focusHandler('passwordFocus')"
                        @blur="blurHandler('passwordFocus')"
                        class="input"
                        type="password"
                        name="password"
                        autocomplete="off"
                        placeholder="密码：任意"
                    />
                </div>
                <div class="help">
                    <Checkbox value="1">
                        记住密码
                    </Checkbox>
                    <a>忘记密码</a>
                </div>
                <button @click="login" class="button">登录</button>
                <div v-show="error" class="error">
                    <Icon type="md-warning" />
                    {{error}}
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
            currentFoucs: '',
            username: '',
            password: '',
            error: '' // 请输入正确的密码，8-16位
        };
    },
    FesReady() {
        this.$nextTick(() => {
            this.$refs.username.focus();
            this.currentFoucs = 'userFocus';
        });
        if (this.FesStorage.get('userLogin') === true) {
            this.getRole();
        }

        this.FesApi.fetch('/login', {

        }).then((res) => {
            console.log(res);
        });
    },
    methods: {
        login() {
            if (this.validate()) {
                // 设置用户、角色等
                this.FesApp.set('FesUserName', 'harrywan');
                this.FesApp.set('FesRoleName', '管理员');
                this.FesStorage.set('userLogin', true);
                this.getRole();
            }
        },
        getRole() {
            this.FesApp.setRole('admin');
        },
        input() {
            this.error = '';
        },
        focusHandler(type) {
            this.currentFoucs = type;
        },
        blurHandler() {
            this.currentFoucs = '';
        },
        validate() {
            const { username } = this;
            const { password } = this;
            if (username === '' || username == null) {
                this.error = '请输入用户名';
                return false;
            }
            if (
                !/^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-zA-Z0-9]+[-a-zA-Z0-9]*[a-zA-Z0-9]+.){1,63}[a-zA-Z0-9]+$/.test(
                    username
                )
            ) {
                this.error = '请输入正确邮箱账号';
                return false;
            }
            if (password === '' || password == null) {
                this.error = '请输入密码';
                return false;
            }
            return true;
        }
    }
};
</script>
<style lang="scss">
@import "~@/assets/styles/variables";
.login-panel {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: #f0f2f5;
  background-image: url("~@/assets/images/bg.png");
  background-position: left bottom;
  background-repeat: no-repeat;
  background-size: 100% auto;
}

.login-panel .login-panel-swap {
  width: 350px;
  margin: auto;
  text-align: center;
  .login-project {
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 33px;
      color: $black-text-color;
      .logo {
          margin-right: 20px;
      }
    }
    .desc {
      margin-top: 12px;
      margin-bottom: 40px;
      color: $sub-text-color;
      font-size: 14px;
    }
  }
  .login-form {
    height: 270px;
    .input-swap {
      position: relative;
      display: flex;
      align-items: center;
      min-height: 32px;
      padding: 6px 11px;
      font-size: 14px;
      border-radius: 2px;
      border: 1px solid $border-color-base;
      background: #ffffff;
      transition: all 0.3s;
      &:not(:first-child) {
        margin-top: 12px;
      }
      &:hover,&.focus {
        border-color: $link-hover-color;
        box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
      }
      .icon {
        margin-right: 4px;
        color: $primary-color;
      }
      .input {
        padding: 0;
        border: none;
        outline: none;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-variant: tabular-nums;
        list-style: none;
        font-feature-settings: "tnum", "tnum";
        position: relative;
        width: 100%;
        min-width: 0;
        padding: 2px 11px;
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
      }
    }
    .button {
      margin-top: 24px;
      width: 100%;
      border: 0;
      outline: 0;
      height: 40px;
      line-height: 40px;
      background: $primary-color;
      color: #ffffff;
      border-radius: 2px;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover{
          background: rgba($primary-color, 0.85);
      }
    }
    .error {
      margin-top: 10px;
      width: 350px;
      color: $error-color;
      font-size: 14px;
      text-align: left;
      .ui-icon {
        margin-right: 6px;
      }
    }
  }
  .help{
      margin-top: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
  }
}
</style>
