export const request = {
    responseInterceptors: [(response) => {
        console.log(response);
        if (response.data !== '0') {
            return Promise.reject({
                response
            });
        }
        return response;
    }],
    closeResDataCheck: true,
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
