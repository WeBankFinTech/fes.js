---
pageClass: comp-page-class
---
# Form 表单

## 概述
具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="表单控件" template="ui/templates/form/1.html">
            <template v-slot:demo>
                <Wb-form>
                    <Form-item label="输入框">
                        <wb-input placeholder="请输入"></wb-input>
                    </Form-item>
                    <Form-item label="密码输入框">
                        <wb-input placeholder="请输入" type="password"></wb-input>
                    </Form-item>
                    <Form-item label="数字输入框">
                        <wb-input placeholder="请输入" type="number"></wb-input>
                    </Form-item>
                    <Form-item label="日期选择框">
                        <Wb-input-date-picker />
                    </Form-item>
                    <Form-item label="时间选择框">
                        <time-picker />
                    </Form-item>
                    <Form-item label="下拉框">
                        <wb-select>
                            <wb-option :value="1">北京市</wb-option>
                            <wb-option :value="2">上海市</wb-option>
                            <wb-option :value="3">深圳市</wb-option>
                            <wb-option :value="4">杭州市</wb-option>
                            <wb-option :value="5">南京市</wb-option>
                            <wb-option :value="6">重庆市</wb-option>
                        </wb-select>
                    </Form-item>
                    <Form-item label="单选框">
                        <Radio-group>
                            <Radio value="1">
                                男
                            </Radio>
                            <Radio value="2">
                                女
                            </Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="多选框">
                        <Checkbox-group>
                            <Checkbox value="1">
                                吃饭
                            </Checkbox>
                            <Checkbox value="2">
                                睡觉
                            </Checkbox>
                            <Checkbox value="3">
                                跑步
                            </Checkbox>
                        </Checkbox-group>
                    </Form-item>
                    <Form-item label="开关">
                        <Wb-switch>
                            <span slot="close">关</span>
                            <span slot="open">开</span>
                        </Wb-switch>
                    </Form-item>
                    <Form-item label="文本域">
                        <wb-input type="textarea" placeholder="请输入"></wb-input>
                    </Form-item>
                    <Form-item>
                        <Wb-button type="primary">提交</Wb-button>
                        <Wb-button type="ghost" style="margin-left: 8px">取消</Wb-button>
                    </Form-item>
                </Wb-form>
            </template>
            <template v-slot:description>
                <p>在 Wb-form 内，每个表单域由 Form-item 组成，可包含的控件有：Input、Radio、Checkbox、Switch、Select、InputDatePicker、TimePicker。</p>
                <p>给 Form-item 设置属性 label 可以显示表单域的标签</p>
            </template>
        </componetTemplate>
        <componetTemplate title="查询表单" template="ui/templates/form/2.html">
            <template v-slot:demo>
                <Wb-form type="query">
                    <Row>
                        <Cell span="12">
                            <Form-item label="姓名">
                                <wb-input placeholder="请输入"></wb-input>
                            </Form-item>
                        </Cell>
                        <Cell span="12">
                            <Form-item label="身份证">
                                <wb-input placeholder="请输入"></wb-input>
                            </Form-item>
                        </Cell>
                    </Row>
                    <Row>
                        <Cell span="12">
                            <Form-item label="下拉框">
                                <wb-select>
                                    <wb-option :value="1">北京市</wb-option>
                                    <wb-option :value="2">上海市</wb-option>
                                    <wb-option :value="3">深圳市</wb-option>
                                    <wb-option :value="4">杭州市</wb-option>
                                    <wb-option :value="5">南京市</wb-option>
                                    <wb-option :value="6">重庆市</wb-option>
                                </wb-select>
                            </Form-item>
                        </Cell>
                        <Cell span="12">
                            <Form-item label="下拉框">
                                <wb-select>
                                    <wb-option :value="1">北京市</wb-option>
                                    <wb-option :value="2">上海市</wb-option>
                                    <wb-option :value="3">深圳市</wb-option>
                                    <wb-option :value="4">杭州市</wb-option>
                                    <wb-option :value="5">南京市</wb-option>
                                    <wb-option :value="6">重庆市</wb-option>
                                </wb-select>
                            </Form-item>
                        </Cell>
                    </Row>
                </Wb-form>
            </template>
            <template v-slot:description>
                <p>query模式下FromItem上下间隔会缩小，执行校验但是不提示校验错误信息。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="动态增减表单项" template="ui/templates/form/3.html">
            <template v-slot:demo>
                <Wb-form ref="formValidate1" :label-width="100">
                    <Form-item label="输入框" v-for="(item, index) in textList" :key="index" :prop="item.text"
                                :rule="[{required: true, message: '项目' + (item.text) +'不能为空'}]">
                        <wb-input v-model="item.value" placeholder="请输入"></wb-input>
                    </Form-item>
                    <Form-item>
                        <Wb-button type="primary" @click="click1">提交</Wb-button>
                        <Wb-button type="ghost" style="margin-left: 8px" @click="reset1">重置</Wb-button>
                        <Wb-button type="primary" style="margin-left: 8px" @click="add">增加</Wb-button>
                        <Wb-button type="primary" style="margin-left: 8px" @click="remove">减少</Wb-button>
                    </Form-item>
                </Wb-form>
            </template>
            <template v-slot:description>
                <p>当需要动态维护 Form-item 时，可以给 Form-item 设置属性 rule 来单独为该域做验证。</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="对齐方式" template="ui/templates/form/4.html">
            <template v-slot:demo>
                <Wb-form label-position="left">
                    <Form-item label="输入框" :label-width="180">
                        <wb-input placeholder="请输入"></wb-input>
                    </Form-item>
                    <Form-item label="输入框" :label-width="150">
                        <wb-input placeholder="请输入"></wb-input>
                    </Form-item>
                </Wb-form>
                <Wb-form label-position="right" :label-width="100">
                    <Form-item label="输入框">
                        <wb-input placeholder="请输入"></wb-input>
                    </Form-item>
                    <Form-item label="输入框">
                        <wb-input placeholder="请输入"></wb-input>
                    </Form-item>
                </Wb-form>
                <Wb-form label-position="top">
                    <Form-item label="输入框">
                        <wb-input placeholder="请输入"></wb-input>
                    </Form-item>
                    <Form-item label="输入框">
                        <wb-input placeholder="请输入"></wb-input>
                    </Form-item>
                </Wb-form>
            </template>
            <template v-slot:description>
                <p>设置属性 label-position，控制表单项描述的位置，left 为左对齐，right 为右对齐，top 置于表单组件头部。</p>
                <p>设置属性 label-width，控制表单项描述的宽度，默认80。</p>
                <p>Wb-form 和 Form-item 都可以设置 label-position 和 label-width ，Form-item的优先级高于Wb-form。</p>
            </template>
        </componetTemplate>
        <componetTemplate title="表单校验" template="ui/templates/form/5.html">
            <template v-slot:demo>
                <Wb-form :rule="ruleValidate" ref="formValidate" :label-width="100">
                    <Form-item label="输入框必填" prop="radio">
                        <Radio-group v-model="radio">
                            <Radio value="1">
                                是
                            </Radio>
                            <Radio value="2">
                                否
                            </Radio>
                        </Radio-group>
                    </Form-item>
                    <Form-item label="输入框" prop="text" :rule="[{required: radio=='1', message: '不能为空'}]">
                        <wb-input v-model="text" placeholder="请输入"></wb-input>
                    </Form-item>
                    <Form-item label="下拉框" prop="select">
                        <wb-select v-model="select">
                            <wb-option :value="1">北京市</wb-option>
                            <wb-option :value="2">上海市</wb-option>
                            <wb-option :value="3">深圳市</wb-option>
                            <wb-option :value="4">杭州市</wb-option>
                            <wb-option :value="5">南京市</wb-option>
                            <wb-option :value="6">重庆市</wb-option>
                        </wb-select>
                    </Form-item>
                    <Form-item label="多选框" prop="checkbox">
                        <Checkbox-group v-model="checkbox">
                            <Checkbox value="1">
                                吃饭
                            </Checkbox>
                            <Checkbox value="2">
                                睡觉
                            </Checkbox>
                            <Checkbox value="3">
                                跑步
                            </Checkbox>
                        </Checkbox-group>
                    </Form-item>
                    <Form-item label="文本域" prop="textarea">
                        <wb-input v-model="textarea" type="textarea" :autosize="true" placeholder="请输入"></wb-input>
                    </Form-item>
                    <Form-item label="图片上传" prop="list" :value="list" :rule="[{required: true, message: '不能为空', type: 'array', min: 1}]">
                        <Upload :accept="accpetType" :action="action">
                        </Upload>
                        <div class="img-list">
                            <img v-for="(item, index) in list" :key="index" :src="getUrl(item)" />
                        </div>
                    </Form-item>
                    <Form-item>
                        <Wb-button type="primary" @click="click">提交</Wb-button>
                        <Wb-button type="ghost" style="margin-left: 8px" @click="reset">重置</Wb-button>
                    </Form-item>
                </Wb-form>
            </template>
            <template v-slot:description>
                <p>Form 组件基于  async-validator 实现的数据验证，给 Form 设置属性 rule，同时给需要验证的 Form-item 设置属性 prop 指向对于字段即可。</p>
                <p>FormItem 也可以设置校验的rule。如果From的rule中也配置了rule，则会跟Form设置的rule合并。</p>
                <p>校验规则可以是响应式的对象。</p>
                <p>如果FormItem里面不包含表单组件，则可以通过设置value来实现校验。</p>
                <p>除了async-validator中定义的type之外，我们还定义了：</p>
                <ul>
                    <li>mobile: 手机号</li>
                    <li>cname: 中文名</li>
                    <li>password: 密码，必须包含大写、小写字符和数字，8-16位</li>
                    <li>money: 金额，可以配置小数点后的位数（afterPoint）</li>
                    <li>equal: 与什么（enqualTo）相等</li>
                    <li>min: 不小于（minTo）</li>
                    <li>max: 不大于（maxTo）</li>
                </ul>
            </template>
        </componetTemplate>
    </cell>
</row>
</ClientOnly>

<style lang="scss">
.ui-select .ui-select-dropdown-list {
    padding: 0;
}
.ui-time-picker{
    .picker-item{
        padding: 0;
    }
}
.img-list{
    display: flex;
    flex-wrap: wrap;
    img{
        width: 200px;
    }
}
</style>

<script>
export default {
    data() {
        return {
            text: '',
            select: '',
            radio: '',
            checkbox: [],
            textarea: '',
            list: [],
            ruleValidate: {
                text: [
                ],
                select: [
                    { required: true, message: '不能为空' }
                ],
                radio: [
                    { required: true, message: '不能为空' }
                ],
                checkbox: [
                    { required: true, message: '不能为空', type: 'array', min: 1 }
                ],
                textarea: [
                    { required: true, message: '不能为空' }
                ]
            },
            textList: [{
                text: 'text0',
                value: ''
            }],
            accpetType: ['jpg', 'png']
        }
    },
    methods: {
        add() {
            this.textList.push({
                text: 'text' + this.textList.length,
                value: ''
            })
        },
        remove() {
            this.textList.splice(this.textList.length - 1, 1)
        },
        click() {
            this.$refs.formValidate.validate((valid, errors) => {
                console.log(valid, errors)
            })
        },
        reset() {
            this.$refs.formValidate.resetFields()
        },
        click1() {
            this.$refs.formValidate1.validate((valid, errors) => {
                console.log(valid, errors)
            })
        },
        reset1() {
            this.$refs.formValidate1.resetFields()
        },
        action(rst, data) {
            this.list.push(data.get("upFiles"))
        },
        getUrl(item){
            return URL.createObjectURL(item)
        }
    }
}
</script>

## API

### Form Methods

#### 校验整个表单
```js
this.$refs.formValidate.validate((valid, errors) => {
    console.log(valid, errors)
})
```

#### 校验表单项
对部分表单字段进行校验的方法，field为需校验的 prop
```js
this.$refs.formValidate.validateField("field", (valid, errors) => {
    console.log(valid, errors)
})
```

#### 重置
重置校验结果, 如果传了filed则只重置这个，如果没有则重置所有
```js
this.$refs.formValidate.resetFields(() => {
})
this.$refs.formValidate.resetFields("field", () => {
})
```

### Form Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| type          |  表单类型，可选值有`normal`和`query`  | String  |        `normal`         |
| rule       | 表单验证规则，具体配置查看[async-validator](https://github.com/yiminghe/async-validator) | Boolean   |     false      |
| labelPosition       | 表单域标签的位置，可选值为`left`、`right`、`top` | String   |     `right`      |
| labelWidth       |  表单域标签的宽度 |  Number   |       80      |
| showMessage       |  是否显示校验信息 |  Boolean   |      true      |
| autocomplete       |  是否配置为自动完成功能，可选有`on`、`off` |  Boolean   |      `off`      |

### Form Events

| 事件名           | 说明                       | 返回值     |       
|:--------------|:--------------------------|:--------|
| on-validate   | 对表单项进行校验后触发  | (errors) => void  |  
| submit   | 提交时触发  | (valid, errors) => void  | 

### FormItem Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| prop          |  定义了prop才会被校验  | String  |       null        |
| label       | FormItem项标签名称 | String   |     null      |
| rule       | 表单验证规则，具体配置查看[async-validator](https://github.com/yiminghe/async-validator) | Boolean   |     false      |
| labelPosition       | 表单域标签的位置，可选值为`left`、`right`、`top` | String   |     `right`      |
| labelWidth       |  表单域标签的宽度 |  Number   |       80      |
| showMessage       |  是否显示校验信息 |  Boolean   |      true      |
| value       |  配置后，则根据此值进行校验 |  String, Number, Array, Boolean, Object   |      null      |


 