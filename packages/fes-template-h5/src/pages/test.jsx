import { defineRouteMeta, useRoute } from '@fesjs/fes';
import { defineComponent } from 'vue';

// console.log(defineRouteMeta);

// defineRouteMeta({
//     title: 'test',
//     name: 'test',
// });

export default defineComponent({
    setup() {
        const route = useRoute();
        console.log(route);
        return () => <div>hello tsx</div>;
    },
});
