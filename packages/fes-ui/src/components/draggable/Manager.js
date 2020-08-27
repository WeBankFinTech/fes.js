export default class Manager {
    constructor() {
        this.refs = {};
    }

    add(ref, collection = 'default') {
        if (!this.refs[collection]) {
            this.refs[collection] = [];
        }

        this.refs[collection].push(ref);
    }

    remove(ref, collection = 'default') {
        const index = this.getIndex(ref, collection);
        if (index !== -1) {
            this.refs[collection].splice(index, 1);
        }
    }

    isActive() {
        return this.active;
    }

    getActive() {
        const collection = 'default';
        return this.refs[collection].find(
            node => node.sortableInfo.index == this.active.index
        );
    }

    getIndex(ref, collection = 'default') {
        return this.refs[collection].indexOf(ref);
    }

    getOrderedRefs(collection = 'default') {
        return this.refs[collection];
    }
}
