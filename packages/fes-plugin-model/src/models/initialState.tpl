import { reactive, toRefs, inject } from "vue";

export default function initalModel() {
    const initialState = reactive(inject("initialState"));
    const setInitialState = (obj) => {
        initState = reactive(obj);
    };
    return toRefs({
        initialState,
        setInitialState
    });
}
