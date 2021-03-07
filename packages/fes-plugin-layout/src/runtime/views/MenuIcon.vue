<script>
// 使用 ant-design/icons-vue
// 使用 本地 svg 图片
// 使用 远程 svg 地址
import { ref, onMounted } from 'vue';
// import AntdIcon from '@ant-design/icons-vue/es/components/AntdIcon';
export default {
    props: {
        icon: String
    },
    setup(props) {
        const AIcon = ref(null);
        onMounted(()=>{
            const iconName = props.icon.slice(0, 1).toUpperCase() + props.icon.slice(1) + 'Outlined';
            import(`@ant-design/icons-vue/es/icons/${iconName}`).then(res=>{
                AIcon.value = res.default;
            }).catch(e=>{
                console.warn(`[fes-layout] icon ${props.icon} 不存在！`)
            })
        })
        return ()=>{
            if(AIcon.value){
                return <AIcon.value />
            }
            return null
        }

    }
}
</script>
