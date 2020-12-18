import { readdirSync } from "fs";
import { join } from "path";

// utils must build before core
// runtime must build before renderer-react

const headPkgs = [
    "fes-runtime",
    "fes-core",
    "fes",
    "fes-plugin-built-in",
    "fes-plugin-request",
    "fes-plugin-access",
    "fes-plugin-model",
    "fes-plugin-layout",
];
const tailPkgs = [];
// const otherPkgs = readdirSync(join(__dirname, 'packages')).filter(
//   (pkg) =>
//     pkg.charAt(0) !== '.' && !headPkgs.includes(pkg) && !tailPkgs.includes(pkg),
// );

const otherPkgs = [];

export default {
    target: "node",
    cjs: { type: "babel", lazy: false },
    disableTypeCheck: true,
    pkgs: [...headPkgs, ...otherPkgs, ...tailPkgs],
};
