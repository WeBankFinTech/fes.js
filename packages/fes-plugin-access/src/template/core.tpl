const roles = {{{REPLACE_ROLES}}};

let allowPageIds = [];

const get = () => Promise.all(allowPageIds).then(data => data.reduce((merge, cur) => merge.concat(cur), []));

export const setPageIds = (pageIds) => {
    if (Array.isArray(pageIds)) {
        allowPageIds = pageIds.map(id => Promise.resolve(id));
    } else {
        allowPageIds = [Promise.resolve(pageIds)];
    }
};

export const setRoleId = async (roleId) => {
    console.log('setRole');
    const _roleId = await Promise.resolve(roleId);
    if (typeof _roleId !== 'string') {
        throw new Error(
            '[plugin-access]: roleId必须是string或者Promise的结果必须是string',
        );
    }
    setPageIds(roles[_roleId]);
};

export const hasAccess = async (path) => {
    const allowPage = await get();
    if (!Array.isArray(allowPage) || allowPage.length === 0) {
        return false;
    }
    path = path.split('?')[0];
    // 进入"/"路由时，此时path为“”
    if (path === '') {
        path = '/';
    }
    const len = allowPage.length;
    for (let i = 0; i < len; i++) {
        if (path === allowPage[i]) {
            return true;
        }
        // 支持*匹配
        const reg = new RegExp(`^${allowPage[i].replace('*', '.+')}$`);
        if (reg.test(path)) {
            return true;
        }
    }
    return false;
};