import storage from '../storage';

const history = {
    data: storage.get('Fes_History') || [],
    current: null
};

history.record = function (href) {
    const length = history.data.length;
    const obj = {
        href,
        type: ''
    };
    if (length === 0) {
        obj.type = 'forward';
    } else if (length > 0 && length <= 1) {
        if (history.data[length - 1].href === href) {
            obj.type = 'refresh';
        } else {
            obj.type = 'forward';
        }
    } else if (length > 1) {
        const first = history.data[length - 1];
        const second = history.data[length - 2];
        if (first.href === href) {
            obj.type = 'refresh';
        } else if (second.href === href) {
            obj.type = 'back';
        } else {
            obj.type = 'forward';
        }
    }
    history.data.push(obj);
    history.current = obj;
    storage.set('Fes_History', history.data);
};

export default history;
