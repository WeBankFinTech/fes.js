<script>
import { ref, onBeforeMount, isVNode } from 'vue';
// eslint-disable-next-line import/extensions
import Icons from '../icons';
import { validateContent } from '../helpers/svg';

const urlReg = /^((https?|ftp|file):\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
const isUrlResource = name => urlReg.test(name) || name.includes('.svg');

export default {
    props: {
        icon: [String, Object]
    },
    setup(props) {
        const AIconComponent = ref(null);
        const AText = ref(null);

        onBeforeMount(() => {
            if (typeof props.icon === 'string') {
                if (isUrlResource(props.icon)) {
                    fetch(props.icon).then((rsp) => {
                        if (rsp.ok) {
                            return rsp.text().then((svgContent) => {
                                AText.value = validateContent(svgContent);
                            });
                        }
                    });
                } else {
                    AIconComponent.value = Icons[props.icon];
                }
            }
        });

        return () => {
            if (isVNode(props.icon)) {
                return props.icon;
            }
            if (AIconComponent.value) {
                return <AIconComponent.value />;
            }
            if (AText.value) {
                return (
                    <span
                        class={'fes-layout-icon'}
                        innerHTML={AText.value}
                    ></span>
                );
            }
            return null;
        };
    }
};
</script>
<style>
.fes-layout-icon {
    display: inline-block;
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -0.125em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    min-width: 14px;
    font-size: 14px;
}
</style>
