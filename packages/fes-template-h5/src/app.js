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
        404() {
            console.log('to 404 page');
        },
        default(error) {
            console.log(error);
        }
    }
};
