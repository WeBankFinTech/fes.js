import type { EditorLanguage } from 'monaco-editor-webpack-plugin/out/languages';
import type { EditorFeature } from 'monaco-editor-webpack-plugin/out/features';

export interface MonacoEditorBuildConfig {
    monacoEditor: {
        filename: string;
        publicPath: string;
        languages: EditorLanguage[];
        features: EditorFeature[];
        globalAPI: boolean;
    };
}
