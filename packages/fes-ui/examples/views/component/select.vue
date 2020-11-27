<template>
    <div class="home-page article">
        <h1>Select 选择器</h1>
        <h2>概述</h2>
        <p>使用模拟的增强下拉选择器来代替浏览器原生的选择器。</p>

        <h2>代码示例</h2>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-select v-model="value" :options="arr" @on-search="search2" @on-change="change" filterable style="width:200px" />
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>Wb-select内部嵌套Wb-option使用，类似原生select内部嵌套option</p>
                    <p>Wb-selec默认宽度是100%</p>
                    <p>设置Wb-option为disabled表示禁用此选项</p>
                    <p>当选择一项时触发on-change事件</p>
                </div>
            </div>
            <markdown1 slot="code" />
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-select v-model="value1" @finished="finished" @on-change="change" filterable style="width:200px">
                        <wb-option :value="1" label="北京市" />
                        <wb-option :value="2">
                            上海市上海市上海市上海市上海市上海市上海市上海市上海市上海市上海市
                        </wb-option>
                        <wb-option :value="3" disabled>
                            深圳市
                        </wb-option>
                        <wb-option :value="4">
                            杭州市
                        </wb-option>
                        <wb-option :value="5">
                            南京市
                        </wb-option>
                        <wb-option :value="6">
                            重庆市
                        </wb-option>
                    </Wb-select>
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>Wb-select内部嵌套Wb-option使用，类似原生select内部嵌套option</p>
                    <p>Wb-selec默认宽度是100%</p>
                    <p>设置Wb-option为disabled表示禁用此选项</p>
                    <p>当选择一项时触发on-change事件</p>
                </div>
            </div>
            <markdown1 slot="code" />
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-select v-model="value2" @on-change="change" filterable>
                        <wb-option :value="1">
                            北京市
                        </wb-option>
                        <wb-option :value="2">
                            上海市
                        </wb-option>
                        <wb-option :value="3">
                            深圳市
                        </wb-option>
                        <wb-option :value="4">
                            杭州市
                        </wb-option>
                        <wb-option :value="5">
                            南京市
                        </wb-option>
                        <wb-option :value="6">
                            重庆市
                        </wb-option>
                    </Wb-select>
                </div>
                <div class="panel-header">
                    <span>可搜索</span>
                </div>
                <div class="panel-desc">
                    <p>设置filterable属性，则选项可以根据输入的内容筛选</p>
                </div>
            </div>
            <markdown2 slot="code" />
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-select v-model="value3" @on-search="search" @on-change="change" filterable>
                        <wb-option v-for="item in options" :key="item" :value="item">
                            {{item}}
                        </wb-option>
                    </Wb-select>
                </div>
                <div class="panel-header">
                    <span>根据搜索内容查询接口替换选项内容</span>
                </div>
                <div class="panel-desc">
                    <p>通过on-search监听输入的内容，在回调更新option选项数据</p>
                </div>
            </div>
            <markdown4 slot="code" />
        </panel>

        <panel>
            <div slot="template">
                <div class="panel-case">
                    <Wb-select v-model="value4" :multiple-limit="2" @on-change="change" multiple>
                        <wb-option :value="1" label="北京市" />
                        <wb-option :value="2">
                            上海市111111111111111111111111111111111111111111111111111111111111111111111上海市111111111111111111111111111111111111111111111111111111111111111111111
                        </wb-option>
                        <wb-option :value="3" disabled>
                            深圳市
                        </wb-option>
                        <wb-option :value="4">
                            杭州市
                        </wb-option>
                        <wb-option :value="5">
                            南京市
                        </wb-option>
                        <wb-option :value="6">
                            重庆市
                        </wb-option>
                    </Wb-select>
                </div>
                <div class="panel-header">
                    <span>多选</span>
                </div>
                <div class="panel-desc">
                    <p>添加multiple属性，value值必须是数组</p>
                    <p>多选时添加multiple-limit属性，控制最多显示多少个</p>
                </div>
            </div>
            <markdown3 slot="code" />
        </panel>

        <h2>API</h2>
        <h3>Select props</h3>
        <section>
            <table>
                <thead>
                    <tr>
                        <th style="text-align:left">
                            属性
                        </th>
                        <th style="text-align:left">
                            说明
                        </th>
                        <th style="text-align:left">
                            类型
                        </th>
                        <th style="text-align:left">
                            默认值
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align:left">
                            value
                        </td>
                        <td style="text-align:left">
                            选择的值，可以使用v-model实现数据的双向绑定
                        </td>
                        <td style="text-align:left">
                            String, Number, Array
                        </td>
                        <td style="text-align:left">
                            null
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            placeholder
                        </td>
                        <td style="text-align:left">
                            内容为空时的提示语
                        </td>
                        <td style="text-align:left">
                            String
                        </td>
                        <td style="text-align:left">
                            ""
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            disabled
                        </td>
                        <td style="text-align:left">
                            是否禁止选择
                        </td>
                        <td style="text-align:left">
                            Boolean
                        </td>
                        <td style="text-align:left">
                            false
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            readonly
                        </td>
                        <td style="text-align:left">
                            是否只读
                        </td>
                        <td style="text-align:left">
                            Boolean
                        </td>
                        <td style="text-align:left">
                            false
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            clearable
                        </td>
                        <td style="text-align:left">
                            是否显示清空icon
                        </td>
                        <td style="text-align:left">
                            Boolean
                        </td>
                        <td style="text-align:left">
                            true
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            filterable
                        </td>
                        <td style="text-align:left">
                            是否可筛选
                        </td>
                        <td style="text-align:left">
                            Boolean
                        </td>
                        <td style="text-align:left">
                            false
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            multiple
                        </td>
                        <td style="text-align:left">
                            多选
                        </td>
                        <td style="text-align:left">
                            Boolean
                        </td>
                        <td style="text-align:left">
                            false
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            multiple-limit
                        </td>
                        <td style="text-align:left">
                            仅多选时使用，限制选择数，默认值0不限制选择个数
                        </td>
                        <td style="text-align:left">
                            Boolean
                        </td>
                        <td style="text-align:left">
                            0
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>

        <h3>Option props</h3>
        <section>
            <table>
                <thead>
                    <tr>
                        <th style="text-align:left">
                            属性
                        </th>
                        <th style="text-align:left">
                            说明
                        </th>
                        <th style="text-align:left">
                            类型
                        </th>
                        <th style="text-align:left">
                            默认值
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align:left">
                            value
                        </td>
                        <td style="text-align:left">
                            选项的值
                        </td>
                        <td style="text-align:left">
                            Number, String
                        </td>
                        <td style="text-align:left">
                            null
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            label
                        </td>
                        <td style="text-align:left">
                            选项的文字
                        </td>
                        <td style="text-align:left">
                            String
                        </td>
                        <td style="text-align:left">
                            ""
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            disabled
                        </td>
                        <td style="text-align:left">
                            是否禁止被选择
                        </td>
                        <td style="text-align:left">
                            Boolean
                        </td>
                        <td style="text-align:left">
                            false
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>

        <h3>Select events</h3>
        <section>
            <table>
                <thead>
                    <tr>
                        <th style="text-align:left">
                            事件名
                        </th>
                        <th style="text-align:left">
                            说明
                        </th>
                        <th style="text-align:left">
                            返回值
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align:left">
                            on-change
                        </td>
                        <td style="text-align:left">
                            选择时触发
                        </td>
                        <td style="text-align:left">
                            最新的值
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:left">
                            on-search
                        </td>
                        <td style="text-align:left">
                            当设置filterable为true，输入过滤条件时触发
                        </td>
                        <td style="text-align:left">
                            过滤条件的值
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
</template>
<script type="text/ecmascript-6">
import markdown1 from './md/select.md';
import markdown2 from './md/select2.md';
import markdown3 from './md/select2.md';
import markdown4 from './md/select2.md';

export default {
    components: {
        markdown1, markdown2, markdown3, markdown4
    },
    data() {
        return {
            value: [1, 2, 3],
            value1: '',
            value3: '',
            value2: '',
            value4: [],
            options: [1, 2, 3, 4],
            arr: []
        };
    },
    mounted() {
        let i = 0;
        const arr = [];
        while (i < 10000) {
            arr.push({
                value: i,
                text: `optionoptionoptionoptionoptionoption${i}`
            });
            i++;
        }
        this.arr = arr;
    },
    methods: {
        finished() {
            console.log('finished');
        },
        change(value) {
            console.log(value);
        },
        search(value) {
            // this.options = [];
            // for (let i = 1; i < 10; i++) {
            //     this.options.push(value + '|' + i)
            // }
        },
        search2(value) {
            // let i = 0;
            // let arr = [];
            // while (i < 10000) {
            //     arr.push({
            //         value: 'value' + value + i,
            //         text: 'option' + value + i
            //     })
            //     i++;
            // }
            // this.arr = arr;
        }
    }
};
</script>
