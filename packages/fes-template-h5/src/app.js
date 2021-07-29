export const request = {
    errorHandler: {
        111() {
            console.log('root:111');
        },
        500() {
            console.log('500 error');
        },
        default(error) {
            console.log(error);
            const msg = error?.data?.msg || error?.msg;
            console.log(msg);
        }
    }
};

export function patchRoutes() {
    console.log('patchRoutes');
}
