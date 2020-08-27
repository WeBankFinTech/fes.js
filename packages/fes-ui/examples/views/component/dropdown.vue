<template>
    <div class="article">
        <h1>Dropdown 下拉菜单</h1>
        <h2>代码示例</h2>
        
        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Dropdown :data="data1">
                        <Wb-button type="primary">Hover</Wb-button>
                    </Dropdown>
                </div>
                <div class="panel-header">
                    <span>基本使用</span>
                </div>
                <div class="panel-desc">
                    <p>在data中提供下拉菜单数据内容，数据格式见API</p>
                </div>
            </Cell>
            <div class="panel-split"></div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown1></markdown1>
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Dropdown :data="data2">
                        <Wb-button type="primary">Hover</Wb-button>
                    </Dropdown>
                </div>
                <div class="panel-header">
                    <span>disabled和divided</span>
                </div>
                <div class="panel-desc">
                    <p>设置相应数据的是否禁用，是否显示分割线</p>
                </div>
            </Cell>
            <div class="panel-split"></div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown2></markdown2>
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Dropdown :data="data3">
                        <Wb-button type="primary">Click1</Wb-button>
                    </Dropdown>


                    <Dropdown :data="data3" trigger="click">
                        <Wb-button type="primary">Click2</Wb-button>
                    </Dropdown>
                </div>
                <div class="panel-header">
                    <span>trigger触发方式</span>
                </div>
                <div class="panel-desc">
                    <p>设置trigger为click,级联菜单点击触发</p>
                </div>
            </Cell>
            <div class="panel-split"></div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown3></markdown3>
                </div>
            </Cell>
        </Row>

        <Row class="panel">
            <Cell class="son-panel" span="12">
                <div class="panel-case">
                    <Dropdown :data="data3" @on-choose="clickItem">
                        <a href="javascript:void(0)">Hover</a>
                    </Dropdown>
                </div>
                <div class="panel-header">
                    <span>item-choose事件</span>
                </div>
                <div class="panel-desc">
                    <p>设置item-choose事件绑定点击某菜单项时候的触发函数</p>
                </div>
            </Cell>
            <div class="panel-split"></div>
            <Cell class="son-panel" span="12">
                <div class="code">
                    <markdown4></markdown4>
                </div>
            </Cell>
        </Row>

        <h2>API</h2>
        <h3>Dropdown props</h3>
        <markdown5></markdown5>
        <h3>Dropdown event</h3>
        <markdown6></markdown6>
        <h3>Dropdown data prop</h3>
        <markdown7></markdown7>
    </div>
</template>
<script type="text/ecmascript-6">
import markdown1 from './md/dropdown1.md'
import markdown2 from './md/dropdown2.md'
import markdown3 from './md/dropdown3.md'
import markdown4 from './md/dropdown4.md'
import markdown5 from './md/dropdown5.md'
import markdown6 from './md/dropdown6.md'
import markdown7 from './md/dropdown7.md'
export default {
    components: {
        markdown1, markdown2, markdown3, markdown4, markdown5, markdown6, markdown7
    },
    data: function () {
        return {
            data1: [
                {
                    content: 'number 1'
                },
                {
                    content: 'number 2'
                },
                {
                    content: 'number 3'
                }
            ],
            data2: [
                {
                    content: 'number 1'
                },
                {
                    content: 'number 2'
                },
                {
                    content: 'number 3',
                    disabled: true
                },
                {
                    content: 'number 4',
                    divided: true
                }
            ],
            data3: [
                {
                    content: 'number 1'
                },
                {
                    content: 'number 2'
                },
                {
                    content: 'sub 1',
                    children: [
                        {
                            content: 'number 3'
                        },
                        {
                            content: 'number 4',
                            divided: true
                        },
                        {
                            content: 'sub 2',
                            children: [
                                {
                                    content: 'sub 3',
                                    children: [
                                        {
                                            content: 'number 6'
                                        }
                                    ]
                                },
                                {
                                    content: 'number 5',
                                    disabled: true
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        clickItem(data, event) {
            console.log(data)
            event.stopPropagation();
        }
    }
}

</script>
