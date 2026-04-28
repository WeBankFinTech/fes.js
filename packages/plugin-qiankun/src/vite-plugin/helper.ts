export interface QiankunProps {
    container?: HTMLElement;
    [x: string]: any;
}

export interface QiankunLifeCycle {
    bootstrap: () => void | Promise<void>;
    mount: (props: QiankunProps) => void | Promise<void>;
    unmount: (props: QiankunProps) => void | Promise<void>;
    update: (props: QiankunProps) => void | Promise<void>;
}

export interface QiankunWindow {
    __POWERED_BY_QIANKUN__?: boolean;
    [x: string]: any;
}

export const qiankunWindow: QiankunWindow = typeof window !== 'undefined' ? ((window as any).proxy || window) : {};

export function renderWithQiankun(qiankunLifeCycle: QiankunLifeCycle) {
    if (qiankunWindow?.__POWERED_BY_QIANKUN__) {
        if (!(window as any).moudleQiankunAppLifeCycles) {
            (window as any).moudleQiankunAppLifeCycles = {};
        }
        if (qiankunWindow.qiankunName) {
            (window as any).moudleQiankunAppLifeCycles[qiankunWindow.qiankunName] = qiankunLifeCycle;
        }
    }
}

export default renderWithQiankun;
