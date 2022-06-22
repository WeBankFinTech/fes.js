import '@fesjs/fes';

interface WatermarkParam {
    content: string;
    container: HTMLElement;
    width: number;
    height: number;
    textAlign: 'left' | 'right' | 'center' | 'start' | 'end';
    textBaseline: 'top' | 'hanging' | 'middle' | 'alphabetic' | 'ideographic' | 'bottom';
    fontSize: string;
    fontFamily: string;
    fillStyle: string;
    rotate: number;
    zIndex: number;
    timestamp: string;
}

declare module '@fesjs/fes' {
    interface PluginBuildConfig {
        watermark?: {
            disable: boolean;
        } | false;
    }

    export function createWatermark(param: WatermarkParam): void;
    export function destroyWatermark(): void;
}
