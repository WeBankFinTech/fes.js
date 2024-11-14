import { lodash } from '@fesjs/utils';

export function updateUserConfigWithKey({
    key,
    value,
    userConfig,
}) {
    lodash.set(userConfig, key, value);
}

export function getUserConfigWithKey({
    key,
    userConfig,
}) {
    return lodash.get(userConfig, key);
}
