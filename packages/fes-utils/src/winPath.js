export default function (path) {
    const isExtendedLengthPath = /^\\\\\?\\/.test(path);
    if (isExtendedLengthPath) {
        return path;
    }

    return path.replace(/\\/g, '/');
}
