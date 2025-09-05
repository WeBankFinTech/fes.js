import type { Plugin } from 'vite';

export default {
    name: 'sfc-config',
    transform(code: string, id: string) {
        if (/vue&type=config/.test(id)) {
            return `export default ''`;
        }
    },
} as Plugin;
