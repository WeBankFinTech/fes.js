<template>
    <div class="icon-page article">
        <h1>Icon 图标</h1>
        <h2>概述</h2>
        <p>使用字体文字实现小图标，能控制图标的颜色和大小</p>

        <h2>代码示例</h2>
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <icon type="ios-add" color="red" size="20"></icon>
                    <icon type="ios-add-circle" color="red" size="20"></icon>
                </div>
                <div class="panel-header">
                    <span>基础用法</span>
                </div>
                <div class="panel-desc">
                    <p>水平排列的布局，Cell必须放在Row里面</p>
                </div>
            </Cell>
            <div class="panel-split"></div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown1></markdown1>
                </div>
            </Cell>
        </Row>

        <h2>API</h2>
        <h3>Icon props</h3>
        <markdown2></markdown2>

        <h2>示例:</h2>
        <ul class="ui-icons-list">
            <li v-for="(icon, index) in icons" :key="index">
                <i :class="[`ui-icon-${icon}`]" class="ui-icon"></i><span class="ui-icon-class">{{icon}}</span>
            </li>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">
import markdown1 from './md/icon1.md';
import markdown2 from './md/icon2.md';
import data from '../../data.json';

export default {
    components: {
        markdown1,
        markdown2
    },
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
    }
};
</script>
