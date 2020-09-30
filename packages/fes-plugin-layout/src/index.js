
import generateLayout from './views/layout';
import './views/styles/index.scss';


export function createLayout() {
    return {
        install(app, options, ctx) {
            ctx.layout = generateLayout(options);
        }
    };
}
