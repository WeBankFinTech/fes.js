import type { UserConfig } from '../../types';
import { set, get } from 'es-toolkit/compat';

interface UpdateUserConfigWithKeyOptions {
    key: string;
    value: any;
    userConfig: UserConfig;
}

interface GetUserConfigWithKeyOptions {
    key: string;
    userConfig: UserConfig;
}

export function updateUserConfigWithKey({
    key,
    value,
    userConfig,
}: UpdateUserConfigWithKeyOptions): void {
    set(userConfig, key, value);
}

export function getUserConfigWithKey({
    key,
    userConfig,
}: GetUserConfigWithKeyOptions): any {
    return get(userConfig, key);
}
