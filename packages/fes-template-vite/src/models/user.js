import { ref } from 'vue';

export default function user() {
    const count = ref(1);
    return {
        count
    };
}
