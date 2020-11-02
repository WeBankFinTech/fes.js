---
pageClass: comp-page-class
---
# Upload 上传

## 概述
实现文件上传的功能。

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/upload/1.html">
            <template v-slot:demo>
                <Upload url="/upload" param="file" :accept="accpetType" @on-success="success" @on-fail="fail">
                </Upload>
                <Upload url="/upload" param="file" :accept="accpetType" @on-success="success" @on-fail="fail">
                    <Wb-button type="primary">点击上传</Wb-button>
                </Upload>
            </template>
            <template v-slot:description>
                <p>Upload组件可以直接使用，也可以通过slot自定义UI，点击触发选择文件，选择完毕使用XHR上传选择的文件。</p>
                <p>通过设置accept来设置接收上传的文件类型。</p>
                <p>on-success返回两个参数，第一个是上传文件的列表，第二个是通过返回的数据信息。</p>
                <p>on-fail返回两个参数，第一个是上传文件的列表，第二个是上传失败相关的信息。</p></p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
        <componetTemplate title="高级用法" template="ui/templates/upload/2.html">
            <template v-slot:demo>
                <Upload :max-size="maxSize" :image-size="imageSize" :accept="accpetType" :action="action">
                </Upload>
            </template>
            <template v-slot:description>
                <p>如果设置action，则Upload内部不上传文件，需要用户自行处理上传。action有两个参数，第一个参数代表否通过已设置的较验规则，第二个参数包含上传文件的formData。</p>
                <p>通过设置maxSize来设置最大上传文件的大小（单位：byte）。</p>
                <p>通过设置image-size来限制上传图片的宽高。</p>
            </template>
        </componetTemplate>
    </cell>
</Row>
</ClientOnly>

<script>
import png from "../../images/framework.jpg"
export default {
    data() {
        return {
            accpetType: ['jpg', 'png'],
            maxSize: 1024 * 1024,  
            imageSize: {
                width: 200,
                height: 100
            }
        }
    },
    methods: {
        action(valid, formData) {
            console.log(valid)
            console.log(formData)
        },
        success(files, result, arg) {
            console.log(files)
            console.log(result)
        },
        fail(files, result) {
            console.log(files)
            console.log(result)
        }
    }
}
</script>

## API

### Props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| url          |  文件上传的远程api地址  | String  |        null              |
| param       |  配置`url`时，上传文件的请求参数名 | String   |                   `upFiles`                      |
| accept        | 支持上传什么类型的文件 | String, Array   |             `*`                      |
| multiple       |  是否支持多文件 | Boolean   |                 false                  |
| maxSize        | 文件最大体积，单位是byte | Number   |          2097152                   |
| imageSize       |  当上传是图片文件时，控制图片的分辨率， 例如{width:200, height:200} | Object   |                -                    |
| action        | 配置手动执行上传动作，如果配置了action，则URL不是必须的。action有两个参数，第一个参数代表否通过已设置的较验规则，第二个参数包含上传文件的formData | Function   |             -                     |

### Events
| 事件名           | 说明                            |        返回值                                          |
|:----------------|:--------------------------|:-----------------------------------------------------|
| on-success        |  上传成功触发  |        (files, result)             |
| on-fail       |  上传失败触发  |        (files, result)             |