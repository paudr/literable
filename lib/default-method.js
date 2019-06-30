module.exports = {
    defaultSelector(x) {
        return x;
    },

    defaultPredicate() {
        return true;
    },

    defaultEquality(a, b) {
        return a === b;
    },

    defaultKeyValue(key, value) {
        return { key, value };
    },

    defaultComparer(a, b) {
        if (typeof a === 'string') {
            return a.localeCompare(b);
        } else {
            return a - b;
        }
    },
};
