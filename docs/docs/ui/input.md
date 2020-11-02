---
pageClass: comp-page-class
---
# Input 输入框

## 概述
基本表单组件，支持 input 和 textarea，并在原生控件基础上进行了功能扩展，可以组合使用。

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/input/1.html">
            <template v-slot:demo>
                <Wb-input v-model="text1" placeholder="type默认为text"></Wb-input>
                <Wb-input v-model="text2" :maxlength="10" placeholder="通过maxlength设置最大输入长度"></Wb-input>
                <Wb-input v-model="text3" placeholder="通过width设置宽度" width="200px"></Wb-input>
            </template>
            <template v-slot:description>
                <p>type默认为text</p>
                <p>通过placeholder设置未输入时的提示文字</p>
                <p>通过maxlength设置最大输入长度</p>
                <p>通过width设置宽度, 宽度默认宽度是100%</p>
            </template>
        </componetTemplate>
        <componetTemplate title="Number 输入框" template="ui/templates/input/2.html">
            <template v-slot:demo>
                <Wb-input v-model="text4" placeholder="请输入数字" type="number"></Wb-input>
            </template>
            <template v-slot:description>
                <p>设置type为number即为number输入框，只能输入数字。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="Icon 按钮" template="ui/templates/input/3.html">
            <template v-slot:demo>
                <Wb-input v-model="text5" placeholder="请输入文本" icon="md-calendar"></Wb-input>
            </template>
            <template v-slot:description>
                <p>通过 icon 属性可以在输入框右边加一个图标。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="文本域" template="ui/templates/input/4.html">
            <template v-slot:demo>
                <Wb-input v-model="text6" type="textarea" placeholder="请输入文本"></Wb-input>
                <Wb-input v-model="text7" type="textarea" :rows="4" placeholder="请输入文本"></Wb-input>
            </template>
            <template v-slot:description>
                <p>通过设置属性 type 为 textarea 来使用文本域，用于多行输入。</p>
                <p>通过设置属性 rows 控制文本域的行数，默认是2行。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="清空输入框" template="ui/templates/input/5.html">
            <template v-slot:demo>
                <Wb-input v-model="text10" clearable placeholder="type默认为text"></Wb-input>
            </template>
            <template v-slot:description>
                <p>设置属性 clearable，鼠标悬浮在Input组件上时，显示清除按钮，点击则清空输入框。</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="Password 输入框" template="ui/templates/input/6.html">
            <template v-slot:demo>
                <Wb-input v-model="text11" placeholder="请输入密码" type="password"></Wb-input>
            </template>
            <template v-slot:description>
                <p>设置type为password即为password输入框，支持切换显示隐藏输入内容。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="文件选择器" template="ui/templates/input/7.html">
            <template v-slot:demo>
                <Wb-input type="file" v-model="text12" @on-change="change"></Wb-input>
            </template>
            <template v-slot:description>
                <p>设置type为file即为文件选择器，从系统中选择文件。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="复合型输入" template="ui/templates/input/8.html">
            <template v-slot:demo>
                <Wb-input v-model="text13" placeholder="请输入网址">
                    <span slot="prepend">http://</span>
                    <span slot="append">.com</span>
                </Wb-input>
                <Wb-input v-model="text14" placeholder="日活">
                    <span slot="prepend">http://</span>
                    <span slot="append"><Icon type="md-search"></Icon></span>
                </Wb-input>
            </template>
            <template v-slot:description>
                <p>通过前置prepend和后置append的 slot 可以实现复合型的输入框。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="适应文本高度的文本域" template="ui/templates/input/9.html">
            <template v-slot:demo>
                <wb-input type="textarea" autosize v-model="text8" placeholder="请输入文本"></wb-input>
                <wb-input type="textarea" :autosize="{min:4, max:6}" v-model="text9" placeholder="请输入文本"></wb-input>
            </template>
            <template v-slot:description>
                <p>设置属性 autosize，文本域会自动适应高度的变化。</p>
                <p>autosize也可以设定为一个对象，指定最小行数和最大行数。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="禁用状态/只读状态" template="ui/templates/input/10.html">
            <template v-slot:demo>
                <wb-input placeholder="请输入文本" disabled></wb-input>
                <wb-input type="textarea" placeholder="请输入文本" disabled></wb-input>
                <wb-input placeholder="请输入文本" readonly></wb-input>
                <wb-input type="textarea" placeholder="请输入文本" readonly></wb-input>
            </template>
            <template v-slot:description>
                <p>设置属性 disabled，文本域会禁止输入，不能获取到焦点，并且显示为disabled状态。</p>
                <p>设置属性 readonly，文本域会不能输入。</p>
            </template>
        </componetTemplate>
    </cell>
</row>
</ClientOnly>

<style lang="scss">
.code-box-demo{
    .ui-input-swap:first-child{
        margin-top: 0px;
    }
}
.ui-input-swap {
    display: block;
    margin-top: 20px;
    width: 50%
}
</style>

<script>
export default {
    data() {
        return {
            text1: '',
            text2: '',
            text3: '',
            text4: '',
            text5: '',
            text6: '',
            text7: '',
            text8: '',
            text9: '',
            text10: '',
            text11: '',
            text12: '',
            text13: '',
            text14: '',
            text15: '',
            text16: ''
        }
    },
    methods: {
        change() {
            console.log(this.text4)
        }
    }
}
</script>

## API

### Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| value          |  输入的值, 可以使用v-model实现数据的双向绑定  | Number, String, File  |        ''             |
| type       | 类型，可选值有`password`、`number`、`text`、`textarea`、`file` | String   |              `text`              |
| placeholder       | 提示语 | String   |                ''          |
| maxlength       | 限制输入的内容长度 | Number   |      null         |
| icon       | 右侧的小图标 | String   |      ''         |
| disabled       | 是否禁止输入 | Boolean   |     false      |
| readonly       | 是否只读 | Boolean   |     false      |
| clearable       | 是否显示清空按钮 | Boolean   |     false      |
| rows       | 文本域的行数 | Number   |     2      |
| accept       | 过滤选择的文件类型 | String   |     ''      |
| autocomplete       | 是否阻止浏览器自动填充，可选值有on/off | String   |     ''      |
| name       | 原生的name属性 | String   |     ''      |

### Events

| 事件名           | 说明                       | 返回值     |       
|:--------------|:--------------------------|:--------|
| on-click          | 点击icon时触发  | (event) => void  |    
| on-enter          | 焦点在input, 按下enter键触发  | (event) => void  |   
| on-focus          | 获取焦点时触发  | (event) => void  |  
| on-blur          | 失去焦点时触发  | (event) => void  |  
| on-input          | 输入时触发  | (value, event) => void  |  
| on-change          | 值改变时触发  | (value, event) => void  |  