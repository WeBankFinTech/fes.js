// utils must build before core
// runtime must build before renderer-react

const pkgs = [
    "fes-runtime",
    "fes-compiler",
    "fes",
    "fes-preset-built-in",
    "fes-plugin-request",
    "fes-plugin-access",
    "fes-plugin-model",
    "fes-plugin-layout",
    "fes-plugin-icon",
    "fes-plugin-locale",
    "fes-plugin-enums",
    "fes-plugin-jest",
    "fes-plugin-vuex",
    "create-fes-app",
    "fes-plugin-qiankun",
    "fes-plugin-sass",
    "fes-plugin-monaco-editor"
];


export default {
    target: "node",
    cjs: { type: "babel", lazy: false },
    disableTypeCheck: true,
    pkgs,
};
