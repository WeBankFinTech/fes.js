export const request = {
    errorHandler: {
        404() {
            console.log('to 404 page');
        },
        commonAbnormalCodeHandler(res) {
            console.log(res.data.code);
        }
    }
};
