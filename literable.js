const { source } = require('./lib/private-field.js');
const GroupMap = require('./lib/group-map.js');
const {
    defaultSelector,
    defaultPredicate,
    defaultEquality,
    defaultKeyValue,
} = require('./lib/default-method.js');

module.exports = class Literable {
    static from(iterator) {
        return new Literable(iterator);
    }

    static empty() {
        return new Literable([]);
    }

    static range(start, count) {
        if (!Number.isInteger(start)) {
            throw new TypeError('start must to be an integer');
        }
        if (!Number.isInteger(count) || count < 0) {
            throw new TypeError('start must to be an integer');
        }
        const end = start + count;
        return new Literable(function* () {
            for (let current = start; current < end; current += 1) {
                yield current;
            }
        });
    }

    static repeat(element, count) {
        if (!Number.isInteger(count) || count < 0) {
            throw new TypeError('start must to be a positive integer');
        }
        return new Literable(function* () {
            for (let index = 0; index < count; index += 1) {
                yield element;
            }
        });
    }

    constructor(iterator) {
        if (Array.isArray(iterator) && !(this instanceof LiterableArray)) {
            return new LiterableArray(iterator);
        }
        if (iterator == null || (typeof iterator !== 'function' && !iterator[Symbol.iterator])) {
            throw new TypeError('Invalid iterator');
        }
        source.register(this, iterator);
    }

    *[Symbol.iterator]() {
        const iterator = source.get(this);
        if (typeof iterator === 'function') {
            yield* iterator();
        } else if (iterator[Symbol.iterator]) {
            yield* iterator[Symbol.iterator]();
        } else {
            throw new TypeError('Invalid iterator');
        }
    }

    aggregate(seed, func, resultSelector = defaultSelector) {
        const isFuncUndefined = func === undefined;
        const aggregator = isFuncUndefined ? seed : func;
        if (typeof aggregator !== 'function') {
            throw new TypeError('Aggregator function must to be provided')
        }
        const iterator = this[Symbol.iterator]();
        let index = 0;
        let accumulated = isFuncUndefined ? iterator.next().value : seed;
        for (const current of iterator) {
            accumulated = aggregator(accumulated, current, index);
            index += 1;
        }
        return resultSelector(accumulated);
    }

    all(predicate) {
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must to be a function');
        }
        for (const current of this) {
            if (!predicate(current)) {
                return false;
            }
        }
        return true;
    }

    any(predicate = defaultPredicate) {
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must to be a function');
        }
        for (const current of this) {
            if (predicate(current)) {
                return true;
            }
        }
        return false;
    }

    append(...elements) {
        const iterator = this;
        return new Literable(function* () {
            yield* iterator;
            yield* elements;
        });
    }

    average(selector = defaultSelector) {
        if (typeof selector !== 'function') {
            throw new TypeError('predicate must to be a function');
        }
        let sum = 0;
        let count = 0;
        for (const current of this) {
            sum += selector(current);
            count += 1;
        }
        if (count > 0) {
            return sum / count;
        } else {
            throw Error('source is empty');
        }
    }

    concat(...collections) {
        const iterator = this;
        return new Literable(function* () {
            yield* iterator;
            for (const collection of collections) {
                yield* Literable.from(collection);
            }
        });
    }

    contains(value, comparer = defaultEquality) {
        if (typeof comparer !== 'function') {
            throw new TypeError('comparer must to be a function');
        }
        for (const current of this) {
            if (comparer(current, value)) {
                return true;
            }
        }
        return false;
    }

    count(predicate = defaultPredicate) {
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must to be a function');
        }
        let count = 0;
        for (const current of this) {
            if (predicate(current)) {
                count += 1;
            }
        }
        return count;
    }

    defaultIfEmpty(defaultValue) {
        const iterator = this[Symbol.iterator]();
        const first = iterator.next();
        return new Literable(function* () {
            if (first.done) {
                yield defaultValue;
            } else {
                yield first.value;
                yield* iterator;
            }
        });
    }

    distinct(comparer = defaultEquality) {
        if (typeof comparer !== 'function') {
            throw new TypeError('comparer must to be a function');
        }
        const iterator = this;
        return new Literable(function* () {
            const yielded = [];
            for (const current of iterator) {
                if (!yielded.some(item => comparer(current, item))) {
                    yield current;
                    yielded.push(current);
                }
            }
        });
    }

    elementAt(index) {
        if (!Number.isInteger(index) || index < 0) {
            throw new TypeError('index must to be a positive integer');
        }
        let count = index;
        for (const current of this) {
            if (count === 0) {
                return current;
            }
            count--;
        }
        throw new Error('index out of range');
    }

    elementAtOrDefault(index, defaultValue) {
        if (!Number.isInteger(index) || index < 0) {
            throw new TypeError('index must to be a positive integer');
        }
        let count = index;
        for (const current of this) {
            if (count === 0) {
                return current;
            }
            count--;
        }
        return defaultValue;
    }

    except(sequence, comparer = defaultEquality) {
        if (typeof comparer !== 'function') {
            throw new TypeError('comparer must to be a function');
        }
        const prohibited = [];
        for (const current of Literable.from(sequence)) {
            if (!prohibited.some(item => comparer(current, item))) {
                prohibited.push(current);
            }
        }
        const iterator = this;
        return new Literable(function* () {
            for (const current of iterator) {
                if (!prohibited.some(item => comparer(current, item))) {
                    prohibited.push(current);
                    yield current;
                }
            }
        });
    }

    findIndex(predicate, startIndex, count) {
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must to be a function');
        }
        let index = -1;
        let searched = -1;
        for (const current of this) {
            index += 1;
            if (startIndex !== undefined) {
                if (index >= startIndex) {
                    searched += 1;
                    if (searched > count) {
                        break;
                    }
                    if (predicate(current, index)) {
                        return index;
                    }
                }
            } else if (predicate(current, index)) {
                return index;
            }
        }
        return -1;
    }

    findLastIndex(predicate, startIndex, count) {
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must to be a function');
        }
        const endIndex = startIndex - count;
        let index = -1;
        let selectedIndex = -1;
        for (const current of this) {
            index += 1;
            if (startIndex !== undefined) {
                if ((count === undefined || index > endIndex) && predicate(current, index)) {
                    selectedIndex = index;
                }
                if (index >= startIndex) {
                    break;
                }
            } else if (predicate(current, index)) {
                selectedIndex = index;
            }
        }
        return selectedIndex;
    }

    first(predicate = defaultPredicate) {
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must to be a function');
        }
        for (const current of this) {
            if (predicate(current)) {
                return current;
            }
        }
        throw new Error('No element satisfies the condition.');
    }

    firstOrDefault(predicate, defaultValue) {
        if (defaultValue === undefined) {
            for (const current of this) {
                return current;
            }
            return predicate;
        } else {
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must to be a function');
            }
            for (const current of this) {
                if (predicate(current)) {
                    return current;
                }
            }
            return defaultValue;
        }
    }

    flat(depth) {
        if (depth !== undefined && typeof depth !== 'number') {
            throw new TypeError('depth must to be an integer');
        }
        if (depth !== undefined && depth <= 1) {
            return this;
        }
        const iterator = this;
        const nextDepth = depth !== undefined ? depth - 1 : undefined;
        return new Literable(function* () {
            for (const current of iterator) {
                if (current instanceof Literable) {
                    yield* current.flat(nextDepth);
                } else if (Array.isArray(current)) {
                    yield* Literable.from(current).flat(nextDepth);
                } else {
                    yield current;
                }
            }
        });
    }

    forEach(action) {
        if (typeof action !== 'function') {
            throw new TypeError('action must to be a function');
        }
        let index = -1;
        for (const current of this) {
            index += 1;
            action(current, index);
        }
    }

    groupBy(keySelector, elementSelector = defaultSelector, resultSelector = defaultKeyValue, comparer) {
        if (typeof keySelector !== 'function') {
            throw new TypeError('keySelector must to be a function');
        }
        if (typeof elementSelector !== 'function') {
            throw new TypeError('elementSelector must to be a function');
        }
        if (typeof resultSelector !== 'function') {
            throw new TypeError('resultSelector must to be a function');
        }
        if (comparer !== undefined && typeof comparer !== 'function') {
            throw new TypeError('comparer must to be a function');
        }
        const groups = new GroupMap(comparer);
        for (const current of this) {
            groups.set(keySelector(current), elementSelector(current));
        }
        return new Literable(function* () {
            for (const key of groups.keys()) {
                const value = groups.get(key);
                yield resultSelector(key, value);
            }
        });
    }

    groupJoin(sequence, keySelector, sequenceKeySelector, resultSelector = defaultKeyValue, comparer) {
        if (typeof keySelector !== 'function') {
            throw new TypeError('sourceKeySelector must to be a function');
        }
        if (typeof sequenceKeySelector !== 'function') {
            throw new TypeError('valuesKeySelector must to be a function');
        }
        if (typeof resultSelector !== 'function') {
            throw new TypeError('resultSelector must to be a function');
        }
        if (comparer !== undefined && typeof comparer !== 'function') {
            throw new TypeError('comparer must to be a function');
        }
        const groups = new GroupMap(comparer, []);
        for (const current of Literable.from(sequence)) {
            groups.set(sequenceKeySelector(current), current);
        }
        const iterator = this;
        return new Literable(function* () {
            for (const current of iterator) {
                const key = keySelector(current);
                const value = groups.get(key);
                yield resultSelector(current, value);
            }
        });
    }

    indexOf(element, startIndex, count) {
        let index = -1;
        let searched = -1;
        for (const current of this) {
            index += 1;
            if (startIndex !== undefined) {
                if (index >= startIndex) {
                    searched += 1;
                    if (searched > count) {
                        break;
                    }
                    if (element === current) {
                        return index;
                    }
                }
            } else if (element === current) {
                return index;
            }
        }
        return -1;
    }

    intersect(sequence, comparer) {
        if (comparer === undefined) {
            const set = new Set(Literable.from(sequence));
            const iterator = this;
            return new Literable(function* () {
                for (const current of iterator) {
                    if (set.has(current)) {
                        set.delete(current);
                        yield current;
                    }
                }
            });
        } else {
            if (typeof comparer !== 'function') {
                throw new TypeError('comparer must to be a function');
            }
            const set = new Set();
            for (const current of Literable.from(sequence)) {
                const notFound = true;
                for (const item of set) {
                    if (comparer(current, item)) {
                        notFound = false;
                        break;
                    }
                }
                if (notFound) {
                    set.add(current);
                }
            }
            const iterator = this;
            return new Literable(function* () {
                for (const current of iterator) {
                    for (const item of set) {
                        if (comparer(current, item)) {
                            set.delete(item);
                            yield current;
                            break;
                        }
                    }
                }
            });
        }
    }

    join(sequence, keySelector, sequenceKeySelector, resultSelector = defaultKeyValue, comparer) {
        if (typeof keySelector !== 'function') {
            throw new TypeError('sourceKeySelector must to be a function');
        }
        if (typeof sequenceKeySelector !== 'function') {
            throw new TypeError('valuesKeySelector must to be a function');
        }
        if (typeof resultSelector !== 'function') {
            throw new TypeError('resultSelector must to be a function');
        }
        if (comparer !== undefined && typeof comparer !== 'function') {
            throw new TypeError('comparer must to be a function');
        }
        const groups = new GroupMap(comparer, []);
        for (const current of Literable.from(sequence)) {
            groups.set(sequenceKeySelector(current), current);
        }
        const iterator = this;
        return new Literable(function* () {
            for (const current of iterator) {
                const key = keySelector(current);
                for (const item of groups.get(key)) {
                    yield resultSelector(current, item);
                }
            }
        });
    }

    last(predicate = defaultPredicate) {
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must to be a function');
        }
        let last;
        let hasValues = false;
        for (const current of this) {
            if (predicate(current)) {
                hasValues = true;
                last = current;
            }
        }
        if (hasValues) {
            return last;
        } else {
            throw new Error('No element satisfies the condition.');
        }
    }

    lastIndexOf(element, startIndex, count) {
        const endIndex = startIndex - count;
        let index = -1;
        let selectedIndex = -1;
        for (const current of this) {
            index += 1;
            if (startIndex !== undefined) {
                if ((count === undefined || index > endIndex) && element === current) {
                    selectedIndex = index;
                }
                if (index >= startIndex) {
                    break;
                }
            } else if (element === current) {
                selectedIndex = index;
            }
        }
        return selectedIndex;
    }

    lastOrDefault(predicate, defaultValue) {
        if (defaultValue === undefined) {
            let lastValue = predicate;
            for (const current of this) {
                lastValue = current;
            }
            return lastValue;
        } else {
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must to be a function');
            }
            let lastValue = defaultValue;
            for (const current of this) {
                if (predicate(current)) {
                    lastValue = current;
                }
            }
            return lastValue;
        }
    }

    max(selector = defaultSelector) {
        if (typeof selector !== 'function') {
            throw new TypeError('selector must to be a function');
        }
        const iterator = this[Symbol.iterator]();
        const first = iterator.next();
        if (first.done) {
            throw new Error('No elements');
        }
        let score = selector(first.value);
        for (const current of iterator) {
            score = Math.max(score, selector(current));
        }
        return score;
    }

    maxElement(selector = defaultSelector) {
        if (typeof selector !== 'function') {
            throw new TypeError('selector must to be a function');
        }
        const iterator = this[Symbol.iterator]();
        const first = iterator.next();
        if (first.done) {
            throw new Error('No elements');
        }
        let score = selector(first.value);
        let element = first.value;
        for (const current of iterator) {
            const currentScore = selector(current);
            if (currentScore > score) {
                score = currentScore;
                element = current;
            }
        }
        return element;
    }

    min(selector = defaultSelector) {
        if (typeof selector !== 'function') {
            throw new TypeError('selector must to be a function');
        }
        const iterator = this[Symbol.iterator]();
        const first = iterator.next();
        if (first.done) {
            return;
        }
        let score = selector(first.value);
        for (const current of iterator) {
            score = Math.min(score, selector(current));
        }
        return score;
    }

    minElement(selector = defaultSelector) {
        if (typeof selector !== 'function') {
            throw new TypeError('selector must to be a function');
        }
        debugger;
        const iterator = this[Symbol.iterator]();
        const first = iterator.next();
        if (first.done) {
            return;
        }
        let score = selector(first.value);
        let element = first.value;
        for (const current of iterator) {
            const currentScore = selector(current);
            if (currentScore < score) {
                score = currentScore;
                element = current;
            }
        }
        return element;
    }

    ofType(type) {
        const typeName = (() => {
            switch (type) {
                case Number:
                    return 'number';
                case String:
                    return 'string';
                case Boolean:
                    return 'boolean';
                case Function:
                    return 'function';
                default:
                    return typeof type === 'string' ? type : null;
            }
        })();
        const iterator = this;
        if (typeName !== null) {
            return new Literable(function* () {
                for (const current of iterator) {
                    if (typeof current === typeName) {
                        yield current;
                    }
                }
            });
        } else {
            return new Literable(function* () {
                for (const current of iterator) {
                    if (current instanceof type) {
                        yield current;
                    }
                }
            });
        }
    }

    orderBy(keySelector, comparer) {
        return new OrderedLiterable(this, keySelector, comparer, true);
    }

    orderByDescending(keySelector, comparer) {
        return new OrderedLiterable(this, keySelector, comparer, false);
    }

    prepend(...elements) {
        const iterator = this;
        return new Literable(function* () {
            yield* elements;
            yield* iterator;
        });
    }

    reverse() {
        const reversed = [...this].reverse();
        return new Literable(function* () {
            yield* reversed;
        });
    }

    select(selector) {
        if (typeof selector !== 'function') {
            throw new TypeError('selector must to be a function');
        }
        const iterator = this;
        return new Literable(function* () {
            let index = 0;
            for (const current of iterator) {
                yield selector(current, index);
                index += 1;
            }
        });
    }

    selectMany(collectionSelector, resultSelector = (_, b) => b) {
        if (typeof collectionSelector !== 'function') {
            throw new TypeError('selector must to be a function');
        }
        if (resultSelector != null && typeof resultSelector !== 'function') {
            throw new TypeError('selector must to be a function');
        }
        const iterator = this;
        return new Literable(function* () {
            let index = -1;
            for (const current of iterator) {
                index += 1;
                for (const item of collectionSelector(current, index)) {
                    yield resultSelector(current, item);
                }
            }
        });
    }

    sequenceEqual(sequence, comparer = defaultEquality) {
        if (typeof comparer !== 'function') {
            throw new TypeError('comparer must to be a function');
        }
        const thisIterator = this[Symbol.iterator]();
        const sequenceIterator = Literable.from(sequence)[Symbol.iterator]();
        while (true) {
            const sourceElement = thisIterator.next();
            const sequenceElement = sequenceIterator.next();
            if (sourceElement.done && sequenceElement.done) {
                return true;
            }
            if (sourceElement.done !== sequenceElement.done || !comparer(sourceElement.value, sequenceElement.value)) {
                return false;
            }
        }
    }

    single(predicate = defaultPredicate) {
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must to be a function');
        }
        let found;
        let foundSome = false;
        for (const current of this) {
            if (predicate(current)) {
                if (foundSome) {
                    throw new Error('More than one element satisfies the condition.');
                }
                foundSome = true;
                found = current;
            }
        }
        if (foundSome) {
            return found;
        } else {
            throw new Error('No element satisfies the condition.');
        }
    }

    singleOrDefault(predicate, defaultValue) {
        if (defaultValue === undefined) {
            let found;
            let foundSome = false;
            for (const current of this) {
                if (foundSome) {
                    throw new Error('More than one element satisfies the condition.');
                }
                foundSome = true;
                found = current;
            }
            return foundSome ? found : predicate;
        } else {
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must to be a function');
            }
            let found;
            let foundSome = false;
            for (const current of this) {
                if (predicate(current)) {
                    if (foundSome) {
                        throw new Error('More than one element satisfies the condition.');
                    }
                    foundSome = true;
                    found = current;
                }
            }
            return foundSome ? found : defaultValue;
        }
    }

    skip(count) {
        if (!Number.isInteger(count)) {
            throw new TypeError('index must to be a positive integer');
        }
        const iterator = this;
        return new Literable(function* () {
            let remaining = count;
            for (const current of iterator) {
                if (remaining > 0) {
                    remaining -= 1;
                } else {
                    yield current;
                }
            }
        });
    }

    skipLast(count) {
        if (!Number.isInteger(count)) {
            throw new TypeError('index must to be a positive integer');
        }
        const iterator = this;
        return new Literable(function* () {
            const buffer = [];
            for (const current of iterator) {
                buffer.push(current);
                if (buffer.length > count) {
                    yield buffer.shift();
                }
            }
        });
    }

    skipWhile(predicate) {
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must to be a function');
        }
        const iterator = this;
        return new Literable(function* () {
            let index = -1;
            let yielding = false;
            for (const current of iterator) {
                if (!yielding) {
                    index += 1;
                    yielding = !predicate(current, index);
                }
                if (yielding) {
                    yield current;
                }
            }
        });
    }

    sum(selector = defaultSelector) {
        if (typeof selector !== 'function') {
            throw new TypeError('selector must to be a function');
        }
        let sum = 0;
        for (const current of this) {
            sum += selector(current);
        }
        return sum;
    }

    take(count) {
        if (!Number.isInteger(count) || count < 0) {
            throw new TypeError('count must to be a positive integer');
        }
        if (count > 0) {
            const iterator = this;
            return new Literable(function* () {
                let remaining = count - 1;
                for (const current of iterator) {
                    yield current;
                    remaining -= 1;
                    if (remaining < 0) {
                        break;
                    }
                }
            });
        } else {
            return Literable.empty();
        }
    }

    takeLast(count) {
        if (!Number.isInteger(count) || count < 0) {
            throw new TypeError('count must to be a positive integer');
        }
        if (count > 0) {
            return new Literable([...this].slice(-count));
        } else {
            return Literable.empty();
        }
    }

    takeWhile(predicate) {
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must to be a function');
        }
        const iterator = this;
        return new Literable(function* () {
            let index = -1;
            for (const current of iterator) {
                index += 1;
                if (!predicate(current, index)) {
                    break;
                }
                yield current;
            }
        });
    }

    toArray() {
        return [...this];
    }

    traverseBreadthFirst(childSelector, resultSelector = defaultSelector) {
        if (typeof childSelector !== 'function') {
            throw new TypeError('childSelector function must to be provided')
        }
        const queue = [{ literable: this, level: 0 }];
        return new Literable(function* () {
            while (queue.length > 0) {
                const current = queue.shift();
                for (const element of current.literable) {
                    yield resultSelector(element, current.level);
                    const next = childSelector(element);
                    if (next) {
                        queue.push({
                            literable: Literable.from(next),
                            level: current.level + 1,
                        });
                    }
                }
            }
        });
    }

    traverseDepthFirst(childSelector, resultSelector = defaultSelector) {
        if (typeof childSelector !== 'function') {
            throw new TypeError('childSelector function must to be provided')
        }
        const stack = [this[Symbol.iterator]()];
        return new Literable(function* () {
            while (stack.length > 0) {
                const level = stack.length - 1;
                const element = stack[level].next();
                if (element.done) {
                    stack.pop();
                } else {
                    yield resultSelector(element.value, level);
                    const next = childSelector(element.value);
                    if (next) {
                        stack.push(Literable.from(next)[Symbol.iterator]());
                    }
                }
            }
        });
    }

    union(sequence, comparer = defaultEquality) {
        if (typeof comparer !== 'function') {
            throw new TypeError('comparer must to be a function');
        }
        const iterator = this;
        return new Literable(function* () {
            const yielded = [];
            for (const collection of [iterator, Literable.from(sequence)]) {
                for (const current of collection) {
                    if (!yielded.some(item => comparer(current, item))) {
                        yield current;
                        yielded.push(current);
                    }
                }
            }
        });
    }

    where(predicate) {
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must to be a function');
        }
        const iterator = this;
        return new Literable(function* () {
            let index = -1;
            for (const current of iterator) {
                index += 1;
                if (predicate(current, index)) {
                    yield current;
                }
            }
        });
    }

    zip(sequence, selector) {
        if (typeof selector !== 'function') {
            throw new TypeError('selector must to be a function');
        }
        const thisIterator = this[Symbol.iterator]();
        const sequenceIterator = Literable.from(sequence)[Symbol.iterator]();
        return new Literable(function* () {
            let index = 0;
            do {
                const elementSource = thisIterator.next();
                const elementSequence = sequenceIterator.next();
                if (elementSource.done || elementSequence.done) {
                    break;
                }
                yield selector(elementSource.value, elementSequence.value, index);
                index += 1;
            } while (true);
        });
    }
};


const LiterableArray = require('./literable-array.js');
const OrderedLiterable = require('./ordered-literable.js');

