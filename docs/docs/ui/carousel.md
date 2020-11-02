---
pageClass: comp-page-class
---
# Carousel 轮播

## 概述
旋转木马，一组轮播的区域

## 代码示例
<ClientOnly>
<row>
    <cell span="12" class="pr-20">
        <componetTemplate title="基础用法" template="ui/templates/carousel/1.html">
            <template v-slot:demo>
                <Carousel :data="list" :interval="interval"></Carousel>
            </template>
            <template v-slot:description>
                <p>传入图片数据后，默认6s一次自动轮播</p>
            </template>
        </componetTemplate>
    </cell>
    <cell span="12" class="pl-20">
    </cell>
</row>
</ClientOnly>

<script>
import banner_ad from "../../images/banner_ad.png"
import banner_apply from "../../images/banner_apply.png"
import banner_tips from "../../images/banner_tips.png"
export default {
    data() {
        return {
            interval: 3000,
            list: [{
                image: banner_ad,
                link: ''
            },{
                image: banner_apply,
                link: ''
            },{
                image: banner_tips,
                link: ''
            }]
        }
    },
    methods: {
    }
}
</script>

## API

### Props
| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| data          |  数据源，包含数据源对象的数组  | Array  |        null              |
| data.image       | 图片的链接 | String   |                 null                        |
| data.link        | 点击图片跳转的URL | String   |                    null               |
| interval        | 轮播频率，多少毫秒一次 | Number   |                    6000              |

