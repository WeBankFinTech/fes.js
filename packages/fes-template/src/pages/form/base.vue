<template>
    <div class="page">
        <div class="page-header">
            <div class="page-header-title">
                基础表单
            </div>
            <div class="page-header-desc">
                表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。
            </div>
        </div>
        <div class="page-body">
            <Row>
                <Cell offset="5" span="12">
                    <Wb-form ref="formValidate" :rule="ruleValidate" :label-width="150">
                        <Form-item label="是否需要标题:" prop="hasTitle">
                            <Radio-group v-model="form.hasTitle">
                                <Radio value="1">
                                    是
                                </Radio>
                                <Radio value="2">
                                    否
                                </Radio>
                            </Radio-group>
                        </Form-item>
                        <Form-item label="标题:" prop="title">
                            <wb-input v-model="form.title" placeholder="请输入标题"></wb-input>
                        </Form-item>
                        <Form-item label="城市:" prop="city">
                            <wb-select v-model="form.city" placeholder="请选择城市">
                                <wb-option :value="1">北京市</wb-option>
                                <wb-option :value="2">上海市</wb-option>
                                <wb-option :value="3">深圳市</wb-option>
                                <wb-option :value="4">杭州市</wb-option>
                                <wb-option :value="5">南京市</wb-option>
                                <wb-option :value="6">重庆市</wb-option>
                            </wb-select>
                        </Form-item>
                        <Form-item label="娱乐活动:" prop="active">
                            <Checkbox-group v-model="form.active">
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
                        <Form-item label="日期范围:" prop="date">
                            <Wb-input-date-picker v-model="form.date" model="range" />
                        </Form-item>
                        <Form-item label="目标描述:" prop="desc">
                            <wb-input v-model="form.desc" :autosize="true" type="textarea" placeholder="请输入目标描述"></wb-input>
                        </Form-item>
                        <Form-item :value="form.pics" label="图片上传" prop="pics">
                            <Upload :accept="accpetType" :action="handleUpload">
                            </Upload>
                            <div class="img-list">
                                <img v-for="(item, index) in form.pics" :key="index" :src="converToURL(item)" />
                            </div>
                        </Form-item>
                        <Form-item>
                            <Wb-button @click="click" type="primary">提交</Wb-button>
                            <Wb-button @click="reset" type="ghost" class="ml-8">重置</Wb-button>
                        </Form-item>
                    </Wb-form>
                </Cell>
            </Row>
        </div>
    </div>
</template>
<script>
export default {
    FesData() {
        const self = this;
        return {
            form: {
                hasTitle: '',
                title: '',
                city: '',
                active: [],
                date: [],
                desc: '',
                pics: []
            },
            ruleValidate: {
                hasTitle: [
                    { required: true, message: '请选择是否需要标题' }
                ],
                title: [
                    { required: self.form && self.form.hasTitle === '1', message: '请输入标题' }
                ],
                city: [
                    { required: true, message: '请选择城市' }
                ],
                active: [
                    {
                        required: true, message: '请至少选择一个活动', type: 'array', min: 1
                    }
                ],
                pics: [
                    {
                        required: true, message: '请至少上传一张图片', type: 'array', min: 1
                    }
                ]
            },
            accpetType: ['jpg', 'png']
        };
    },
    methods: {
        click() {
            this.$refs.formValidate.validate((valid, errors) => {
                if (valid) {
                    console.log(this.form);
                    // 调用接口
                } else {
                    console.log(errors);
                }
            });
        },
        reset() {
            this.$refs.formValidate.resetFields();
        },
        handleUpload(valid, formData) {
            if (valid) {
                this.form.pics.push(formData.get('upFiles'));
            }
        },
        converToURL(item) {
            return URL.createObjectURL(item);
        }
    }
};
</script>
