export const request = {
    errorHandler: {
        111(responseData) {
            console.log(responseData);
        },
        404() {
            console.log('to 404 page');
        },
        default(error) {
            console.log(error.response.data);
        }
    }
};
