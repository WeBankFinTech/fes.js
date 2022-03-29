import { FrameworkLifeCycles, MicroApp } from 'qiankun';

interface AppOption {
    name: string;
    entry: string;
    props: Record<string, any>;
}

export interface QiankunBuildConfig {
    qiankun: {
        main: {
            apps: AppOption[];
            lifeCycles?: FrameworkLifeCycles<MicroApp>;
            [key: string]: any;
        };
        micro: {}
    };

}
