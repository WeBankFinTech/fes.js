import FesxClass from './fesx';

const insideName = `inside_${window.location.pathname.replace(/\//g, '_')}`;
export default new FesxClass(insideName);
