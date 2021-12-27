import qs from 'qs';

const pitcher = code => code;

export const pitch = function () {
    const context = this;
    const query = qs.parse(context.resourceQuery.slice(1));
    if (query.type === 'custom' && query.blockType === 'config') {
        return '';
    }
};

export default pitcher;
