<template>
    <div class="toast-page article">
        <h1>Toast 全局提示</h1>
        <h2>概述</h2>
        <p>轻量级的信息反馈组件，在屏幕中间显示，并自动消失。</p>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Wb-button @click="click1">显示普通的提示</Wb-button>
                </div>
                <div class="panel-header">
                    <span>普通提示</span>
                </div>
                <div class="panel-desc">
                    <p>最基本的提示，默认在3秒后消失。</p>
                </div>
            </Cell>
            <div class="panel-split">
            </div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown1></markdown1>
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Wb-button @click="click2" type="error">显示错误的提示</Wb-button>
                    <Wb-button @click="click4" type="warn">显示警告的提示</Wb-button>
                    <Wb-button @click="click3" type="success">显示成功的提示</Wb-button>
                </div>
                <div class="panel-header">
                    <span>提示类型</span>
                </div>
                <div class="panel-desc">
                    <p>不同的提示状态：成功、警告、错误。</p>
                </div>
            </Cell>
            <div class="panel-split">
            </div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown2></markdown2>
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Wb-button @click="click5">显示普通的提示</Wb-button>
                </div>
                <div class="panel-header">
                    <span>可配置显示时间</span>
                </div>
                <div class="panel-desc">
                    <p>传入配置对象，则可以修改默认的3秒显示时间</p>
                </div>
            </Cell>
            <div class="panel-split">
            </div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown3></markdown3>
                </div>
            </Cell>
        </Row>

        <h2>API</h2>
        <h3>Toast instance</h3>
        <p>通过直接在vue实例里面调用以下方法来使用组件</p>
        <ul>
            <li>this.$Toast(message, duration, onClose)</li>
            <li>this.$Toast.success(message, duration, onClose)</li>
            <li>this.$Toast.error(message, duration, onClose)</li>
            <li>this.$Toast.warn(message, duration, onClose)</li>
        </ul>
        <section>
            <table>
                <thead>
                    <tr>
                        <th style="text-align:left">属性</th>
                        <th style="text-align:left">说明</th>
                        <th style="text-align:left">类型</th>
                        <th style="text-align:left">默认值</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align:left">message</td>
                        <td style="text-align:left">提示内容</td>
                        <td style="text-align:left">String</td>
                        <td style="text-align:left">null</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">duration</td>
                        <td style="text-align:left">提示显示时间</td>
                        <td style="text-align:left">Number</td>
                        <td style="text-align:left">3000</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">onClose</td>
                        <td style="text-align:left">当提示消失时触发的事件</td>
                        <td style="text-align:left">Function</td>
                        <td style="text-align:left">null</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
<script>
import markdown1 from './md/toast1.md';
import markdown2 from './md/toast2.md';
import markdown3 from './md/toast3.md';

export default {
    components: {
        markdown1, markdown2, markdown3
    },
    methods: {
        click1() {
            this.$Toast('我是一条提示消息', {
                duration: 500000,
                align: 'top'
            });
        },
        click2() {
            this.$Toast.error('用户名或者密码不正确');
        },
        click3() {
            this.$Toast.success('创建订单成功');
        },
        click4() {
            this.$Toast.warn('请输入正确的用户名');
        },
        click5() {
            this.$Toast('正在加载中', {
                onClose() {
                    console.log('关闭了');
                }
            });
        }
    }
};
</script>
