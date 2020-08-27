```html
<template>
    <Tree :data="data"></Tree>
</template>
<script>
    export default {
        data: function () {
          return {
              data: [{
                  name: "Jiangsu",
                  code: "js",
                  expand: true,
                  children: [{
                      name: "Nanjing",
                      code: "nj",
                      selected: true
                  }, {
                      name: "Suzhou",
                      code: "sz",
                      children: [{
                          name: "Wujiang",
                          code: "wj"
                      }, {
                          name: "Changshu",
                          code: "cs"
                      }]
                  }]
              }, {
                  name: "Yunnan",
                  code: "yn"
              }, {
                  name: "Fujian",
                  code: "fj"
              }]
          }
        },
    }
</script>
```