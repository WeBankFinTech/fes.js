import '@fesjs/fes';

interface WatermarkParam {
    content?: string;
    container?: HTMLElement;
    width?: number;
    height?: number;
    textAlign?: 'center' | 'end' | 'left' | 'right' | 'start';
    textBaseline?:
        | 'alphabetic'
        | 'bottom'
        | 'hanging'
        | 'ideographic'
        | 'middle'
        | 'top';
    fontSize?: string;
    fontFamily?: string;
    fillStyle?: string;
    rotate?: number;
    zIndex?: number;
    timestamp?: string | false;
    watch?: boolean;
}
export function createWatermark(param: WatermarkParam): void;
export function destroyWatermark(): void;

declare module '@fesjs/fes' {
    interface PluginBuildConfig {
        watermark?: {
            disable: boolean;
        } | false;
    }
}
