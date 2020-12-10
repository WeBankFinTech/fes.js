import { defineComponent } from 'vue'

export function rootContainer(childComponent, args){
    console.log(childComponent, args)
    const App = {
        setup() {
            const state = reactive({
                loading: true
            })
            onMounted(()=>{
                setTimeout(() => {
                    state.loading = false
                }, 3000);
            })
            return () => {
                if(state.loading){
                    return (
                        <>
                            <div>loading</div>
                        </>
                    )
                }
                return <childComponent />
            }
        }
    }
    return App
}