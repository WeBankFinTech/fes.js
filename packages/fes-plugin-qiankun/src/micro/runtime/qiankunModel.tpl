import { reactive } from 'vue';

let initState = reactive({});
const setModelState = (props) => {
    Object.assign(initState, props)
};

export default () => initState;

export { setModelState };