import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import * as url from 'node:url';
import consola from 'consola';
import { execa } from 'execa';
import minimist from 'minimist';
import pc from 'picocolors';
import semver from 'semver';
import { getPublicPkgs } from './shared.mjs';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const { preid: preId, dry: isDryRun } = minimist(process.argv.slice(2));

const packages = getPublicPkgs();

const versionIncrements = ['patch', 'minor', 'major', 'prepatch', 'preminor', 'premajor', 'prerelease'];

function incVersion(version, i) {
    let _preId = preId || semver.prerelease(version)?.[0];
    if (!_preId && /pre/.test(i)) {
        _preId = 'beta';
    }

    return semver.inc(version, i, _preId);
}
function autoIncVersion(version) {
    if (version.includes('-')) {
        return semver.inc(version, 'prerelease');
    }

    return semver.inc(version, 'patch');
}

const run = (bin, args, opts = {}) => execa(bin, args, { stdio: 'inherit', ...opts });
const dryRun = (bin, args, opts = {}) => consola.info(`[dryrun] ${bin} ${args.join(' ')}`, opts);
const runIfNotDry = isDryRun ? dryRun : run;
const getPkgRoot = pkg => path.resolve(__dirname, `../packages/${pkg}`);
const step = msg => consola.log(msg);
function arrToObj(arr, key) {
    return arr.reduce((acc, cur) => {
        acc[cur[key]] = cur;
        return acc;
    }, {});
}

async function publishPackage(pkg, runIfNotDry) {
    step(`Publishing ${pkg.name}...`);
    try {
        let _releaseTag;
        if (pkg.newVersion.includes('-')) {
            _releaseTag = 'next';
        }

        await runIfNotDry(
            'npm',
            ['publish', ...(_releaseTag ? ['--tag', _releaseTag] : []), '--access', 'public', '--registry', 'https://registry.npmjs.org'],
            {
                cwd: getPkgRoot(pkg.dirName),
                stdio: 'pipe',
            },
        );
        console.log('Successfully published :', pc.green(`${pkg.name}@${pkg.newVersion}`));
    }
    catch (e) {
        if (e.stderr.match(/previously published/)) {
            console.log(pc.red(`Skipping already published: ${pkg.name}`));
        }

        else { throw e; }
    }
}

function readPackageJson(pkg) {
    const pkgPath = getPkgRoot(pkg);
    return JSON.parse(fs.readFileSync(path.join(pkgPath, 'package.json'), 'utf-8'));
}

function writePackageJson(pkg, content) {
    const pkgPath = getPkgRoot(pkg);
    fs.writeFileSync(path.join(pkgPath, 'package.json'), `${JSON.stringify(content, null, 4)}\n`);
}

function readPackageVersionAndName(pkg) {
    const { version, name } = readPackageJson(pkg);
    return {
        version,
        name,
    };
}

function updatePackage(pkgName, version, pkgs) {
    const pkgJson = readPackageJson(pkgName);
    pkgJson.version = version;
    pkgJson.dependencies
    && Object.keys(pkgJson.dependencies).forEach((npmName) => {
        if (pkgs[npmName]) {
            pkgJson.dependencies[npmName] = `^${pkgs[npmName].newVersion}`;
        }
    });
    pkgJson.peerDependencies
    && Object.keys(pkgJson.peerDependencies).forEach((npmName) => {
        if (pkgs[npmName]) {
            pkgJson.peerDependencies[npmName] = `^${pkgs[npmName].newVersion}`;
        }
    });
    writePackageJson(pkgName, pkgJson);
}

function updateRootVersion(newRootVersion) {
    const pkgPath = path.resolve(path.resolve(__dirname, '..'), 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    pkg.version = newRootVersion;
    fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 4)}\n`);
}

function updateVersions(packagesVersion) {
    const pkgs = arrToObj(packagesVersion, 'name');
    packagesVersion.forEach(p => updatePackage(p.dirName, p.newVersion, pkgs));
}

async function isChangeInCurrentTag(pkg, newestTag) {
    const { stdout: pkgDiffContent } = await run('git', ['diff', newestTag, `packages/${pkg}`], { stdio: 'pipe' });
    return !!pkgDiffContent;
}

async function filterChangedPackages() {
    const { stdout: newestTag } = await run('git', ['describe', '--abbrev=0', '--tags'], { stdio: 'pipe' });

    const results = await Promise.all(
        packages.map(async (pkg) => {
            const result = await isChangeInCurrentTag(pkg, newestTag);
            return result;
        }),
    );

    return packages.filter((_v, index) => results[index]);
}

async function createPackageNewVersion(name, version) {
    // no explicit version, offer suggestions
    const release = await consola.prompt(`Select release type: ${name}`, {
        type: 'select',
        options: versionIncrements.map((i) => {
            return {
                value: incVersion(version, i),
                label: `${i} (${incVersion(version, i)})`,
            };
        }).concat({
            value: 'custom',
            label: 'custom',
        }),
    });

    let newVersion = release;
    if (release === 'custom') {
        newVersion = await consola.prompt(`Input custom version: ${name}`, {
            type: 'text',
            default: version,
        });
    }

    if (!semver.valid(newVersion)) {
        console.log(`invalid target version: ${newVersion}, please again.`);
        return createPackageNewVersion(name, version);
    }

    return newVersion;
}

async function genRootPackageVersion() {
    const pkgPath = path.resolve(path.resolve(__dirname, '..'), 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    const newVersion = await createPackageNewVersion(pkg.name, pkg.version);
    return newVersion;
}

function genOtherPkgsVersion(packagesVersion) {
    const noChangedPkgs = packages.filter(name => !packagesVersion.find(item => item.dirName === name));
    const pkgs = arrToObj(packagesVersion, 'name');
    const result = [];
    noChangedPkgs.forEach((currentPkg) => {
        const pkgJson = readPackageJson(currentPkg);
        let isUpdated = false;

        if (pkgJson.dependencies) {
            Object.keys(pkgJson.dependencies).forEach((npmName) => {
                if (pkgs[npmName]) {
                    isUpdated = true;
                    pkgJson.dependencies[npmName] = pkgs[npmName].newVersion;
                }
            });
        }

        if (isUpdated) {
            const oldVersion = pkgJson.version;
            pkgJson.version = autoIncVersion(oldVersion);
            result.push({
                dirName: currentPkg,
                version: oldVersion,
                newVersion: pkgJson.version,
                name: pkgJson.name,
            });
            writePackageJson(currentPkg, pkgJson);
        }
    });

    return result;
}

async function main() {
    const changedPackages = await filterChangedPackages();

    if (!changedPackages.length) {
        consola.warn(`No changes to commit.`);
        return;
    }

    const updatedPkgs = [];
    for (const pkg of changedPackages) {
        const { name, version } = readPackageVersionAndName(pkg);
        const newVersion = await createPackageNewVersion(name, version);
        updatedPkgs.push({
            dirName: pkg,
            newVersion,
            ...readPackageVersionAndName(pkg),
        });
    }

    const passiveUpdatePkgs = genOtherPkgsVersion(updatedPkgs);
    const packagesVersion = passiveUpdatePkgs.concat(updatedPkgs);

    const yes = await consola.prompt(`These packages will be released: \n${packagesVersion
        .map(pkg => `${pc.magenta(pkg.name)}: v${pkg.version} > ${pc.green(`v${pkg.newVersion}`)}`)
        .join('\n')}\nConfirm?`, {
        type: 'confirm',
    });

    if (!yes) {
        return;
    }

    const newRootVersion = await genRootPackageVersion();

    // update all package versions and inter-dependencies
    step('\nUpdating cross dependencies...');
    updateRootVersion(newRootVersion);
    updateVersions(packagesVersion);

    // update lock
    await run('pnpm', ['i']);
    // // build all packages with types
    step('\nBuilding all packages...');
    if (!isDryRun) {
        await run('pnpm', ['build']);
    }

    else { console.log(`(skipped build)`); }

    // generate changelog
    step('\nGenerating changelog...');
    await run(`pnpm`, ['changelog']);

    const { stdout } = await run('git', ['diff'], { stdio: 'pipe' });
    if (stdout) {
        step('\nCommitting changes...');
        await runIfNotDry('git', ['add', '-A']);
        await runIfNotDry('git', ['commit', '-m', `chore: v${newRootVersion}`]);
    }
    else {
        console.log('No changes to commit.');
    }

    // publish packages
    step('\nPublishing packages...');
    for (const pkg of packagesVersion) {
        await publishPackage(pkg, runIfNotDry);
    }

    // push to GitHub
    step('\nPushing to GitHub...');
    await runIfNotDry('git', ['tag', `v${newRootVersion}`]);
    await runIfNotDry('git', ['push', 'origin', `refs/tags/v${newRootVersion}`]);
    await runIfNotDry('git', ['push']);

    if (isDryRun) {
        console.log(`\nDry run finished - run git diff to see package changes.`);
    }

    console.log();
}

main().catch((err) => {
    console.error(err);
});
