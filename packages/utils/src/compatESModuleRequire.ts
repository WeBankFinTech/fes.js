export default function compatESModuleRequire(m: any): any {
    if (m.__esModule && m.default?.default) {
        return m.default.default;
    }
    return m.default ?? m;
}
