const map = Symbol('map');
const compare = Symbol('compare');
const defaultVal = Symbol('defaultVal');

module.exports = class GroupMap {
    constructor(comparer, defaultValue) {
        this[map] = new Map();
        this[compare] = comparer;
        this[defaultVal] = defaultValue;
    }

    keys() {
        return this[map].keys();
    }

    storedKey(key) {
        if (typeof this[compare] === 'function') {
            for (const current of this[map].keys()) {
                if (this[compare](key, current)) {
                    return current;
                }
            }
        } else if (this[map].has(key)) {
            return key;
        }
        return undefined;
    }

    has(key) {
        return this.storedKey(key) !== undefined;
    }

    get(key) {
        const storedKey = this.storedKey(key);
        if (storedKey !== undefined) {
            return this[map].get(storedKey);
        } else {
            return this[defaultVal];
        }
    }

    set(key, value) {
        const storedKey = this.storedKey(key);
        if (storedKey !== undefined) {
            this[map].get(storedKey).push(value);
        } else {
            this[map].set(key, [value]);
        }
    }
}
