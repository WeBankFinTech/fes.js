import { reactive, toRefs, onMounted } from "vue";
import { plugin, ApplyPluginsType } from "@@/core/coreExports";

async function getInitialState() {
    const appGetInitialState = plugin.applyPlugins({
        key: "getInitialState",
        type: ApplyPluginsType.modify,
        initialValue: {},
    });
    return await appGetInitialState;
}
const initState = reactive({
    initialState: undefined,
    loading: true,
    error: undefined,
});

export default function initalModel() {
    const refresh = async () => {
        initState.loading = true;
        initState.error = undefined;
        try {
            const res = await getInitialState();
            initState.initialState = res;
            initState.loading = false;
        } catch (e) {
            console.error(e)
            initState.loading = false;
            initState.error = e;
        }
    };
    onMounted(refresh);
    return toRefs(initState);
}
