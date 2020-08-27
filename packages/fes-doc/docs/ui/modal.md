---
pageClass: comp-page-class
---
# Modal 模态框

## 概述
主要用于在不跳转页面的前提下，在当前流程里面展示部分内容，可以是表单可以是一大段描述。

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/modal/1.html">
            <template v-slot:demo>
                <Wb-button @click="showModal1">显示弹窗</Wb-button>
                <modal ref="modal1"
                        title="新增"
                        sub-title="客户信息"
                        @on-close="close">
                    <Wb-form>
                        <Form-item label="输入框">
                            <Wb-input placeholder="我是文本哦"></Wb-input>
                        </Form-item>
                        <Form-item label="下拉框">
                            <Wb-select>
                                <wb-option :value="1">北京市</wb-option>
                                <wb-option :value="2">上海市</wb-option>
                                <wb-option :value="3" disabled>深圳市</wb-option>
                                <wb-option :value="4">杭州市</wb-option>
                                <wb-option :value="5">南京市</wb-option>
                                <wb-option :value="6">重庆市</wb-option>
                            </Wb-select>
                        </Form-item>
                        <Form-item label="单选框">
                            <Radio-group>
                                <Radio value="1">
                                    apple
                                </Radio>
                                <Radio value="2">
                                    android
                                </Radio>
                                <Radio value="3" disabled>
                                    github
                                </Radio>
                            </Radio-group>
                        </Form-item>
                        <Form-item label="多选框">
                            <Checkbox-group>
                                <Checkbox value="1">
                                    apple
                                </Checkbox>
                                <Checkbox value="2">
                                    android
                                </Checkbox>
                                <Checkbox value="3">
                                    github
                                </Checkbox>
                            </Checkbox-group>
                        </Form-item>
                        <Form-item label="开关">
                            <Wb-switch>
                                <span slot="close">关</span>
                                <span slot="open">开</span>
                            </Wb-switch>
                        </Form-item>
                        <Form-item>
                            <Wb-button type="primary">提交</Wb-button>
                        </Form-item>
                    </Wb-form>
                </modal>
            </template>
            <template v-slot:description>
                <p>最基本的模态框</p>
                <p>按下Esc、按下关闭按钮、点击Modal之外的区域均可以关闭Modal</p>
            </template>
        </componetTemplate>
        <componetTemplate title="全屏显示" template="ui/templates/modal/2.html">
            <template v-slot:demo>
                <Wb-button @click='showModal3'>显示弹窗</Wb-button>
                <modal ref="modal3"
                        title="我是标题"
                        sub-title="我是副标题"
                        canFullScreen>
                    我是内容，我是内容
                </modal>
            </template>
            <template v-slot:description>
                <p>设置canFullScreen为true，显示全屏控制Icon</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="超出屏幕高的模态框" template="ui/templates/modal/3.html">
            <template v-slot:demo>
                <Wb-button @click='showModal2'>显示弹窗</Wb-button>
                <modal ref="modal2"
                        width="600"
                        title="我是标题"
                        sub-title="我是副标题"
                        @on-close="close"
                        @on-scroll="scroll">
                    <div style="height:1000px">
                        我是内容，我是内容
                    </div>
                </modal>
            </template>
            <template v-slot:description>
                <p>超出屏幕高的模态框显示时，可以滚动查看</p>
            </template>
        </componetTemplate>
        <componetTemplate title="是否关闭" template="ui/templates/modal/4.html">
            <template v-slot:demo>
                <Wb-button @click='showModal4'>显示弹窗</Wb-button>
                <modal ref="modal4"
                        title="我是标题"
                        sub-title="我是副标题"
                        :beforeClose="beforeClose">
                    我是内容，我是内容
                </modal>
            </template>
            <template v-slot:description>
                <p>设置beforeClose，在关闭前执行，通过执行结果判断是否关闭模态框</p>
            </template>
        </componetTemplate>
    </cell>
</row>
</ClientOnly>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        showModal1 () {
            this.$refs.modal1.show()
        },
        showModal2 () {
            this.$refs.modal2.show()
        },
        showModal3 () {
            this.$refs.modal3.show()
        },
        showModal4 () {
            this.$refs.modal4.show()
        },
        beforeClose(){
            return new Promise((resolve, reject)=>{
                this.$Message.confirm("是否关闭模态框？").then(function (index) {
                    resolve(index === 0)
                })
            })
        },
        close () {
            console.log('closed')
        },
        scroll (event) {
            console.log(event)
        }
    }
}
</script>

<style>
.ui-modal-body{
    font-size: 14px;
}
</style>

## API
通过组件实例的`show`方法显示模态框
```js
this.$refs.modal.show()
```

### Props

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| title          |  主标题  | String  |        null              |
| subTitle       | 副标题 | String   |                 null                        |
| width       | 模态框的宽度 | Number   |                400            |
| closeOnClickShadow        | 点击背景是否关闭modal | Boolean   |                    true              |
| canFullScreen        | 是否显示全屏按钮 | Boolean   |                    false              |
| disableEsc        | 是否禁止使用ESC关闭模态框 | Boolean   |                    false              |
| beforeClose        | 关闭前执行的函数，必须返回promise | Function   |                    null              |



### Events

| 事件名           | 说明                       | 返回值     |       
|:--------------|:--------------------------|:--------|
| on-close          | 关闭模态框时触发  | () => void  |    
| on-scroll          | 滚动模态框时触发  | (event) => void  | 