import { defineRoute } from '@fesjs/fes';
import { defineComponent } from 'vue';

defineRoute({
    title: 'test',
    name: 'test'
});

export default defineComponent({
    setup() {
        return () => <div>hello tsx</div>;
    }
});
