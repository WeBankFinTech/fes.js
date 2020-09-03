import './assets/styles/main.scss';

export default function () {
    this.FesApp.set('FesName', '$i18n.title');


    // 设置退出逻辑
    this.on('fes_logout', () => {
        this.FesApp.setRole('unLogin');
        this.FesStorage.set('userLogin', false);
    });

    // 设置logo点击事件
    this.on('fes_logo_click', () => {
        window.Toast('你点击了LOGO');
    });

    // 设置路由钩子
    this.FesApp.setBeforeRouter((from, to, next) => {
        next();
    });
    this.FesApp.setAfterRouter((route) => {
        console.log(`您浏览到了${route.path}`);
    });

    // 设置当前角色
    if (!this.FesStorage.get('userLogin') === true) {
        this.setRole('unLogin');
    }

    // 设置AJAX配置
    this.FesApi.option({
    });

    // 设置响应结构
    this.FesApi.setResponse({
        successCode: '0',
        codePath: 'code',
        messagePath: 'msg',
        resultPath: 'result'
    });
}
