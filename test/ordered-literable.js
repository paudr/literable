const chai = require('chai');
const { expect } = chai;

describe("OrderedLiterable", () => {
    const Literable = require('../literable.js');

    describe("thenBy(keySelector)", () => {
        it("Performs a subsequent ordering of the elements in a sequence in ascending order according to a key.", () => {
            const fruits = ['grape', 'passionfruit', 'banana', 'cherry', 'mango', 'orange', 'raspberry', 'apple', 'blueberry'];
            const query = Literable.from(fruits)
                .orderBy(fruit => fruit.length)
                .thenBy(fruit => fruit);

            expect([...query]).to.be.deep.equal([
                'apple',
                'grape',
                'mango',
                'banana',
                'cherry',
                'orange',
                'blueberry',
                'raspberry',
                'passionfruit',
            ]);
        });
    });

    describe("thenBy(keySelector, comparer)", () => {
        it("erforms a subsequent ordering of the elements in a sequence in ascending order by using a specified comparer.", () => {
            const fruits = ['grape', 'passionfruit', 'banana', 'cherry', 'mango', 'orange', 'raspberry', 'apple', 'blueberry'];
            const reverse = str => str.split('').reverse().join('');
            const comparer = (a, b) => reverse(a).localeCompare(reverse(b));
            const query = Literable.from(fruits)
                .orderBy(fruit => fruit.length)
                .thenBy(fruit => fruit, comparer);

            expect([...query]).to.be.deep.equal([
                'apple',
                'grape',
                'mango',
                'banana',
                'orange',
                'cherry',
                'blueberry',
                'raspberry',
                'passionfruit',
            ]);
        });
    });

    describe("thenByDescending(keySelector)", () => {
        it("Performs a subsequent ordering of the elements in a sequence in descending order, according to a key.", () => {
            const fruits = ['apPLe', 'baNanA', 'apple', 'APple', 'orange', 'BAnana', 'ORANGE', 'apPLE'];
            const query = Literable.from(fruits)
                .orderBy(fruit => fruit.length)
                .thenByDescending(fruit => fruit);

            expect([...query]).to.be.deep.equal([
                'APple',
                'apPLE',
                'apPLe',
                'apple',
                'ORANGE',
                'orange',
                'BAnana',
                'baNanA',
            ]);
        });
    });

    describe("thenByDescending(keySelector, comparer)", () => {
        it("Performs a subsequent ordering of the elements in a sequence in descending order by using a specified comparer.", () => {
            const fruits = ['apPLe', 'baNanA', 'apple', 'APple', 'orange', 'BAnana', 'ORANGE', 'apPLE'];
            const comparer = (a, b) => a.localeCompare(b, 'en-US-u-kf-upper');
            const query = Literable.from(fruits)
                .orderBy(fruit => fruit.length)
                .thenByDescending(fruit => fruit, comparer);

            expect([...query]).to.be.deep.equal([
                'apple',
                'apPLe',
                'apPLE',
                'APple',
                'orange',
                'ORANGE',
                'baNanA',
                'BAnana',
            ]);
        });
    });
});
