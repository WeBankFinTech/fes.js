// eslint-disable-next-line
import fesConfig from 'projectRoot/fes.config.js';

// 设置默认
if (!fesConfig.mode) {
    fesConfig.mode = 'vertical';
}

if (!fesConfig.theme) {
    fesConfig.theme = 'blue';
}

if (!fesConfig.env) {
    fesConfig.env = {};
}

if (!fesConfig.roles) {
    fesConfig.roles = {};
}

if (!fesConfig.menu) {
    fesConfig.menu = [];
}

if (!fesConfig.i18n) {
    fesConfig.i18n = {
        locale: 'zh-cn',
        messages: {
        }
    };
}
if (!fesConfig.i18n.locale) {
    fesConfig.i18n.locale = 'zh-cn';
}
if (!fesConfig.i18n.messages) {
    fesConfig.i18n.messages = {};
}
if (!fesConfig.i18n.messages['zh-cn']) {
    fesConfig.i18n.messages['zh-cn'] = {};
}
if (!fesConfig.i18n.messages.en) {
    fesConfig.i18n.messages.en = {};
}
Object.assign(fesConfig.i18n.messages['zh-cn'], {
    fesMessages: {
        defaultError: '后台接口异常，请联系开发处理！',
        importInterfaceTip: '两个相同请求间隔小于 {s} 秒，是否继续？',
        tip: '提示',
        noPermission: '您没有访问当前路径的权限'
    }
});
Object.assign(fesConfig.i18n.messages.en, {
    fesMessages: {
        defaultError: 'Server-end API error, please contact the admin.',
        importInterfaceTip: 'Repetitive request in {s} seconds, continue anyway?',
        tip: 'Tips',
        noPermission: 'You don’t have the authority to access.'
    }
});

export default fesConfig;
