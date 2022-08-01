import { reactive } from 'vue';
import { cloneDeep } from 'lodash-es'
let initState = reactive({});
const setModelState = (props) => {
    // 使用深拷贝去掉主应用数据和子应用数据的引用关系，避免出现副作用。
    Object.assign(initState, cloneDeep(props))
};

export default () => initState;

export { setModelState };