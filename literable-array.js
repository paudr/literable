const Literable = require('./literable.js');
const { source } = require('./lib/private-field.js');
const { defaultPredicate } = require('./lib/default-method.js');

module.exports = class LiterableArray extends Literable {
    constructor(iterator) {
        if (!Array.isArray(iterator)) {
            throw new TypeError('Invalid iterator');
        }
        super(iterator);
    }

    count(predicate) {
        if (predicate == null) {
            return source.get(this).length;
        } else {
            return super.count(predicate);
        }
    }

    defaultIfEmpty(defaultValue) {
        if (source.get(this).length > 0) {
            return this;
        } else {
            return new LiterableArray([defaultValue]);
        }
    }

    elementAt(index) {
        if (!Number.isInteger(index) || index < 0) {
            throw new TypeError('index must to be a positive integer');
        }
        const array = source.get(this);
        if (index >= array.length) {
            throw new Error('index out of range');
        }
        return array[index];
    }

    elementAtOrDefault(index, defaultValue) {
        if (!Number.isInteger(index) || index < 0) {
            throw new TypeError('index must to be a positive integer');
        }
        const array = source.get(this);
        if (index >= array.length) {
            return defaultValue;
        } else {
            return array[index];
        }
    }

    findLastIndex(predicate, startIndex, count) {
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must to be a function');
        }
        const array = source.get(this);
        const start = Math.min(Number.isInteger(startIndex) ? startIndex : array.length, array.length - 1);
        const end = Math.max(Number.isInteger(count) ? start - count : 0, 0);
        for (let index = start; index > end; index -= 1) {
            if (predicate(array[index], index)) {
                return index;
            }
        }
        return -1;
    }

    last(predicate = defaultPredicate) {
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must to be a function');
        }
        const array = source.get(this);
        for (let index = array.length - 1; index >= 0; index -= 1) {
            if (predicate(array[index])) {
                return array[index];
            }
        }
        throw new Error('No element satisfies the condition.');
    }

    lastIndexOf(element, startIndex, count) {
        const array = source.get(this);
        const start = Number.isInteger(startIndex) ? Math.min(startIndex, array.length - 1) : array.length - 1;
        const end = Number.isInteger(count) ? Math.max(start - count, 0) : 0;
        for (let index = start; index >= end; index -= 1) {
            if (element === array[index]) {
                return index;
            }
        }
        return -1;
    }

    lastOrDefault(predicate, defaultValue) {
        const array = source.get(this);
        if (defaultValue === undefined) {
            if (array.length > 0) {
                return array[array.length - 1];
            } else {
                return predicate;
            }
        } else {
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must to be a function');
            }
            for (let index = array.length - 1; index >= 0; index -= 1) {
                if (predicate(array[index])) {
                    return array[index]
                }
            }
            return defaultValue;
        }
    }

    reverse() {
        const array = source.get(this);
        return new Literable(function* () {
            for (let index = array.length; index >= 0; index -= 1) {
                yield array[index];
            }
        });
    }

    skip(count) {
        if (!Number.isInteger(count)) {
            throw new TypeError('index must to be a positive integer');
        }
        const array = source.get(this);
        if (count >= array.length) {
            return Literable.empty();
        } else {
            return new Literable(function* () {
                for (let index = count; index < array.length; index += 1) {
                    yield array[index];
                }
            });
        }
    }

    skipLast(count) {
        if (!Number.isInteger(count)) {
            throw new TypeError('index must to be a positive integer');
        }
        const array = source.get(this);
        const length = array.length - count;
        return new Literable(function* () {
            for (let index = 0; index < length; index += 1) {
                yield array[index];
            }
        });
    }

    takeLast(count) {
        if (!Number.isInteger(count) || count < 0) {
            throw new TypeError('count must to be a positive integer');
        }
        if (count > 0) {
            const array = source.get(this);
            const start = Math.max(array.length - count, 0);
            return new Literable(function* () {
                for (let index = start; index < array.length; index += 1) {
                    yield array[index];
                }
            });
        } else {
            return Literable.empty();
        }
    }
};
