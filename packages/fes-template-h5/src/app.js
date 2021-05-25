export const request = {
    errorHandler: {
        111() {
            console.log('root:111');
        },
        500() {
            console.log('500 error');
        },
        default(error) {
            console.log('default error');
            console.log(error);
        }
    }
};

export function patchRoutes() {
    console.log('patchRoutes');
}
