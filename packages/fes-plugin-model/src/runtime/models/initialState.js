import { inject } from 'vue';

export default function initialStateModel() {
    return inject('initialState');
}
