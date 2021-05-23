<template>
    <div class="upload-page article">
        <h1>Upload 上传</h1>
        <h2>概述</h2>
        <p>实现文件上传的功能。</p>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Upload v-for="(item, index) in data" url="test" @on-fail="fail" :max-size="10" :key="index" :accept="option.accept" >
                        <!-- <Wb-button>点击上传{{ item.url }}</Wb-button> -->
                    </Upload>
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>给任意dom或者组件添加upload指令，则点击时就会触发选择文件，选择完毕上传文件</p>
                    <p>上传成功触发on-upload-success，上传失败触发on-upload-fail</p>
                </div>
            </Cell>
            <div class="panel-split" />
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown />
                </div>
            </Cell>
        </Row>

        <h2>API</h2>
        <h3>UploadOption props</h3>
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
                        <td style="text-align:left">api</td>
                        <td style="text-align:left">文件上传的远程api地址</td>
                        <td style="text-align:left">String</td>
                        <td style="text-align:left">null</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">accept</td>
                        <td style="text-align:left">支持上传什么类型的文件</td>
                        <td style="text-align:left">String</td>
                        <td style="text-align:left">*</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">multiple</td>
                        <td style="text-align:left">是否支持多文件</td>
                        <td style="text-align:left">Boolean</td>
                        <td style="text-align:left">false</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">maxSize</td>
                        <td style="text-align:left">文件最大体积</td>
                        <td style="text-align:left">Number</td>
                        <td style="text-align:left">2097152 byte</td>
                    </tr>
                </tbody>
            </table>
        </section>

        <h3>Upload events</h3>
        <section>
            <table>
                <thead>
                    <tr>
                        <th style="text-align:left">属性</th>
                        <th style="text-align:left">说明</th>
                        <th style="text-align:left">参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="text-align:left">on-upload-success</td>
                        <td style="text-align:left">上传成功触发</td>
                        <td style="text-align:left">files</td>
                    </tr>
                    <tr>
                        <td style="text-align:left">on-upload-fail</td>
                        <td style="text-align:left">上传失败触发</td>
                        <td style="text-align:left">files</td>
                    </tr>
                </tbody>
            </table>
        </section>

    </div>
</template>
<script>
import axios from 'axios'
import markdown from './md/upload.md'
export default {
    components: {
        markdown
    },
    data() {
        return {
            data: [{
                index: 1,
                url: ''
            }, {
                index: 2,
                url: ''
            }],
            option: {
                api: 'http://localhost:5000/card/uploadimg',
                accept: 'jpg',
                imageSize: {
                    width: 91,
                    height: 124
                }
            },
            action: function (rst, data) {
                console.log(rst)
                console.log(data)
                if (rst) {
                    axios.post('/upload', data)
                }
            }
        }
    },
    mounted: function () {
    },
    methods: {
        sucess(file, result, arg) {

        },
        fail(files, status) {
            console.log(files)
        }
    }
}
</script>
