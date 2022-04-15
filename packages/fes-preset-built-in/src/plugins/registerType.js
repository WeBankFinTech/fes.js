import { name } from '../../package.json';

export default function (api) {
    api.addConfigType(() => ({
        source: name,
        runtime: ['InnerRuntimeConfig'],
        build: ['InnerBuildConfig'],
    }));
}
