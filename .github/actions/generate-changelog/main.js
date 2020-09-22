
const cp = require("child_process");
cp.execSync(`cd ${__dirname}; npm ci`);

const path = require("path");
const core = require("@actions/core");
const lernaChangelog = path.resolve(__dirname, "node_modules/.bin/conventional-changelog");

const exec = cmd => cp.execSync(cmd).toString().trim();

const changelog = exec(`node ${lernaChangelog}  -p cmyr-config -r 2`);
console.log(changelog);

core.setOutput("changelog", JSON.stringify(changelog.split('\n').slice(4).join('\n')));