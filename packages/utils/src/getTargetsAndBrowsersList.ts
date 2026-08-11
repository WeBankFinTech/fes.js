interface Config {
    targets?: Record<string, string>;
}

interface TargetsAndBrowsersListResult {
    targets: Record<string, string>;
    browserslist: string[];
}

export default function getTargetsAndBrowsersList({ config }: { config: Config }): TargetsAndBrowsersListResult {
    let targets: Record<string, string> = config.targets || {};

    targets = Object.keys(targets)
        .reduce((memo, key) => {
            memo[key] = targets[key];
            return memo;
        }, {} as Record<string, string>);

    let browserslist: string[];
    if (Array.isArray(targets.browsers)) {
        browserslist = targets.browsers;
    }
    else {
        browserslist = Object.keys(targets).map(key => `${key} >= ${targets[key]}`);
    }

    return {
        targets,
        browserslist,
    };
}
