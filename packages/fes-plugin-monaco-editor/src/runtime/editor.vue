<template>
    <section ref="containRef" :style="style" class="editor" />
</template>
<script>
import {
    computed, ref, watch, onMounted, onBeforeUnmount
} from 'vue';
import { merge, debounce } from 'lodash';
// eslint-disable-next-line
import monaco from './loader';

const processSize = function (size) {
    return !/^\d+$/.test(size) ? size : `${size}px`;
};

export default {
    name: 'MonacoEditor',
    props: {
        theme: {
            type: String,
            default: 'defaultTheme'
        },
        language: {
            type: String,
            default: ''
        },
        height: {
            type: [String, Number],
            default: '100%'
        },
        width: {
            type: [String, Number],
            default: '100%'
        },
        modelValue: String,
        readOnly: Boolean,
        options: Object,
        check: {
            type: Boolean,
            default: false
        }
    },
    emits: ['update:modelValue', 'onload', 'scrollChange'],
    setup(props, { emit }) {
        const containRef = ref(null);

        const style = computed(() => {
            const fixedWidth = processSize(props.width);
            const fixedHeight = processSize(props.height);
            return {
                width: fixedWidth,
                height: fixedHeight
            };
        });

        const currentConfig = computed(() => {
            const config = merge(
                {
                    automaticLayout: true,
                    scrollBeyondLastLine: false,
                    minimap: {
                        enabled: false
                    },
                    glyphMargin: true,
                    fontSize: '14px',
                    contextmenu: true
                },
                props.options,
                {
                    readOnly: props.readOnly
                }
            );
            return config;
        });

        let editor;
        let editorModel;

        const getValue = () => {
            if (!editor) {
                return '';
            }
            const text = editor.getValue({
                lineEnding: '\n',
                preserveBOM: false
            });
            // 如果开启检查
            if (props.check) {
                if (props.language === 'json') {
                    try {
                        JSON.parse(text);
                    } catch (e) {
                        return props.modelValue;
                    }
                }
            }
            return text;
        };

        watch(currentConfig, () => {
            if (editor) {
                editor.updateOptions(currentConfig.value);
            }
        });

        watch(() => props.language, (newVal) => {
            if (editorModel) {
                monaco.editor.setModelLanguage(editorModel, newVal);
            }
        });

        watch(() => props.theme, (newVal) => {
            if (editor) {
                monaco.editor.setTheme(newVal);
            }
        });

        watch([() => props.width, () => props.height], () => {
            if (editor) {
                editor.layout();
            }
        });

        watch(
            () => props.modelValue,
            (newValue) => {
                if (!editor) {
                    return;
                }
                if (newValue === getValue()) {
                    return;
                }
                const readOnly = editor.getRawOptions().readOnly;
                if (readOnly) {
                    // editor.setValue 和 model.setValue 都会丢失撤销栈
                    editor.setValue(newValue);
                } else {
                    // 有撤销栈
                    const range = editorModel.getFullModelRange();
                    const text = newValue;
                    const op = {
                        identifier: {
                            major: 1,
                            minor: 1
                        },
                        range,
                        text,
                        forceMoveMarkers: true
                    };
                    editor.executeEdits('insertValue', [op]);
                }
            }
        );

        const initMonaco = () => {
            if (!containRef.value) {
                return;
            }
            editor = monaco.editor.create(containRef.value, {
                ...currentConfig.value,
                language: props.language,
                theme: props.theme,
                value: props.modelValue
            });
            editorModel = editor.getModel();
            emit('onload', {
                monaco,
                editor,
                editorModel
            });
            editor.onDidScrollChange(
                debounce((e) => {
                    emit('scrollChange', e);
                }),
                300
            );
            // 内容改变
            editor.onDidChangeModelContent(
                debounce(() => {
                    emit('update:modelValue', getValue());
                }),
                100
            );
            // 焦点离开事件
            editor.onDidBlurEditorText(() => {
                // 格式化代码
                editor.trigger('anyString', 'editor.action.formatDocument');
            });
        };

        const undo = () => {
            if (!editor) return;
            editor.trigger('anyString', 'undo');
        };

        const redo = () => {
            if (!editor) return;
            editor.trigger('anyString', 'redo');
        };

        /**
         * 保存的编辑状态 ViewState
         *  Yes, editor.saveViewState stores:
            cursor position
            scroll location
            folded sections
            for a certain model when it is connected to an editor instance.
            Once the same model is connected to the same or a different editor instance, editor.restoreViewState can be used to restore the above listed state.

            There are very many things that influence how rendering occurs:
            the current theme
            the current wrapping settings set on the editor
            the enablement of a minimap, etc.
            the current language configured for a model
            etc.
         */
        const saveViewState = () => {
            if (!editorModel) return;
            editorModel.viewState = editor.saveViewState();
        };

        // 重置之前保存的编辑状态 ViewState
        const restoreViewState = () => {
            if (editorModel && editorModel.viewState) {
                editor.restoreViewState(editorModel.viewState);
            }
        };

        // 获取选择的内容
        const getValueInRange = () => {
            if (!editor) return;
            const selection = editor.getSelection();
            return selection.isEmpty()
                ? null
                : editorModel.getValueInRange(selection);
        };

        // 在编辑器选中的范围插入值
        const insertValueIntoEditor = (value) => {
            if (!editor) {
                return;
            }
            const SelectedRange = editor.getSelection();
            let range = null;
            if (SelectedRange) {
                range = new monaco.Range(
                    SelectedRange.startLineNumber,
                    SelectedRange.startColumn,
                    SelectedRange.endLineNumber,
                    SelectedRange.endColumn
                );
                const text = value;
                const op = {
                    identifier: {
                        major: 1,
                        minor: 1
                    },
                    range,
                    text,
                    forceMoveMarkers: true
                };
                editor.executeEdits('insertValue', [op]);
            }
        };

        onMounted(() => {
            initMonaco();
        });

        onBeforeUnmount(() => {
            // 销毁 editor，进行gc
            editor && editor.dispose();
            editorModel && editorModel.dispose();
        });

        return {
            containRef,
            style,
            undo,
            redo,
            saveViewState,
            restoreViewState,
            getValueInRange,
            insertValueIntoEditor
        };
    }
};
</script>
<style lang="less">
.editor {
  height: 100%;
  width: 100%;
  .monaco-editor.rename-box {
    left: 0;
    top: 0;
  }
  .glyphMarginErrorClass {
    background: #ff5500;
  }
  .contentErrorClass {
    background: rgba(#ff5500, 0.2);
  }
}
</style>
