const pitcher = (code) => code;

export const pitch = function () {
    const context = this;
    if (/&blockType=config/.test(context.resourceQuery)) {
        return '';
    }
};

export default pitcher;
