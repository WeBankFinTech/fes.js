```html
<template>
    <Wb-button @click="showModal1">显示普通模态框</Wb-button>
    <modal :show.sync="show1"
           title="新增"
           sub-title="客户信息"
           @on-close="close">
        <Wb-form>
            <Form-item label="输入框">
                <wb-input :value="" placeholder="我是文本哦"></wb-input>
            </Form-item>
            <Form-item label="下拉框">
                <wb-select :value="">
                    <wb-option :value="1">北京市</wb-option>
                    <wb-option :value="2">上海市</wb-option>
                    <wb-option :value="3" :disabled="true">深圳市</wb-option>
                    <wb-option :value="4">杭州市</wb-option>
                    <wb-option :value="5">南京市</wb-option>
                    <wb-option :value="6">重庆市</wb-option>
                </wb-select>
            </Form-item>
            <Form-item label="单选框">
                <Radio-group :value="">
                    <Radio value="1">
                        <Icon type="apple-o"></Icon>apple
                    </Radio>
                    <Radio value="2">
                        <Icon type="android"></Icon>android
                    </Radio>
                    <Radio value="3" :disabled="true">
                        <Icon type="github"></Icon>github
                    </Radio>
                </Radio-group>
            </Form-item>
            <Form-item label="多选框">
                <Checkbox-group :value="">
                    <Checkbox value="1">
                        <Icon type="apple-o"></Icon>apple
                    </Checkbox>
                    <Checkbox value="2">
                        <Icon type="android"></Icon>android
                    </Checkbox>
                    <Checkbox value="3">
                        <Icon type="github"></Icon>github
                    </Checkbox>
                </Checkbox-group>
            </Form-item>
            <Form-item label="开关">
                <switch :on.sync="">
                    <span slot="close">关</span>
                    <span slot="open">开</span>
                </switch>
            </Form-item>
            <Form-item>
                <button class="ui-button">提交</button>
            </Form-item>
        </Wb-form>
    </modal>
</template>
<script>
    export default {
        data: function () {
            return {
                show1: false,
            }
        },
        ready: function () {
        },
        methods: {
            showModal1: function () {
                this.show1 = true;
            },
            close: function () {

            }
        }
    }
</script>
```