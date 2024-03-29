import type { Component } from 'vue';
import type { EditorLanguage } from 'monaco-editor-webpack-plugin/out/languages';
import type { EditorFeature } from 'monaco-editor-webpack-plugin/out/features';

export const MonacoEditor: Component;
declare module '@fesjs/fes' {
    interface PluginBuildConfig {
        monacoEditor?: {
            filename: string;
            publicPath: string;
            languages: EditorLanguage[];
            features: EditorFeature[];
            globalAPI: boolean;
        } | false;
    }
}
