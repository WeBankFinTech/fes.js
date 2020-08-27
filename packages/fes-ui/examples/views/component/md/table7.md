```html
<template>
    <Tree-table :data="treeDate">
        <Column key="sid" name="Col-a"></Column>
        <Column key="scenario_name" name="Col-b"></Column>
    </Tree-table>
</template>
<script>
    export default {
        data: function(){
            return {
                treeDate: [{
                    sid: "1",
                    scenario_name: "js",
                    children: [{
                        sid: "1.1",
                        scenario_name: "nj",
                    }, {
                        sid: "1.2",
                        scenario_name: "sz",
                        children: [{
                            sid: "1.2.1",
                            scenario_name: "wj",
                        }, {
                            sid: "1.2.2",
                            scenario_name: "cs",
                        }]
                    }]
                }, {
                    sid: "2",
                    scenario_name: "yn",
                    children: [{
                        sid: "2.1",
                        scenario_name: "wj",
                    }, {
                        sid: "2.2",
                        scenario_name: "cs"
                    }]
                }, {
                    sid: "3",
                    scenario_name: "fj",
                }]
            }
        }
    }
</script>
```