import { createMemoryHistory, getHistory } from '@@/core/coreExports';
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

export function modifyCreateHistroy(memo) {
    if (history.url) {
        return createMemoryHistory
    }
    return memo;
}

export function onRouterCreated({ router }) {
     if(history.url) {
        const memoryHistory = getHistory();
        memoryHistory.push(history.url)
    }
    if(history.onRouterInit){
        history.onRouterInit(router)
    }
}

