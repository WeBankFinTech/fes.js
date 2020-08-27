```html
<template>
    <route-menu :menu="menu" :width="150"></route-menu>
</template>
<script>
export default {
    data() {
        return {
            menu: [
                {
                    title: "组件",
                    subMenu: [
                        {
                            title: 'Layout 栅格',
                            path: '/layout'
                        },
                        {
                            title: 'Icon 图标',
                            path: '/icon'
                        }
                    ]
                }, {
                    title: "Button",
                    path: '/button'
                }, {
                    title: "Tab",
                    path: '/tab'
                }, {
                    title: "Zoom",
                    path: '/zoom'
                }
            ]
        }
    }
}
</script>
```