// eslint-disable-next-line import/extensions
import { install } from './core';

export function onAppCreated({ app }) {
    install(app);
}
