import { install } from './core';

export function onAppCreated({ app }) {
    install(app);
}
