```html
<template>
    <Wb-form :rule="ruleValidate" v-ref:form-validate :label-width="100">
        <Form-item label="输入框" prop="text1">
            <wb-input :value.sync="text1" placeholder="请输入"></wb-input>
        </Form-item>
        <Form-item label="密码输入框" prop="text2">
            <wb-input :value.sync="text2" placeholder="请输入" type="password"></wb-input>
        </Form-item>
        <Form-item label="数字输入框" prop="text3">
            <wb-input :value.sync="text3" placeholder="请输入" type="number"></wb-input>
        </Form-item>
        <Form-item label="下拉框" prop="select">
            <wb-select :value.sync="select">
                <wb-option :value="1">北京市</wb-option>
                <wb-option :value="2">上海市</wb-option>
                <wb-option :value="3">深圳市</wb-option>
                <wb-option :value="4">杭州市</wb-option>
                <wb-option :value="5">南京市</wb-option>
                <wb-option :value="6">重庆市</wb-option>
            </wb-select>
        </Form-item>
        <Form-item label="单选框" prop="radio">
            <Radio-group :value.sync="radio">
                <Radio value="1">
                    男
                </Radio>
                <Radio value="2">
                    女
                </Radio>
            </Radio-group>
        </Form-item>
        <Form-item label="多选框" prop="checkbox">
            <Checkbox-group :value.sync="checkbox">
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
            <switch :on.sync="on">
                <span slot="close">关</span>
                <span slot="open">开</span>
            </switch>
        </Form-item>
        <Form-item label="文本域" prop="textarea">
            <wb-input :value.sync="textarea" type="textarea" :autosize="true" placeholder="请输入"></wb-input>
        </Form-item>
        <Form-item>
            <Wb-button type="primary" @click="click">提交</Wb-button>
            <Wb-button type="ghost" style="margin-left: 8px" @click="reset">重置</Wb-button>
        </Form-item>
    </Wb-form>
</template>
<script>
    export default {
        data: function () {
            return {
                text1: "",
                text2: "",
                text3: "",
                select: "",
                radio: "",
                checkbox: [],
                on: true,
                textarea: "",
                ruleValidate: {
                    text1: [
                        { required: true, message: '不能为空' }
                    ],
                    text2: [
                        { required: true, message: '不能为空' }
                    ],
                    text3: [
                        { required: true, message: '不能为空' }
                    ],
                    select: [
                        { required: true, message: '不能为空' }
                    ],
                    radio:  [
                        { required: true, message: '不能为空' }
                    ],
                    checkbox: [
                        { required: true, message: '不能为空', type: 'array', min: 1 }
                    ],
                    textarea: [
                        { required: true, message: '不能为空' }
                    ]
                }
            }
        },
        ready: function () {
        },
        methods: {
            click(){
                this.$refs["formValidate"].validate(valid => {
                    console.log(valid)
                })
            },
            reset(){
                this.$refs["formValidate"].resetFields()
            }
        }
    }
</script>
```