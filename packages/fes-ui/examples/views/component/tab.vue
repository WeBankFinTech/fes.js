<template>
    <div class="tab-page article">
        <h1>Tabs 标签页</h1>
        <h2>概述</h2>
        <p>选项卡切换组件，常用于平级区域大块内容的的收纳和展现。</p>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Tabs value="apple">
                        <Tab label="标签一" name="android">
                            <p>1</p>
                        </Tab>
                        <Tab label="标签二" name="apple">
                            <p>2</p>
                        </Tab>
                        <Tab label="标签三" name="windows">
                            <p>3</p>
                        </Tab>
                    </Tabs>
                </div>
                <div class="panel-header">
                    <span>基本用法</span>
                </div>
                <div class="panel-desc" />
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown2 />
                </div>
            </Cell>
        </Row>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Tabs value="apple">
                        <Tab label="标签一" name="android" icon="md-bus">
                            <p>1</p>
                        </Tab>
                        <Tab label="标签二" name="apple" icon="md-bus">
                            <p>2</p>
                        </Tab>
                        <Tab label="标签三" name="windows" icon="md-bus" disabled>
                            <p>3</p>
                        </Tab>
                    </Tabs>
                </div>
                <div class="panel-header">
                    <span>禁用和图标</span>
                </div>
                <div class="panel-desc">
                    <p>设置Tab的icon，可以在Tab显示一个Icon</p>
                    <p>设置Tab的disabled，则禁用该Tab项</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown2 />
                </div>
            </Cell>
        </Row>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Tabs value="apple">
                        <Tab label="标签一" name="android" icon="android">
                            <p>1</p>
                        </Tab>
                        <Tab label="标签二" name="apple" icon="apple">
                            <p>2</p>
                        </Tab>
                        <Tab label="标签三" name="windows" icon="windows">
                            <p>3</p>
                        </Tab>
                        <Wb-button slot="action" type="ghost">按钮一</Wb-button>
                    </Tabs>
                </div>
                <div class="panel-header">
                    <span>自定义动作</span>
                </div>
                <div class="panel-desc">
                    在Tab添加slot为action的元素显示在Tab的头部最右边
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown6 />
                </div>
            </Cell>
        </Row>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Tabs @on-tab-remove="remove" @on-tab-change="change" value="apple" type="card" closable>
                        <Tab label="标签一" name="android">
                            <p>1</p>
                        </Tab>
                        <Tab label="标签二" name="apple">
                            <p>2</p>
                        </Tab>
                        <Tab label="标签三" name="windows">
                            <p>3</p>
                        </Tab>
                    </Tabs>
                </div>
                <div class="panel-header">
                    <span>card样式和可删除</span>
                </div>
                <div class="panel-desc">
                    <p>设置type='card'</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown7 />
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Tabs ref="tabs" v-model="value" @on-tab-remove="remove" @on-tab-change="change" draggable closable>
                        <Tab v-for="i in arr" :label="copm(i)" :key="i">
                            <p>{{i}}</p>
                        </Tab>
                        <Wb-button slot="action" type="ghost">按钮一</Wb-button>
                    </Tabs>
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>current表示Tabs当前激活的是那一项。</p>
                    <p>如果Tab设置了key属性，如果current等于那个key则激活那个。如果Tab没有设置key属性，则current可以根据Tab顺序来激活。设置current=1，则激活第一个</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown1 />
                </div>
            </Cell>
        </Row>


        <h2>API</h2>
        <h3>Tabs props</h3>
        <markdown3 />

        <h3>Tabs events</h3>
        <markdown4 />

        <h3>Tab props</h3>
        <markdown5 />
    </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue';
import markdown1 from './md/tabs1.md';
import markdown2 from './md/tabs2.md';
import markdown3 from './md/tabs3.md';
import markdown4 from './md/tabs4.md';
import markdown5 from './md/tabs5.md';
import markdown6 from './md/tabs6.md';
import markdown7 from './md/tabs7.md';

export default {
    components: {
        markdown1, markdown2, markdown3, markdown4, markdown5, markdown6, markdown7
    },
    data() {
        const arr = [];
        for (let i = 1; i <= 10; i++) {
            arr.push(`标签${i}`);
        }
        return {
            value: '2',
            value1: '2',
            arr,
            copm(i) {
                return new Vue({
                    data() {
                        return {
                            i
                        };
                    },
                    render(h) {
                        return h('span', {
                        }, [`标签${this.i}`]);
                    }
                    // template: '<span>标签{{i}}</span>'
                });
            }
        };
    },
    mounted() {
        setTimeout(() => {
            this.value = '1';
        }, 3000);
    },
    methods: {
        choose(index) {
            this.$Toast(`选择第${index}个`);
        },
        remove() {
            console.log(arguments);
        },
        change({ from, to }) {
            console.log(from, to);
            const obj = this.arr[from];
            this.arr.splice(from, 1);
            this.arr.splice(to, 0, obj);
            console.log(this.arr);

            if (to == 2) {
                this.$refs.tabs.reset();
            }
        }
    }
};
</script>
