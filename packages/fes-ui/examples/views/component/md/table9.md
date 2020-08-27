| 属性           | 说明                       | 类型     |        默认值                                          |
|:--------------|:--------------------------|:--------|:-----------------------------------------------------|
| prop          | 列的唯一标识，对应着数据源对象的属性  | String  |        null              |
| name          | 列的标题  | String  |        null              |
| index          | 列的顺序索引，动态改变列时，所有列从左向右依次递增显示  | Number  |        0              |
| align          | 列文字对齐方向，可选值有"left"、"center"、"right"  | String  |        left             |
| width          | 列的宽度，传入"200px"或者"10%"  | String  |        null             |
| classes          | 控制TD的样式，当是function时，入参是td的原始值，返回结果必须是string  | String\|Function  |        null          |
| sort          | 列是否可以排序  | Boolean  |       false              |
| filter          | 列的过滤器，把原始值转换成展示需要的内容  | Array\|Function  |        null              |
| action          | 配置按钮列，当前列只显示按钮  | Array\|Object  |        null             |
| component       | 配置子组件列  | Function  |        null              |
| editable       | 配置编辑列  |         Object             |       null              |
