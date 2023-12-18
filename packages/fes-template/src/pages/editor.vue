<template>
    <MonacoEditor ref="editorRef" v-model="json" :language="language" height="200px" check />
    {{ json }}
</template>

<config>
{
    "name": "editor",
    "title": "$editor"
}
</config>

<script>
import { onMounted, ref } from 'vue';
import { MonacoEditor, useLayout } from '@fesjs/fes';

export default {
    components: {
        MonacoEditor,
    },
    setup() {
        const { closeTab } = useLayout();

        const editorRef = ref();
        const json = ref('');
        const language = ref('json');
        onMounted(() => {
            setTimeout(() => {
                language.value = 'html';
            }, 2000);
            setTimeout(() => {
                closeTab();
            }, 3000);
        });
        return {
            editorRef,
            json,
            language,
        };
    },
};
</script>
