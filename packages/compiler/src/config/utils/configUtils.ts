import type { UserConfig } from '../../types';
import { lodash } from '@fesjs/utils';

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
    lodash.set(userConfig, key, value);
}

export function getUserConfigWithKey({
    key,
    userConfig,
}: GetUserConfigWithKeyOptions): any {
    return lodash.get(userConfig, key);
}
