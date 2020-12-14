import { reactive, computed } from "vue";

function isPromise(obj) {
    return (
        !!obj &&
        (typeof obj === "object" || typeof obj === "function") &&
        typeof obj.then === "function"
    );
}

const state = reactive({
    roles: {{{REPLACE_ROLES}}},
    currentRoleId: "",
    currentAccessIds: [],
});

const rolePromiseList = [];
const accessPromiseList = [];

const getAllowAccessIds = () => {
    if (
        Array.isArray(state.currentAccessIds) &&
        state.currentAccessIds.length > 0
    ) {
        return state.currentAccessIds;
    }
    const roleAccessIds = state.roles[state.currentRoleId];
    if (Array.isArray(roleAccessIds) && roleAccessIds.length > 0) {
        return roleAccessIds;
    }
    return [];
};

const _syncSetAccessIds = (promise) => {
    accessPromiseList.push(promise);
    promise
        .then((accessIds) => {
            setAccess(accessIds);
        })
        .catch((e) => {
            console.error(e);
        })
        .then(() => {
            const index = accessPromiseList.indexOf(promise);
            if (index !== -1) {
                accessPromiseList.splice(index, 1);
            }
        });
};

const setAccess = (accessIds) => {
    if (isPromise(accessIds)) {
        return _syncSetAccessIds(accessIds);
    }
    if (!Array.isArray(accessIds)) {
        throw new Error("[plugin-access]: pageIds必须是array");
    }
    state.currentAccessIds = accessIds;
};

const _syncSetRoleId = (promise) => {
    rolePromiseList.push(promise);
    promise
        .then((roleId) => {
            setRole(roleId);
        })
        .catch((e) => {
            console.error(e);
        })
        .then(() => {
            const index = rolePromiseList.indexOf(promise);
            if (index !== -1) {
                rolePromiseList.splice(index, 1);
            }
        });
};

const setRole = async (roleId) => {
    if (isPromise(roleId)) {
        return _syncSetRoleId(roleId);
    }
    if (typeof roleId !== "string") {
        throw new Error("[plugin-access]: roleId必须是string");
    }
    state.currentRoleId = roleId;
};

const match = (path, accessIds) => {
    if (!Array.isArray(accessIds) || accessIds.length === 0) {
        return false;
    }
    path = path.split("?")[0];
    // 进入"/"路由时，此时path为“”
    if (path === "") {
        path = "/";
    }
    const len = accessIds.length;
    for (let i = 0; i < len; i++) {
        if (path === accessIds[i]) {
            return true;
        }
        // 支持*匹配
        const reg = new RegExp(`^${accessIds[i].replace("*", ".+")}$`);
        if (reg.test(path)) {
            return true;
        }
    }
    return false;
}

const hasLoading = ()=>{
    return rolePromiseList.length || accessPromiseList.length
}

const hasAccess = async (path) => {
    if(!hasLoading()){
        return match(path, getAllowAccessIds())
    }
    await Promise.all(rolePromiseList.concat(accessPromiseList));
    return match(path, getAllowAccessIds())
};

const allowPageIds = computed(getAllowAccessIds);

export const access = {
    hasAccess,
    hasLoading,
    setRole,
    setAccess
}

export const useAccess = (path) => {
    const result = computed(() => {
        return match(path, allowPageIds.value);
    });
    return result;
}