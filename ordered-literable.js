const Literable = require('./literable.js');
const { source, filter } = require('./lib/private-field.js');
const { defaultComparer } = require('./lib/default-method.js');

module.exports = class OrderedLiterable extends Literable {
    constructor(iterator, keySelector, comparer = defaultComparer, ascending) {
        if (!(iterator instanceof Literable)) {
            throw new TypeError('iterator must to be an Literable');
        }
        if (typeof keySelector !== 'function') {
            throw new TypeError('keySelector must to be a function');
        }
        if (typeof comparer !== 'function') {
            throw new TypeError('comparer must to be a function');
        }
        super(iterator);
        filter.register(this, {
            selector: keySelector,
            comparer: comparer,
            order: ascending ? 1 : -1,
        });
    }

    *[Symbol.iterator](filters = []) {
        const parent = source.get(this);
        const selfFilter = filter.get(this);
        if (parent instanceof OrderedLiterable) {
            yield* parent[Symbol.iterator]([selfFilter, ...filters]);
        } else {
            if (filters.length === 0) {
                const items = [];
                for (const current of super[Symbol.iterator]()) {
                    items.push({
                        score: selfFilter.selector(current),
                        item: current,
                    });
                }
                items.sort((a, b) => selfFilter.order * selfFilter.comparer(a.score, b.score));
                for (const current of items) {
                    yield current.item;
                }
            } else {
                const items = super.toArray();
                items.sort((a, b) => {
                    for (const currentFilter of [selfFilter, ...filters]) {
                        const result = currentFilter.order * currentFilter.comparer(currentFilter.selector(a), currentFilter.selector(b));
                        if (result !== 0) {
                            return result;
                        }
                    }
                    return 0;
                });
                for (const current of items) {
                    yield current;
                }
            }
        }
    }

    thenBy(keySelector, comparer) {
        return new OrderedLiterable(this, keySelector, comparer, true);
    }

    thenByDescending(keySelector, comparer) {
        return new OrderedLiterable(this, keySelector, comparer, false);
    }
};
