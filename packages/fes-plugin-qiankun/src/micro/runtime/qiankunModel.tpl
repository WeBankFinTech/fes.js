
import { reactive } from 'vue';

let initState;
const setModelState = (val) => {
    initState = val;
};

export default () => reactive(initState);

export { setModelState };
