import { reactive, unref, computed, inject } from "vue";
import createDirective from "./createDirective";
import createComponent from "./createComponent";
import {isPlainObject} from "{{{ lodashPath }}}";

const accessKey = Symbol("plugin-access");

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
    const roleAccessIds = state.roles[state.currentRoleId];
    if (Array.isArray(roleAccessIds) && roleAccessIds.length > 0) {
        return state.currentAccessIds.concat(roleAccessIds);
    }
    return state.currentAccessIds;
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
    if(isPlainObject(accessIds)){
        if(accessIds.accessIds){
            setAccess(accessIds.accessIds);
        }
        if(accessIds.roleId){
            setRole(accessIds.roleId);
        }
        return
    }
    if (!Array.isArray(accessIds)) {
        throw new Error("[plugin-access]: argument to the setAccess() must be array or promise or object");
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
        throw new Error("[plugin-access]: argument to the setRole() must be string or promise");
    }
    state.currentRoleId = roleId;
};

const match = (path, accessIds) => {
    if(path === null || path === undefined) {
        return false;
    }
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
};

const isDataReady = () => {
    return rolePromiseList.length || accessPromiseList.length;
};

const hasAccess = async (path) => {
    if (!isDataReady()) {
        return match(path, getAllowAccessIds());
    }
    await Promise.all(rolePromiseList.concat(accessPromiseList));
    return match(path, getAllowAccessIds());
};

export const install = (app) => {
    const allowPageIds = computed(getAllowAccessIds);
    const useAccess = (path) => {
        const result = computed(() => {
            return match(unref(path), allowPageIds.value);
        });
        return result;
    };
    app.provide(accessKey, useAccess);
    app.directive("access", createDirective(useAccess));
    app.component("Access", createComponent(useAccess));
};

export const access = {
    hasAccess,
    isDataReady,
    setRole,
    setAccess,
    getAccess: getAllowAccessIds,
};

export const useAccess = (path) => {
    return inject(accessKey)(path);
};
