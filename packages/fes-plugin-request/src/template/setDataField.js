import { isObject } from './helpers';

export default (instance, { dataField }) => {
    instance.interceptors.response.use((response) => {
        if (isObject(response.data) && dataField) {
            return response.data[dataField];
        }
        return response;
    });
};
