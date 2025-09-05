export default function compatESModuleRequire(m: any): any {
    return m.default ?? m;
}
