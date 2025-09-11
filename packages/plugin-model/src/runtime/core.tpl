
import { createSharedComposable } from '@vueuse/core';

{{{userImports}}}
{{{extraImports}}}

export const models = {
{{#extraModels}}
    {{{extraModels}}},
{{/extraModels}}
{{#userModels}}
    {{{userModels}}},
{{/userModels}}
};


/**
 * 使用createSharedComposable包装后的共享模型对象
 * 每个模型都会被包装成可共享的组合式函数
 */
const sharedModels = {}

// 为每个模型创建共享的组合式函数
Object.keys(models).forEach(key => {
    /**
     * 使用createSharedComposable包装模型
     * key作为唯一标识符，确保同一模型在不同组件间共享状态
     */
    sharedModels[key] = createSharedComposable(models[key], `model:${key}`)
})

/**
 * 使用模型的Hook函数
 * 提供统一的模型访问接口，支持状态共享和生命周期管理
 * @param {string} name - 模型名称，必须是已注册的模型
 * @returns {any} 共享的模型实例，多个组件调用同一模型时返回相同的状态实例
 */
export function useModel(name) {
    // 检查模型是否存在于注册列表中
    if (!(name in sharedModels)) {
        // 提供详细的错误信息，帮助开发者调试
        const availableModels = Object.keys(sharedModels).join(', ')
        throw new Error(
            `模型 "${name}" 不存在。\n` +
            `可用的模型有: ${availableModels}\n` +
            `请检查模型名称是否正确，或确认模型文件是否已正确导出。`
        )
    }
    
    // 返回共享的模型实例
    // createSharedComposable确保同一模型在不同组件间共享状态
    return sharedModels[name]()
}