import { inject, reactive } from "vue";

export default function initalModel() {
    return reactive(inject("initialState"));
}
