export function rootContainer(childComponent, args) {
    const useRuntimeConfig =
        plugin.applyPlugins({
            key: "initialStateConfig",
            type: ApplyPluginsType.modify,
            initialValue: {},
        }) || {};
    return {
        setup() {
            const { loading } = useModel("@@initialState") || {};
            return () => {
                if (loading.value) {
                    return useRuntimeConfig.loading ? (
                        <useRuntimeConfig.loading />
                    ) : (
                        <></>
                    );
                }
                return <childComponent />;
            };
        },
    };
}