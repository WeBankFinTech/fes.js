---
pageClass: comp-page-class
---
# Icon 图标

## 概述
使用字体文字实现小图标，能控制图标的颜色和大小。`Fes-ui`的图标使用开源项目[ionicons](https://ionicons.com/) 4.x版本。

## 代码示例
<ClientOnly>
<componetTemplate title="基础用法" template="ui/templates/icon/1.html">
    <template v-slot:demo>
        <icon type="ios-airplane" size="20"></icon>
        <icon type="md-airplane" color="red" size="20"></icon>
    </template>
    <template v-slot:description>
        <p>使用Icon标签声明组件，指定图标对应的type属性，通过size属性设置大小，通过color属性设置颜色。</p>
    </template>
</componetTemplate>
</ClientOnly>

### 全部图标
<ul class="ui-icons-list">
    <li v-for="(icon, index) in icons" :key="index">
        <i :class="[`ui-icon-${icon}`]" class="ui-icon"></i><span class="ui-icon-class">{{icon}}</span>
    </li>
</ul>

<script>
import data from '../data.json';
export default {
    data() {
        const icons = [];
        data.icons.forEach((item) => {
            item.icons.forEach((i) => {
                icons.push(i);
            });
        });
        return {
            icons
        };
    },
    methods: {
    }
}
</script>


## API

| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| type          | 图标的名称  | String  |        null              |
| size        | 图标的大小 |  Number   |                     12                        |
| color        | 图标的颜色 |  Number   |                     null                        |
