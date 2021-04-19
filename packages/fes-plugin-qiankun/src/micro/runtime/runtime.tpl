import { createMemoryHistory } from '@@/core/coreExports';
import qiankunRender, { clientRenderOptsStack, history } from './lifecycles';


export const render = oldRender => qiankunRender().then(oldRender);

export function modifyClientRenderOpts(memo) {
    // 每次应用 render 的时候会调 modifyClientRenderOpts，这时尝试从队列中取 render 的配置
    const clientRenderOpts = clientRenderOptsStack.shift();

    return {
        ...memo,
        ...clientRenderOpts
    };
}

export function modifyHistroy(memo) {
    if (history.url) {
        const memoHistroy =  createMemoryHistory();
        memoHistroy.push(history.url)
        return memoHistroy
    }
    return memo;
}

export function onRouterCreated({ router }) {
    if(history.onRouterInit){
        history.onRouterInit(router)
    }
}

