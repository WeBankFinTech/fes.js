export default function winPath(path: string): string {
    const isExtendedLengthPath = /^\\\\\?\\/.test(path);
    if (isExtendedLengthPath) {
        return path;
    }

    return path.replace(/\\/g, '/');
}
