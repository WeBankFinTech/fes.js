```html
<template>
    <Tabs current="apple">
        <Tab label="标签一" key="android" icon="android">
            <Wb-button type="ghost" slot="action">按钮一</Wb-button>
            <p>1</p>
        </Tab>
        <Tab label="标签二" key="apple" icon="apple">
            <Wb-button type="ghost" slot="action">按钮二</Wb-button>
            <p>2</p>
        </Tab>
        <Tab label="标签三" key="windows" icon="windows">
            <Wb-button type="ghost" slot="action">按钮三</Wb-button>
            <p>3</p>
        </Tab>
    </Tabs>
</template>
<script>
    export default {

    }
</script>
```