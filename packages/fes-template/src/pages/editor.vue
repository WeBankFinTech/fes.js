<template>
    <monaco-editor
        ref="editorRef"
        v-model="json"
        :language="language"
        height="200px"
        check
    />
    {{json}}
</template>
<config>
{
    "name": "editor",
    "title": "$editor",
    "keep-alive": true
}
</config>
<script>
import { onMounted, ref } from 'vue';
import { MonacoEditor } from '@fesjs/fes';

export default {
    components: {
        MonacoEditor
    },
    setup() {
        console.log('editor.vue');
        const editorRef = ref();
        const json = ref('');
        const language = ref('json');
        onMounted(() => {
            setTimeout(() => {
                language.value = 'html';
            }, 3000);
        });
        return {
            editorRef,
            json,
            language
        };
    }
};
</script>
