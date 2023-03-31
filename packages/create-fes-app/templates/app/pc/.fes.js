import { defineBuildConfig } from '@fesjs/fes';

export default defineBuildConfig({
    access: {
        roles: {
            admin: ['*'],
            manager: ['/'],
        },
    },
    layout: {
        title: 'Fes.js',
        footer: 'Created by MumbleFE',
        navigation: 'mixin',
        multiTabs: false,
        menus: [
            {
                name: 'index',
            },
        ],
    },
    enums: {
        status: [
            ['0', '无效的'],
            ['1', '有效的'],
        ],
    },
});
