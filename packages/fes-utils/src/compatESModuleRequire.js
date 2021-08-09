export default function compatESModuleRequire(m) {
    return m.__esModule ? m.default : m;
}
