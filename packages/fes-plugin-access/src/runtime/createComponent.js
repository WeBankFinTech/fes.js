export default function createComponent(useAccess) {
    return (props, { slots }) => {
        const access = useAccess(props.id);
        if (!access.value || !slots.default) return null;
        return slots.default();
    };
}
