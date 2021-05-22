export const request = {
    errorHandler: {
        111(responseData) {
            console.log(responseData);
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
