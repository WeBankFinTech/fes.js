export default function assert(value: any, message: string): asserts value {
    if (!value) {
        throw new Error(message);
    }
}
