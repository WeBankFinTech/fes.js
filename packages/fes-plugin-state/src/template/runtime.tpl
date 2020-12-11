import { defineComponent, reactive, onMounted } from "vue";
import { plugin, ApplyPluginsType } from "@@/core/coreExports";
import { useModel } from "./core.js";

export function rootContainer(childComponent, args) {
    const useRuntimeConfig =
        plugin.applyPlugins({
            key: "initialStateConfig",
            type: ApplyPluginsType.modify,
            initialValue: {},
        }) || {};
    return () => {
        const { loading = false } = useModel("@@initialState") || {};
        if (loading) {
            return useRuntimeConfig.loading ? (
                <useRuntimeConfig.loading />
            ) : (
                <>
                    <div>loading</div>
                </>
            );
        }
        return <childComponent />;
    };
}
