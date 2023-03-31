export default function getTargetsAndBrowsersList({ config }) {
    let targets = config.targets || {};

    targets = Object.keys(targets)
        .filter((key) => targets[key] !== false)
        .reduce((memo, key) => {
            memo[key] = targets[key];
            return memo;
        }, {});

    const browserslist = targets.browsers || Object.keys(targets).map((key) => `${key} >= ${targets[key] === true ? '0' : targets[key]}`);

    return {
        targets,
        browserslist,
    };
}
