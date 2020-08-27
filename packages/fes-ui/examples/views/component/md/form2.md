```html
<template>
    <Wb-form type="query">
        <Row>
            <Cell span="12">
                <Form-item label="输入框">
                    <wb-input placeholder="请输入"></wb-input>
                </Form-item>
            </Cell>
            <Cell span="12">
                <Form-item label="密码输入框">
                    <wb-input placeholder="请输入" type="password"></wb-input>
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
<script>
    export default {

    }
</script>
```