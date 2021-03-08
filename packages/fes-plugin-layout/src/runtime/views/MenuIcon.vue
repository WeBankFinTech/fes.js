<script>
// 使用 ant-design/icons-vue
// 使用 本地 svg 图片
// 使用 远程 svg 地址
// eslint-disable-next-line import/extensions
import Icons from '../icons';
// import AntdIcon from '@ant-design/icons-vue/es/components/AntdIcon';
export default {
    props: {
        icon: String
    },
    setup(props) {
        const AIcon = Icons[props.icon];
        return () => {
            if (AIcon) {
                return < AIcon />;
            }
            return null;
        };
    }
};
</script>
