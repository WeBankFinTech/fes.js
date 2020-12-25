import { computed } from 'vue';
// eslint-disable-next-line
import icons from './icons';

const noop = () => { };

export default {
    name: 'FesIcon',
    props: ['type', 'spin', 'rotate', 'tabIndex'],
    setup(props, { attrs }) {
        const CurrentIcon = computed(() => icons[props.type]);
        const iconTabIndex = computed(() => {
            let tabIndex = props.tabIndex;
            if (tabIndex == null && attrs.onClick) {
                tabIndex = -1;
            }
            return tabIndex;
        });
        const svgStyle = computed(() => (props.rotate
            ? {
                msTransform: `rotate(${props.rotate}deg)`,
                transform: `rotate(${props.rotate}deg)`
            }
            : null));
        const svgCls = computed(() => ({
            'inner-icon--spin': !!props.spin || props.type === 'loading'
        }));
        return () => (
            <span
                tabIndex={iconTabIndex.value}
                role="img"
                class="inner-icon"
                onClick={attrs.onClick || noop}
            >
                <CurrentIcon.value class={svgCls.value} style={svgStyle.value} />
            </span>
        );
    }
};
