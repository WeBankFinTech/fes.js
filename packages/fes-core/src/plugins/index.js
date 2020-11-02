// TODO 拆成独立的包作为内置插件包

export default [
    // register methods
    require.resolve('./registerMethods'),

    // misc
    require.resolve('./routes'),

    // generate files
    require.resolve('./generateFiles/core/plugin'),
    require.resolve('./generateFiles/core/routes'),
    require.resolve('./generateFiles/core/fesExports'),
    require.resolve('./generateFiles/fes')
];
