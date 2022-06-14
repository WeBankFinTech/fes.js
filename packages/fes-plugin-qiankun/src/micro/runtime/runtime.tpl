import { createMemoryHistory } from '@@/core/coreExports';
import qiankunRender, { clientRenderOptsStack, history as historyConfig } from './lifecycles';


export const render = oldRender => qiankunRender().then(oldRender);

export function modifyClientRenderOpts(memo) {
    // 每次应用 render 的时候会调 modifyClientRenderOpts，这时尝试从队列中取 render 的配置
    const clientRenderOpts = clientRenderOptsStack.shift();

    return {
        ...memo,
        ...clientRenderOpts
    };
}

export function modifyCreateHistory(memo) {
    if (historyConfig.url) {
        return createMemoryHistory
    }
    return memo;
}

export function onRouterCreated({ router, history }) {
     if(historyConfig.url) {
        history.push(historyConfig.url)
    }
    if(historyConfig.onRouterInit){
        historyConfig.onRouterInit(router)
    }
}

