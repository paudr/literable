const chai = require('chai');
const spies = require('chai-spies');
const { expect } = chai;
chai.use(spies);

describe("Literable", () => {
    const Literable = require('../literable.js');

    function* iter(array) {
        yield* array;
    }

    describe("constructor", () => {
        it("should throw an error if iterator is not a function or an iterable", () => {
            expect(() => new Literable([1, 2, 3]))
                .to.not.throw();
            expect(() => new Literable('Hello world!'))
                .to.not.throw();
            expect(() => new Literable(function* () { yield* [1, 2, 3]; }))
                .to.not.throw();

            expect(() => new Literable())
                .to.throw();
            expect(() => new Literable({}))
                .to.throw();
        });
    });

    it("it iterates over elements", () => {
        expect([...new Literable(['a', 'b', 'c'])])
            .to.be.deep.equal(['a', 'b', 'c']);
        expect([...new Literable('Hello world!')])
            .to.be.deep.equal(['H', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', '!']);
        expect([...new Literable(function* () { for (let i = 1; i <= 3; i += 1) yield i; })])
            .to.be.deep.equal([1, 2, 3]);
    });

    describe("Literable.from()", () => {
        it("Create a new Literable with given iterator", () => {
            const fromArray = Literable.from(['a', 'b', 'c']);
            expect(fromArray).to.be.instanceOf(Literable);
            expect([...fromArray])
                .to.be.deep.equal(['a', 'b', 'c']);

            const fromIterable = Literable.from('Hello world!');
            expect(fromIterable).to.be.instanceOf(Literable);
            expect([...fromIterable])
                .to.be.deep.equal(['H', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', '!']);

            const fromGenerator = Literable.from(function* () { for (let i = 1; i <= 3; i += 1) yield i; });
            expect(fromGenerator).to.be.instanceOf(Literable);
            expect([...fromGenerator])
                .to.be.deep.equal([1, 2, 3]);
        });
    });

    describe("Literable.empty()", () => {
        it("Returns an emty Literable", () => {
            const literable = Literable.empty();
            expect(literable).to.be.instanceOf(Literable);
            expect([...literable]).to.be.deep.equal([]);
        });
    });

    describe("Literable.range(start, count)", () => {
        it("Generates a sequence of integral numbers within a specified range.", () => {
            expect(() => Literable.range(0))
                .to.throw();
            expect(() => Literable.range(0, -1))
                .to.throw();

            expect([...Literable.range(1, 3)])
                .to.be.deep.equal([1, 2, 3]);
            expect([...Literable.range(10, 5)])
                .to.be.deep.equal([10, 11, 12, 13, 14]);
        });
    });

    describe("Literable.repeat(element, count)", () => {
        it("Generates a sequence that contains one repeated value.", () => {
            expect(() => Literable.repeat(0))
                .to.throw();
            expect(() => Literable.repeat(0, -1))
                .to.throw();

            expect([...Literable.repeat('x', 3)])
                .to.be.deep.equal(['x', 'x', 'x']);
            expect([...Literable.repeat({}, 3)])
                .to.be.deep.equal([{}, {}, {}]);
        });
    });

    describe("aggregate(func)", () => {
        it("Applies an accumulator function over a sequence", () => {
            const input = 'the quick brown fox jumps over the lazy dog'.split(' ');
            const reversed = Literable.from(input).aggregate((sentence, next) => `${next} ${sentence}`);

            expect(reversed).to.be.equal('dog lazy the over jumps fox brown quick the');
        });

        it("Should throw an error if func is not a function", () => {
            expect(() => Literable.range(0, 10).aggregate())
                .to.throw();
            expect(() => Literable.range(0, 10).aggregate('not a function'))
                .to.throw();
        });
    });

    describe("aggregate(seed, func)", () => {
        it("Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value.", () => {
            const ints = iter([4, 8, 8, 3, 9, 0, 7, 8, 2]);
            const numEven = Literable.from(ints).aggregate(0, (total, next) => next % 2 == 0 ? total + 1 : total);

            expect(numEven).to.be.equal(6);
        });

        it("Should throw an error if func is not a function", () => {
            expect(() => Literable.range(0, 10).aggregate(0))
                .to.throw();
            expect(() => Literable.range(0, 10).aggregate(0, 'not a function'))
                .to.throw();
        });
    });

    describe("aggregate(seed, func, resultSelector)", () => {
        it("Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value, and the specified function is used to select the result value.", () => {
            const fruits = iter(['apple', 'mango', 'orange', 'passionfruit', 'grape']);
            const longestName = Literable.from(fruits).aggregate(
                'banana',
                (longest, next) => next.length > longest.length ? next : longest,
                fruit => fruit.toUpperCase()
            );

            expect(longestName).to.be.equal('PASSIONFRUIT');
        });

        it("Should throw an error if resultSelector is not a function", () => {
            expect(() => Literable.range(0, 10).aggregate(0, x => x, 0))
                .to.throw();
            expect(() => Literable.range(0, 10).aggregate(0, x => x, 'not a function'))
                .to.throw();
        });
    });

    describe("all(predicate)", () => {
        it("Determines whether all elements of a sequence satisfy a condition.", () => {
            const pets = iter([
                { name: 'Barley', age: 10 },
                { name: 'Boots', age: 4 },
                { name: 'Whiskers', age: 6 },
            ]);
            const allStartWithB = Literable.from(pets)
                .all(pet => pet.name.startsWith('B'));

            expect(allStartWithB).to.be.false;
        });
    });

    describe("any()", () => {
        it("Determines whether a sequence contains any elements.", () => {
            const notEmpty = Literable.from(iter([1, 2])).any();
            expect(notEmpty).to.be.true;

            const empty = Literable.from(iter([])).any();
            expect(empty).to.be.false;
        });
    });

    describe("any(predicate)", () => {
        it("Determines whether any element of a sequence exists or satisfies a condition.", () => {
            const pets = iter([
                { name: 'Barley', age: 8, vaccinated: true },
                { name: 'Boots', age: 4, vaccinated: false },
                { name: 'Whiskers', age: 1, vaccinated: false },
            ]);
            const unvaccinated = Literable.from(pets)
                .any(pet => pet.age > 1 && pet.vaccinated === false);

            expect(unvaccinated).to.be.true;
        });
    });

    describe("append(...elements)", () => {
        it("Appends values to the end of the sequence.", () => {
            const numbers = iter([1, 2, 3, 4]);
            const appended = Literable.from(numbers)
                .append(5, 6, 7);

            expect([...appended])
                .to.be.deep.equal([1, 2, 3, 4, 5, 6, 7]);
        });
    });

    describe("average()", () => {
        it("Computes the average of a sequence of numeric values.", () => {
            const grades = iter([78, 92, 100, 37, 81]);
            const average = Literable.from(grades).average();

            expect(average).to.be.equal(77.6);
        });
    });

    describe("average(selector)", () => {
        it("Computes the average of a sequence of numeric values.", () => {
            const pets = iter([
                { name: 'Barley', age: 10 },
                { name: 'Boots', age: 14 },
                { name: 'Whiskers', age: 6 },
            ]);
            const average = Literable.from(pets)
                .average(pet => pet.age);

            expect(average).to.be.equal(10);
        });
    });

    describe("concat(...collections)", () => {
        it("Concatenates a collection of sequences.", () => {
            const cats = iter([
                { name: 'Barley', age: 10 },
                { name: 'Boots', age: 14 },
                { name: 'Whiskers', age: 6 },
            ]);
            const dogs = iter([
                { name: 'Bounder', age: 3 },
                { name: 'Snoopy', age: 14 },
                { name: 'Fido', age: 9 },
            ]);
            const concated = Literable.from(cats).concat(dogs);
            const names = [...concated].map(pet => pet.name);

            expect(names).to.be.deep.equal([
                'Barley',
                'Boots',
                'Whiskers',
                'Bounder',
                'Snoopy',
                'Fido',
            ]);
        });

        it("Collections can be generator functions.", () => {
            const concated = Literable.range(0, 3).concat(
                Literable.repeat(0, 3),
                function* () { yield* ['a', 'b', 'c'] }
            );

            expect([...concated]).to.be.deep.equal([
                0, 1, 2,
                0, 0, 0,
                'a', 'b', 'c'
            ]);
        });

    });

    describe("contains(value)", () => {
        it("Determines whether a sequence contains a specified element.", () => {
            const fruits = iter(['apple', 'mango', 'orange', 'passionfruit', 'grape']);
            const hasMango = Literable.from(fruits).contains('mango');
            const hasBanana = Literable.from(fruits).contains('banana');

            expect(hasMango).to.be.true;
            expect(hasBanana).to.be.false;
        });
    });

    describe("contains(value, comparer)", () => {
        it("Determines whether a sequence contains a specified element by using a specified comparer.", () => {
            const fruits = iter([
                { name: 'apple', code: 9 },
                { name: 'orange', code: 4 },
                { name: 'lemon', code: 12 },
            ]);
            const apple = { name: 'apple', code: 9 };
            const kiwi = { name: 'kiwi', code: 8 };
            const comparer = (a, b) => a.name === b.name && a.code === b.code;

            const hasApple = Literable.from(fruits).contains(apple, comparer);
            const hasKiwi = Literable.from(fruits).contains(kiwi, comparer);

            expect(hasApple).to.be.true;
            expect(hasKiwi).to.be.false;
        });
    });

    describe("count()", () => {
        it("Returns the number of elements in a sequence.", () => {
            const fruits = iter(['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape']);
            const numberOfFruits = Literable.from(fruits).count();

            expect(numberOfFruits).to.be.equal(6);
        });
    });

    describe("count(comparer)", () => {
        it("Returns a number that represents how many elements in the specified sequence satisfy a condition.", () => {
            const pets = iter([
                { name: 'Barley', vaccinated: true },
                { name: 'Boots', vaccinated: false },
                { name: 'Whiskers', vaccinated: false },
            ]);
            const numberUnvaccinated = Literable.from(pets)
                .count(pet => pet.vaccinated === false);

            expect(numberUnvaccinated).to.be.equal(2);
        });
    });

    describe("defaultIfEmpty(defaultValue)", () => {
        it("Returns the elements of the specified sequence or the specified value in a singleton collection if the sequence is empty.", () => {
            const defaultPet = { name: 'Default Pet', age: 0 };
            const pets = iter([
                { name: 'Barley', age: 8 },
                { name: 'Boots', age: 4 },
                { name: 'Whiskers', age: 1 },
            ]);

            const petsMock = chai.spy();
            const emptyMock = chai.spy();

            for (pet of Literable.from(pets).defaultIfEmpty(defaultPet)) {
                petsMock(pet.name);
            }
            for (pet of Literable.from(iter([])).defaultIfEmpty(defaultPet)) {
                emptyMock(pet.name);
            }

            expect(petsMock).to.have.been.first.called.with('Barley');
            expect(petsMock).to.have.been.called.exactly(3);
            expect(emptyMock).to.have.been.first.called.with('Default Pet');
            expect(emptyMock).to.have.been.called.once;
        });
    });

    describe("distinct()", () => {
        it("Returns distinct elements from a sequence by using the default equality comparer to compare values.", () => {
            const ages = iter([21, 46, 46, 55, 17, 21, 55, 55]);
            const distinctAges = Literable.from(ages).distinct();

            expect([...distinctAges]).to.be.deep.equal([21, 46, 55, 17]);
        });
    });

    describe("distinct(comparer)", () => {
        it("Returns distinct elements from a sequence by using a specified comparer.", () => {
            const products = iter([
                { name: 'apple', code: 9 },
                { name: 'orange', code: 4 },
                { name: 'apple', code: 9 },
                { name: 'lemon', code: 12 },
            ]);
            const comparer = (a, b) => a.name === b.name && a.code === b.code;
            const noduplicates = Literable.from(products).distinct(comparer);

            expect([...noduplicates]).to.be.deep.equal([
                { name: 'apple', code: 9 },
                { name: 'orange', code: 4 },
                { name: 'lemon', code: 12 },
            ]);
        });
    });

    describe("elementAt(index)", () => {
        it("Returns the element at a specified index in a sequence.", () => {
            const names = iter(['Hartono, Tommy', 'Adams, Terry', 'Andersen, Henriette Thaulow', 'Hedlund, Magnus', 'Ito, Shu']);
            const name = Literable.from(names).elementAt(4);

            expect(name).to.be.equal('Ito, Shu');
        });
    });

    describe("elementAtOrDefault(index, defaultValue)", () => {
        it("Returns the element at a specified index in a sequence or a default value if the index is out of range.", () => {
            const names = iter(['Hartono, Tommy', 'Adams, Terry', 'Andersen, Henriette Thaulow', 'Hedlund, Magnus', 'Ito, Shu']);
            const name = Literable.from(names).elementAtOrDefault(20, '');

            expect(name).to.be.equal('');
        });
    });

    describe("except(sequence)", () => {
        it("Produces the set difference of two sequences.", () => {
            const numbers1 = iter([2.0, 2.0, 2.1, 2.2, 2.3, 2.3, 2.4, 2.5]);
            const numbers2 = iter([2.2]);
            const onlyInFirstSet = Literable.from(numbers1).except(numbers2);

            expect([...onlyInFirstSet]).to.be.deep.equal([2.0, 2.1, 2.3, 2.4, 2.5]);
        });

        it("sequence can be a generator function", () => {
            const numbers1 = iter([2.0, 2.0, 2.1, 2.2, 2.3, 2.3, 2.4, 2.5]);
            const numbers2 = iter([2.2]);
            const onlyInFirstSet = Literable.from(numbers1).except(numbers2);

            expect([...onlyInFirstSet]).to.be.deep.equal([2.0, 2.1, 2.3, 2.4, 2.5]);
        });
    });

    describe("except(sequence, comparer)", () => {
        it("Produces the set difference of two sequences by using the specified comparer.", () => {
            const fruits1 = iter([
                { name: 'apple', code: 9 },
                { name: 'orange', code: 4 },
                { name: 'lemon', code: 12 },
            ]);
            const fruits2 = iter([{ name: 'apple', code: 9 }]);
            const comparer = (a, b) => a.name === b.name && a.code === b.code;
            const except = Literable.from(fruits1).except(fruits2, comparer);

            expect([...except]).to.be.deep.equal([
                { name: 'orange', code: 4 },
                { name: 'lemon', code: 12 },
            ])
        });
    });

    describe("findIndex(predicate)", () => {
        it("Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the first occurrence within the sequence.", () => {
            const dinosaurs = Literable.from(iter(['Compsognathus', 'Amargasaurus', 'Oviraptor', 'Velociraptor', 'Deinonychus', 'Dilophosaurus', 'Gallimimus', 'Triceratops']));
            const endsWithSaurus = name => name.endsWith('saurus');

            expect(dinosaurs.findIndex(endsWithSaurus)).to.be.equal(1);
        });
    });

    describe("findIndex(predicate, startIndex)", () => {
        it("Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the first occurrence within the range of elements in the sequence that extends from the specified index to the last element.", () => {
            const dinosaurs = ['Compsognathus', 'Amargasaurus', 'Oviraptor', 'Velociraptor', 'Deinonychus', 'Dilophosaurus', 'Gallimimus', 'Triceratops'];
            const endsWithSaurus = name => name.endsWith('saurus');

            expect(Literable.from(iter(dinosaurs)).findIndex(endsWithSaurus)).to.be.equal(1);
            expect(Literable.from(iter(dinosaurs)).findIndex(endsWithSaurus, 2)).to.be.equal(5);
            expect(Literable.from(iter(dinosaurs)).findIndex(endsWithSaurus, 6)).to.be.equal(-1);
        });
    });

    describe("findIndex(predicate, startIndex, count)", () => {
        it("Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the first occurrence within the range of elements in the sequence that starts at the specified index and contains the specified number of elements.", () => {
            const dinosaurs = ['Compsognathus', 'Amargasaurus', 'Oviraptor', 'Velociraptor', 'Deinonychus', 'Dilophosaurus', 'Gallimimus', 'Triceratops'];
            const endsWithSaurus = name => name.endsWith('saurus');

            expect(Literable.from(iter(dinosaurs)).findIndex(endsWithSaurus)).to.be.equal(1);
            expect(Literable.from(iter(dinosaurs)).findIndex(endsWithSaurus, 2, 3)).to.be.equal(5);
            expect(Literable.from(iter(dinosaurs)).findIndex(endsWithSaurus, 2, 2)).to.be.equal(-1);
        });
    });

    describe("findLastIndex(predicate)", () => {
        it("Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the entire sequence.", () => {
            const dinosaurs = Literable.from(iter(['Compsognathus', 'Amargasaurus', 'Oviraptor', 'Velociraptor', 'Deinonychus', 'Dilophosaurus', 'Gallimimus', 'Triceratops']));
            const endsWithSaurus = name => name.endsWith('saurus');

            expect(dinosaurs.findLastIndex(endsWithSaurus)).to.be.equal(5);
        });
    });

    describe("findLastIndex(predicate, startIndex)", () => {
        it("Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the range of elements in the sequence that extends from the first element to the specified index.", () => {
            const dinosaurs = ['Compsognathus', 'Amargasaurus', 'Oviraptor', 'Velociraptor', 'Deinonychus', 'Dilophosaurus', 'Gallimimus', 'Triceratops'];
            const endsWithSaurus = name => name.endsWith('saurus');

            expect(Literable.from(iter(dinosaurs)).findLastIndex(endsWithSaurus)).to.be.equal(5);
            expect(Literable.from(iter(dinosaurs)).findLastIndex(endsWithSaurus, 4)).to.be.equal(1);
            expect(Literable.from(iter(dinosaurs)).findLastIndex(endsWithSaurus, 0)).to.be.equal(-1);
        });
    });

    describe("findLastIndex(predicate, startIndex, count)", () => {
        it("Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the range of elements in the sequence that contains the specified number of elements and ends at the specified index.", () => {
            const dinosaurs = ['Compsognathus', 'Amargasaurus', 'Oviraptor', 'Velociraptor', 'Deinonychus', 'Dilophosaurus', 'Gallimimus', 'Triceratops'];
            const endsWithSaurus = name => name.endsWith('saurus');

            expect(Literable.from(iter(dinosaurs)).findLastIndex(endsWithSaurus)).to.be.equal(5);
            expect(Literable.from(iter(dinosaurs)).findLastIndex(endsWithSaurus, 4)).to.be.equal(1);
            expect(Literable.from(iter(dinosaurs)).findLastIndex(endsWithSaurus, 4, 3)).to.be.equal(-1);
            expect(Literable.from(iter(dinosaurs)).findLastIndex(endsWithSaurus, 4, 4)).to.be.equal(1);
        });
    });

    describe("first()", () => {
        it("Returns the first element of a sequence.", () => {
            const numbers = iter([9, 34, 65, 92, 87, 435, 3, 54, 83, 23, 87, 435, 67, 12, 19]);
            const first = Literable.from(numbers).first();

            expect(first).to.be.equal(9);
        });
    });

    describe("first(predicate)", () => {
        it("Returns the first element in a sequence that satisfies a specified condition.", () => {
            const numbers = iter([9, 34, 65, 92, 87, 435, 3, 54, 83, 23, 87, 435, 67, 12, 19]);
            const first = Literable.from(numbers).first(number => number > 80);

            expect(first).to.be.equal(92);
        });
    });

    describe("firstOrDefault(defaultValue)", () => {
        it("Returns the first element of a sequence, or a default value if the sequence contains no elements.", () => {
            const first = Literable.from(iter([])).firstOrDefault(0);
            expect(first).to.be.equal(0);
        });
    });

    describe("firstOrDefault(predicate, defaultValue)", () => {
        it("Returns the first element of the sequence that satisfies a condition or a default value if no such element is found.", () => {
            const names = iter(['Hartono, Tommy', 'Adams, Terry', 'Andersen, Henriette Thaulow', 'Hedlund, Magnus', 'Ito, Shu']);
            const firstLongName = Literable.from(names).firstOrDefault(name => name.length > 20, '');
            const firstVeryLongName = Literable.from(names).firstOrDefault(name => name.length > 30, '');

            expect(firstLongName).to.be.equal('Andersen, Henriette Thaulow');
            expect(firstVeryLongName).to.be.equal('');
        });
    });

    describe("flat()", () => {
        it("Projects each element of a sequence to an Literable and all sub-sequence elements concatenated into it recursively and flattens the resulting sequences into one sequence.", () => {
            const array1 = iter([1, 2, Literable.from(iter([3, 4]))]);
            const array2 = iter([1, 2, [3, 4, Literable.from(iter([5, 6]))]]);

            const flat1 = Literable.from(array1).flat().toArray();
            const flat2 = Literable.from(array2).flat().toArray();

            expect(flat1).to.be.deep.equal([1, 2, 3, 4]);
            expect(flat2).to.be.deep.equal([1, 2, 3, 4, 5, 6]);
        });
    });

    describe("flat(depth)", () => {
        it("Projects each element of a sequence to an Literable and all sub-sequence elements concatenated into it recursively and flattens the resulting sequences into one sequence.", () => {
            const array1 = iter([1, 2, Literable.from(iter([3, 4]))]);
            const array2 = () => iter([1, 2, [3, 4, [5, 6]]]);

            const flat1 = Literable.from(array1).flat().toArray();
            const flat2 = Literable.from(array2).flat(2).toArray();
            const flat3 = Literable.from(array2).flat().toArray();

            expect(flat1).to.be.deep.equal([1, 2, 3, 4]);
            expect(flat2).to.be.deep.equal([1, 2, 3, 4, [5, 6]]);
            expect(flat3).to.be.deep.equal([1, 2, 3, 4, 5, 6]);
        });
    });

    describe("forEach(action)", () => {
        it("Performs the specified action on each element of the specified sequence.", () => {
            const action = chai.spy();
            Literable.from(iter(['a', 'b', 'c'])).forEach(action);

            expect(action).to.have.been.called.exactly(3);

            expect(action).to.have.been.first.called.with.exactly('a', 0);
            expect(action).to.have.been.second.called.with.exactly('b', 1);
            expect(action).to.have.been.third.called.with.exactly('c', 2);
        });
    });

    describe("groupBy(keySelector)", () => {
        it("Groups the elements of a sequence according to a specified key selector function.", () => {
            const petsList = iter([
                { name: 'Barley', age: 8.3 },
                { name: 'Boots', age: 4.9 },
                { name: 'Whiskers', age: 1.5 },
                { name: 'Daisy', age: 4.3 },
            ]);
            const query = Literable.from(petsList).groupBy(pet => Math.floor(pet.age));

            expect([...query]).to.be.deep.equal([{
                key: 8,
                value: [{ name: 'Barley', age: 8.3 }],
            }, {
                key: 4,
                value: [
                    { name: 'Boots', age: 4.9 },
                    { name: 'Daisy', age: 4.3 },
                ],
            }, {
                key: 1,
                value: [{ name: 'Whiskers', age: 1.5 }],
            }]);
        });
    });

    describe("groupBy(keySelector, elementSelector)", () => {
        it("Groups the elements of a sequence according to a specified key selector function. The elements of each group are projected by using a specified function.", () => {
            const petsList = iter([
                { name: 'Barley', age: 8.3 },
                { name: 'Boots', age: 4.9 },
                { name: 'Whiskers', age: 1.5 },
                { name: 'Daisy', age: 4.3 },
            ]);
            const query = Literable.from(petsList).groupBy(
                pet => Math.floor(pet.age),
                pet => pet.name,
            );

            expect([...query]).to.be.deep.equal([{
                key: 8,
                value: ['Barley'],
            }, {
                key: 4,
                value: ['Boots', 'Daisy'],
            }, {
                key: 1,
                value: ['Whiskers'],
            }]);
        });
    });

    describe("groupBy(keySelector, elementSelector, resultSelector)", () => {
        it("Groups the elements of a sequence according to a specified key selector function and creates a result value from each group and its key.", () => {
            const petsList = iter([
                { name: 'Barley', age: 8.3 },
                { name: 'Boots', age: 4.9 },
                { name: 'Whiskers', age: 1.5 },
                { name: 'Daisy', age: 4.3 },
            ]);
            const query = Literable.from(petsList).groupBy(
                pet => Math.floor(pet.age),
                pet => pet,
                (age, pets) => ({
                    key: age,
                    count: pets.length,
                    min: Literable.from(pets).min(pet => pet.age),
                    max: Literable.from(pets).max(pet => pet.age),
                })
            );

            expect([...query]).to.be.deep.equal([{
                key: 8,
                count: 1,
                min: 8.3,
                max: 8.3,
            }, {
                key: 4,
                count: 2,
                min: 4.3,
                max: 4.9,
            }, {
                key: 1,
                count: 1,
                min: 1.5,
                max: 1.5,
            }]);
        });
    });

    describe("groupBy(keySelector, elementSelector, resultSelector, comparer)", () => {
        it("Groups the elements of a sequence according to a specified key selector function and using a specified comparer, and creates a result value from each group and its key.", () => {
            const petsList = iter([
                { name: 'Barley', age: 8.3 },
                { name: 'Boots', age: 4.9 },
                { name: 'Whiskers', age: 1.5 },
                { name: 'Daisy', age: 4.3 },
            ]);
            const query = Literable.from(petsList).groupBy(
                pet => pet.age,
                pet => pet.age,
                (baseAge, ages) => ({
                    key: baseAge,
                    count: ages.length,
                    min: Literable.from(ages).min(),
                    max: Literable.from(ages).max(),
                }),
                (a, b) => Math.floor(a) === Math.floor(b)
            );

            expect([...query]).to.be.deep.equal([{
                key: 8.3,
                count: 1,
                min: 8.3,
                max: 8.3,
            }, {
                key: 4.9,
                count: 2,
                min: 4.3,
                max: 4.9,
            }, {
                key: 1.5,
                count: 1,
                min: 1.5,
                max: 1.5,
            }]);
        });
    });

    describe("groupJoin(sequence, keySelector, sequenceKeySelector)", () => {
        it("Correlates the elements of two sequences based on equality of keys and groups the results. The default equality comparer is used to compare keys.", () => {
            const people = iter([
                { name: 'Hedlund, Magnus' },
                { name: 'Adams, Terry' },
                { name: 'Weiss, Charlotte' },
            ]);
            const pets = iter([
                { name: 'Barley', owner: 'Adams, Terry' },
                { name: 'Boots', owner: 'Adams, Terry' },
                { name: 'Whiskers', owner: 'Weiss, Charlotte' },
                { name: 'Daisy', owner: 'Hedlund, Magnus' },
            ]);
            const query = Literable.from(people).groupJoin(
                pets,
                person => person.name,
                pet => pet.owner,
            );

            expect([...query]).to.be.deep.equal([{
                key: { name: 'Hedlund, Magnus' },
                value: [
                    { name: 'Daisy', owner: 'Hedlund, Magnus' },
                ],
            }, {
                key: { name: 'Adams, Terry' },
                value: [
                    { name: 'Barley', owner: 'Adams, Terry' },
                    { name: 'Boots', owner: 'Adams, Terry' },
                ],
            }, {
                key: { name: 'Weiss, Charlotte' },
                value: [
                    { name: 'Whiskers', owner: 'Weiss, Charlotte' },
                ],
            }]);
        });

        it("Other collection can be generator functions.", () => {
            const people = iter([
                { name: 'Hedlund, Magnus' },
                { name: 'Adams, Terry' },
                { name: 'Weiss, Charlotte' },
            ]);
            const pets = function* () {
                yield* [
                    { name: 'Barley', owner: 'Adams, Terry' },
                    { name: 'Boots', owner: 'Adams, Terry' },
                    { name: 'Whiskers', owner: 'Weiss, Charlotte' },
                    { name: 'Daisy', owner: 'Hedlund, Magnus' },
                ];
            };
            const query = Literable.from(people).groupJoin(
                pets,
                person => person.name,
                pet => pet.owner,
            );

            expect([...query]).to.be.deep.equal([{
                key: { name: 'Hedlund, Magnus' },
                value: [
                    { name: 'Daisy', owner: 'Hedlund, Magnus' },
                ],
            }, {
                key: { name: 'Adams, Terry' },
                value: [
                    { name: 'Barley', owner: 'Adams, Terry' },
                    { name: 'Boots', owner: 'Adams, Terry' },
                ],
            }, {
                key: { name: 'Weiss, Charlotte' },
                value: [
                    { name: 'Whiskers', owner: 'Weiss, Charlotte' },
                ],
            }]);
        });
    });

    describe("groupJoin(sequence, keySelector, sequenceKeySelector, resultSelector)", () => {
        it("Correlates the elements of two sequences based on equality of keys and creates a result value from each group and its key. The default equality comparer is used to compare keys.", () => {
            const people = iter([
                { name: 'Hedlund, Magnus' },
                { name: 'Adams, Terry' },
                { name: 'Weiss, Charlotte' },
            ]);
            const pets = iter([
                { name: 'Barley', owner: 'Adams, Terry' },
                { name: 'Boots', owner: 'Adams, Terry' },
                { name: 'Whiskers', owner: 'Weiss, Charlotte' },
                { name: 'Daisy', owner: 'Hedlund, Magnus' },
            ]);
            const query = Literable.from(people).groupJoin(
                pets,
                person => person.name,
                pet => pet.owner,
                (person, pets) => ({
                    ownerName: person.name,
                    pets: pets.map(pet => pet.name),
                })
            );

            expect([...query]).to.be.deep.equal([{
                ownerName: 'Hedlund, Magnus',
                pets: ['Daisy'],
            }, {
                ownerName: 'Adams, Terry',
                pets: ['Barley', 'Boots'],
            }, {
                ownerName: 'Weiss, Charlotte',
                pets: ['Whiskers'],
            }]);
        });
    });

    describe("groupJoin(sequence, keySelector, sequenceKeySelector, resultSelector, comparer)", () => {
        it("Correlates the elements of two sequences based on key equality and groups the results. A specified comparer is used to compare keys.", () => {
            const people = iter([
                { name: 'Hedlund, Magnus' },
                { name: 'Adams, Terry' },
                { name: 'Weiss, Charlotte' },
            ]);
            const pets = iter([
                { name: 'Barley', owner: 'Adams, Terry' },
                { name: 'Boots', owner: 'Adams, Terry' },
                { name: 'Whiskers', owner: 'Weiss, Charlotte' },
                { name: 'Daisy', owner: 'Hedlund, Magnus' },
            ]);
            const query = Literable.from(people).groupJoin(
                pets,
                person => person.name,
                pet => pet.owner,
                (person, pets) => ({
                    ownerName: person.name,
                    pets: pets.map(pet => pet.name),
                }),
                (a, b) => a.indexOf(',') === b.indexOf(',')
            );

            expect([...query]).to.be.deep.equal([{
                ownerName: 'Hedlund, Magnus',
                pets: ['Daisy'],
            }, {
                ownerName: 'Adams, Terry',
                pets: ['Barley', 'Boots', 'Whiskers'],
            }, {
                ownerName: 'Weiss, Charlotte',
                pets: ['Barley', 'Boots', 'Whiskers'],
            }]);
        });
    });

    describe("indexOf(element)", () => {
        it("Searches for the specified object and returns the index of its first occurrence in a sequence.", () => {
            const strings = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', 'in', 'the', 'barn'];

            expect(Literable.from(iter(strings)).indexOf('the')).to.be.equal(0);
            expect(Literable.from(iter(strings)).indexOf('jumps')).to.be.equal(4);
        });
    });

    describe("indexOf(element, startIndex)", () => {
        it("Searches for the specified object and returns the index of its first occurrence in a sequence. The range extends from a specified index to the end of the sequence.", () => {
            const strings = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', 'in', 'the', 'barn'];

            expect(Literable.from(iter(strings)).indexOf('the')).to.be.equal(0);
            expect(Literable.from(iter(strings)).indexOf('the', 4)).to.be.equal(6);
            expect(Literable.from(iter(strings)).indexOf('the', 7)).to.be.equal(10);
        });
    });

    describe("indexOf(element, startIndex, count)", () => {
        it("Searches for the specified object in a range of elements of a sequence, and returns the index of ifs first occurrence. The range extends from a specified index for a specified number of elements.", () => {
            const strings = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', 'in', 'the', 'barn'];

            expect(Literable.from(iter(strings)).indexOf('the')).to.be.equal(0);
            expect(Literable.from(iter(strings)).indexOf('the', 4)).to.be.equal(6);
            expect(Literable.from(iter(strings)).indexOf('the', 7)).to.be.equal(10);
            expect(Literable.from(iter(strings)).indexOf('the', 7, 2)).to.be.equal(-1);
        });
    });

    describe("intersect(sequence)", () => {
        it("Produces the set intersection of two sequences by using the default equality comparer to compare values.", () => {
            const id1 = iter([44, 26, 92, 30, 71, 38]);
            const id2 = iter([39, 59, 83, 47, 26, 4, 30]);
            const both = Literable.from(id1).intersect(id2);

            expect([...both]).to.be.deep.equal([26, 30]);
        });

        it("Other collection can be generator functions.", () => {
            const id1 = iter([44, 26, 92, 30, 71, 38]);
            const id2 = iter([39, 59, 83, 47, 26, 4, 30]);
            const both = Literable.from(id1).intersect(id2);

            expect([...both]).to.be.deep.equal([26, 30]);
        });
    });

    describe("intersect(sequence, comparer)", () => {
        it("Produces the set intersection of two sequences by using the specified comparer to compare values.", () => {
            const store1 = iter([
                { name: 'apple', code: 9 },
                { name: 'orange', code: 4 },
            ]);
            const store2 = iter([
                { name: 'apple', code: 9 },
                { name: 'lemon', code: 12 },
            ]);
            const duplicates = Literable.from(store1).intersect(store2, (a, b) => a.name === b.name);

            expect([...duplicates]).to.be.deep.equal([{ name: 'apple', code: 9 }]);
        });
    });

    describe("join(sequence, keySelector, sequenceKeySelector)", () => {
        it("Correlates the elements of two sequences based on matching keys. The default equality comparer is used to compare keys.", () => {
            const people = iter([
                { name: 'Hedlund, Magnus' },
                { name: 'Adams, Terry' },
                { name: 'Weiss, Charlotte' },
            ]);
            const pets = iter([
                { name: 'Barley', owner: 'Adams, Terry' },
                { name: 'Boots', owner: 'Adams, Terry' },
                { name: 'Whiskers', owner: 'Weiss, Charlotte' },
                { name: 'Daisy', owner: 'Hedlund, Magnus' },
            ]);
            const query = Literable.from(people).join(
                pets,
                person => person.name,
                pet => pet.owner
            );

            expect([...query]).to.be.deep.equal([{
                key: { name: 'Hedlund, Magnus' },
                value: { name: 'Daisy', owner: 'Hedlund, Magnus' },
            }, {
                key: { name: 'Adams, Terry' },
                value: { name: 'Barley', owner: 'Adams, Terry' },
            }, {
                key: { name: 'Adams, Terry' },
                value: { name: 'Boots', owner: 'Adams, Terry' },
            }, {
                key: { name: 'Weiss, Charlotte' },
                value: { name: 'Whiskers', owner: 'Weiss, Charlotte' },
            }]);
        });

        it("Other collection can be generator functions.", () => {
            const people = iter([
                { name: 'Hedlund, Magnus' },
                { name: 'Adams, Terry' },
                { name: 'Weiss, Charlotte' },
            ]);
            const pets = function* () {
                yield* [
                    { name: 'Barley', owner: 'Adams, Terry' },
                    { name: 'Boots', owner: 'Adams, Terry' },
                    { name: 'Whiskers', owner: 'Weiss, Charlotte' },
                    { name: 'Daisy', owner: 'Hedlund, Magnus' },
                ];
            }
            const query = Literable.from(people).join(
                pets,
                person => person.name,
                pet => pet.owner
            );

            expect([...query]).to.be.deep.equal([{
                key: { name: 'Hedlund, Magnus' },
                value: { name: 'Daisy', owner: 'Hedlund, Magnus' },
            }, {
                key: { name: 'Adams, Terry' },
                value: { name: 'Barley', owner: 'Adams, Terry' },
            }, {
                key: { name: 'Adams, Terry' },
                value: { name: 'Boots', owner: 'Adams, Terry' },
            }, {
                key: { name: 'Weiss, Charlotte' },
                value: { name: 'Whiskers', owner: 'Weiss, Charlotte' },
            }]);
        });
    });

    describe("join(sequence, keySelector, sequenceKeySelector, resultSelector)", () => {
        it("Correlates the elements of two sequences based on matching keys and creates a result value from each group and its key. The default equality comparer is used to compare keys.", () => {
            const people = iter([
                { name: 'Hedlund, Magnus' },
                { name: 'Adams, Terry' },
                { name: 'Weiss, Charlotte' },
            ]);
            const pets = iter([
                { name: 'Barley', owner: 'Adams, Terry' },
                { name: 'Boots', owner: 'Adams, Terry' },
                { name: 'Whiskers', owner: 'Weiss, Charlotte' },
                { name: 'Daisy', owner: 'Hedlund, Magnus' },
            ]);
            const query = Literable.from(people).join(
                pets,
                person => person.name,
                pet => pet.owner,
                (person, pet) => ({
                    ownerName: person.name,
                    pet: pet.name,
                })
            );

            expect([...query]).to.be.deep.equal([{
                ownerName: 'Hedlund, Magnus',
                pet: 'Daisy',
            }, {
                ownerName: 'Adams, Terry',
                pet: 'Barley',
            }, {
                ownerName: 'Adams, Terry',
                pet: 'Boots',
            }, {
                ownerName: 'Weiss, Charlotte',
                pet: 'Whiskers',
            }]);
        });
    });

    describe("join(sequence, keySelector, sequenceKeySelector, resultSelector, comparer)", () => {
        it("Correlates the elements of two sequences based on matching keys and creates a result value from each group and its key. A specified comparer is used to compare keys.", () => {
            const people = iter([
                { name: 'Hedlund, Magnus' },
                { name: 'Adams, Terry' },
                { name: 'Weiss, Charlotte' },
            ]);
            const pets = iter([
                { name: 'Barley', owner: 'Adams, Terry' },
                { name: 'Boots', owner: 'Adams, Terry' },
                { name: 'Whiskers', owner: 'Weiss, Charlotte' },
                { name: 'Daisy', owner: 'Hedlund, Magnus' },
            ]);
            const query = Literable.from(people).join(
                pets,
                person => person.name,
                pet => pet.owner,
                (person, pet) => ({
                    ownerName: person.name,
                    pet: pet.name,
                }),
                (a, b) => a.indexOf(',') === b.indexOf(',')
            );

            expect([...query]).to.be.deep.equal([{
                ownerName: 'Hedlund, Magnus',
                pet: 'Daisy',
            }, {
                ownerName: 'Adams, Terry',
                pet: 'Barley',
            }, {
                ownerName: 'Adams, Terry',
                pet: 'Boots',
            }, {
                ownerName: 'Adams, Terry',
                pet: 'Whiskers',
            }, {
                ownerName: 'Weiss, Charlotte',
                pet: 'Barley',
            }, {
                ownerName: 'Weiss, Charlotte',
                pet: 'Boots',
            }, {
                ownerName: 'Weiss, Charlotte',
                pet: 'Whiskers',
            }]);
        });
    });

    describe("last()", () => {
        it("Returns the last element of a sequence.", () => {
            const numbers = iter([9, 34, 65, 92, 87, 435, 3, 54, 83, 23, 87, 67, 12, 19]);
            const last = Literable.from(numbers).last();

            expect(last).to.be.equal(19);
        });
    });

    describe("last(predicate)", () => {
        it("Returns the last element of a sequence that satisfies a specified condition.", () => {
            const numbers = iter([9, 34, 65, 92, 87, 435, 3, 54, 83, 23, 87, 67, 12, 19]);
            const last = Literable.from(numbers).last(num => num > 80);

            expect(last).to.be.equal(87);
        });
    });

    describe("lastIndexOf(element)", () => {
        it("Returns the index of the last occurrence of a value in a sequence.", () => {
            const strings = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', 'in', 'the', 'barn'];

            expect(Literable.from(iter(strings)).lastIndexOf('the')).to.be.equal(10);
            expect(Literable.from(iter(strings)).lastIndexOf('jumps')).to.be.equal(4);
        });
    });

    describe("lastIndexOf(element, index)", () => {
        it("Searches for the specified object and returns the index of the last occurrence within the range of elements in a sequence extends from the first element to the specified index.", () => {
            const strings = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', 'in', 'the', 'barn'];

            expect(Literable.from(iter(strings)).lastIndexOf('the')).to.be.equal(10);
            expect(Literable.from(iter(strings)).lastIndexOf('the', 8)).to.be.equal(6);
        });
    });

    describe("lastIndexOf(element, index, count)", () => {
        it("Searches for the specified object and returns the index of the last occurrence within the range of elements in the sequences that contains the specified number of elements and ends at the specified index.", () => {
            const strings = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', 'in', 'the', 'barn'];

            expect(Literable.from(iter(strings)).lastIndexOf('the')).to.be.equal(10);
            expect(Literable.from(iter(strings)).lastIndexOf('the', 8)).to.be.equal(6);
            expect(Literable.from(iter(strings)).lastIndexOf('the', 5, 6)).to.be.equal(0);
            expect(Literable.from(iter(strings)).lastIndexOf('the', 5, 4)).to.be.equal(-1);
        });
    });

    describe("lastOrDefault(defaultValue)", () => {
        it("Returns the last element of a sequence, or a default value if the sequence contains no elements.", () => {
            const fruits = iter([]);
            const last = Literable.from(fruits).lastOrDefault('');

            expect(last).to.be.equal('');
        });
    });

    describe("lastOrDefault(predicate, defaultValue)", () => {
        it("Returns the last element of a sequence that satisfies a condition or a default value if no such element is found.", () => {
            const numbers = [49.6, 52.3, 51.0, 49.4, 50.2, 48.3];
            const last50 = Literable.from(iter(numbers)).lastOrDefault(n => Math.round(n) === 50, -1);
            const last40 = Literable.from(iter(numbers)).lastOrDefault(n => Math.round(n) === 40, -1);

            expect(last50).to.be.equal(50.2);
            expect(last40).to.be.equal(-1);
        });
    });

    describe("max()", () => {
        it("Returns the maximum value in a sequence of values.", () => {
            const longs = iter([4294967296, 466855135, 81125]);
            const max = Literable.from(longs).max();

            expect(max).to.be.equal(4294967296);
        });
    });

    describe("max(selector)", () => {
        it("Invokes a transform function on each element of a generic sequence and returns the maximum resulting value.", () => {
            const pets = iter([
                { name: 'Barley', age: 8 },
                { name: 'Boots', age: 4 },
                { name: 'Whiskers', age: 1 },
            ]);
            const max = Literable.from(pets).max(pet => pet.age + pet.name.length);

            expect(max).to.be.equal(14);
        });
    });

    describe("maxElement()", () => {
        it("Returns the maximum value in a sequence of values.", () => {
            const longs = iter([4294967296, 466855135, 81125]);
            const max = Literable.from(longs).maxElement();

            expect(max).to.be.equal(4294967296);
        });
    });

    describe("maxElement(selector)", () => {
        it("Invokes a transform function on each element of a generic sequence and returns the element with maximum resulting value.", () => {
            const pets = [
                { name: 'Barley', age: 8 },
                { name: 'Boots', age: 4 },
                { name: 'Whiskers', age: 1 },
            ];
            const max = Literable.from(iter(pets)).maxElement(pet => pet.age + pet.name.length);

            expect(max).to.be.equal(pets[0]);
        });
    });

    describe("min()", () => {
        it("Returns the minimum value in a sequence of values.", () => {
            const grades = iter([78, 92, 99, 37, 81]);
            const min = Literable.from(grades).min();

            expect(min).to.be.equal(37);
        });
    });

    describe("min(selector)", () => {
        it("Invokes a transform function on each element of a generic sequence and returns the minimum resulting value.", () => {
            const pets = iter([
                { name: 'Barley', age: 8 },
                { name: 'Boots', age: 4 },
                { name: 'Whiskers', age: 1 },
            ]);
            const max = Literable.from(pets).min(pet => pet.age);

            expect(max).to.be.equal(1);
        });
    });

    describe("minElement()", () => {
        it("Returns the minimum value in a sequence of values.", () => {
            const grades = iter([78, 92, 99, 37, 81]);
            const min = Literable.from(grades).minElement();

            expect(min).to.be.equal(37);
        });
    });

    describe("minElement(selector)", () => {
        it("Invokes a transform function on each element of a generic sequence and returns the element with minimum resulting value.", () => {
            const pets = [
                { name: 'Barley', age: 8 },
                { name: 'Boots', age: 4 },
                { name: 'Whiskers', age: 1 },
            ];
            const max = Literable.from(iter(pets)).minElement(pet => pet.age);

            expect(max).to.be.equal(pets[2]);
        });
    });

    describe("ofType(type)", () => {
        it("Filters the elements of an Literable based on a specified type.", () => {
            const fruits = ['mango', 'orange', 'apple', 3, 'banana'];
            const query1 = Literable.from(iter(fruits)).ofType(String);
            const query2 = Literable.from(iter(fruits)).ofType('number');

            expect([...query1]).to.be.deep.equal(['mango', 'orange', 'apple', 'banana']);
            expect([...query2]).to.be.deep.equal([3]);
        });

        it("Filters the elements of an Literable based on a specified type.", () => {
            const objects = iter([Literable.empty(), 3, 'banana', Literable.range(0, 2), []]);
            const query = Literable.from(objects).ofType(Literable);

            expect([...query].length).to.be.equal(2);
        });
    });

    describe("orderBy(keySelector)", () => {
        it("Sorts the elements of a sequence in ascending order according to a key.", () => {
            const pets = iter([
                { name: 'Barley', age: 8 },
                { name: 'Boots', age: 4 },
                { name: 'Whiskers', age: 1 },
            ]);
            const query = Literable.from(pets).orderBy(pet => pet.age);
            expect([...query]).to.be.deep.equal([
                { name: 'Whiskers', age: 1 },
                { name: 'Boots', age: 4 },
                { name: 'Barley', age: 8 },
            ]);
        });
    });

    describe("orderBy(keySelector, comparer)", () => {
        it("Sorts the elements of a sequence in ascending order by using a specified comparer.", () => {
            const pets = iter([
                { name: 'Barley', age: 8 },
                { name: 'Boots', age: 4 },
                { name: 'Whiskers', age: 1 },
            ]);
            const query = Literable.from(pets).orderBy(pet => pet.name, (a, b) => a.length - b.length);
            expect([...query]).to.be.deep.equal([
                { name: 'Boots', age: 4 },
                { name: 'Barley', age: 8 },
                { name: 'Whiskers', age: 1 },
            ]);
        });
    });

    describe("orderByDescending(keySelector)", () => {
        it("Sorts the elements of a sequence in descending order according to a key.", () => {
            const decimals = iter([6.2, 8.3, 0.5, 1.3, 6.3, 9.7]);
            const query = Literable.from(decimals).orderByDescending(x => x);

            expect([...query]).to.be.deep.equal([9.7, 8.3, 6.3, 6.2, 1.3, 0.5]);
        });
    });

    describe("orderByDescending(keySelector, comparer)", () => {
        it("Sorts the elements of a sequence in descending order by using a specified comparer.", () => {
            const fractPart = num => Math.round(10 * (num - Math.floor(num)));
            const compareFractionalPart = (a, b) => {
                const fractDiff = fractPart(a) - fractPart(b);
                return fractDiff === 0 ? a - b : fractDiff;
            };
            const decimals = iter([6.2, 8.3, 0.5, 1.3, 6.3, 9.7]);
            const query = Literable.from(decimals).orderByDescending(x => x, compareFractionalPart);

            expect([...query]).to.be.deep.equal([9.7, 0.5, 8.3, 6.3, 1.3, 6.2]);
        });
    });

    describe("prepend(...elements)", () => {
        it("Adds a value to the beginning of the sequence.", () => {
            const numbers = iter([1, 2, 3, 4]);
            const appended = Literable.from(numbers)
                .prepend(-2, -1, 0);

            expect([...appended])
                .to.be.deep.equal([-2, -1, 0, 1, 2, 3, 4]);
        });
    });

    describe("reverse()", () => {
        it("Inverts the order of the elements in a sequence.", () => {
            const apple = Literable.from('apple');
            const reversed = apple.reverse();

            expect([...reversed].join('')).to.be.equal('elppa');
        });
    });

    describe("select(selector)", () => {
        it("Projects each element of a sequence into a new form.", () => {
            const squares = Literable.range(1, 10).select(x => x * x);

            expect([...squares]).to.be.deep.equal([1, 4, 9, 16, 25, 36, 49, 64, 81, 100]);
        });

        it("Projects each element of a sequence into a new form by incorporating the element's index.", () => {
            const fruits = iter(['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape']);
            const query = Literable.from(fruits).select((fruit, index) => ({ index, fruit }));

            expect([...query]).to.be.deep.equal([
                { index: 0, fruit: 'apple' },
                { index: 1, fruit: 'banana' },
                { index: 2, fruit: 'mango' },
                { index: 3, fruit: 'orange' },
                { index: 4, fruit: 'passionfruit' },
                { index: 5, fruit: 'grape' },
            ]);
        });
    });

    describe("selectMany(collectionSelector)", () => {
        it("Projects each element of a sequence to an Literable and flattens the resulting sequences into one sequence.", () => {
            const petOwners = iter([
                { name: 'Higa, Sidney', pets: ['Scruffy', 'Sam'] },
                { name: 'Ashkenazi, Ronen', pets: ['Walker', 'Sugar'] },
                { name: 'Price, Vernette', pets: ['Scratches', 'Diesel'] },
                { name: 'Hines, Patrick', pets: ['Dusty'] },
            ]);
            const query = Literable.from(petOwners).selectMany(petOwner => petOwner.pets);

            expect([...query]).to.be.deep.equal(['Scruffy', 'Sam', 'Walker', 'Sugar', 'Scratches', 'Diesel', 'Dusty']);
        });

        it("Projects each element of a sequence to an Literable, and flattens the resulting sequences into one sequence. The index of each source element is used in the projected form of that element.", () => {
            const petOwners = iter([
                { name: 'Higa, Sidney', pets: ['Scruffy', 'Sam'] },
                { name: 'Ashkenazi, Ronen', pets: ['Walker', 'Sugar'] },
                { name: 'Price, Vernette', pets: ['Scratches', 'Diesel'] },
                { name: 'Hines, Patrick', pets: ['Dusty'] },
            ]);
            const query = Literable.from(petOwners)
                .selectMany((petOwner, index) => petOwner.pets.map(pet => `${index} ${pet}`));

            expect([...query]).to.be.deep.equal([
                '0 Scruffy',
                '0 Sam',
                '1 Walker',
                '1 Sugar',
                '2 Scratches',
                '2 Diesel',
                '3 Dusty',
            ]);
        });
    });

    describe("selectMany(collectionSelector, resultSelector)", () => {
        it("Projects each element of a sequence to an Literable, flattens the resulting sequences into one sequence, and invokes a result selector function on each element therein.", () => {
            const petOwners = iter([
                { name: 'Higa', pets: ['Scruffy', 'Sam'] },
                { name: 'Ashkenazi', pets: ['Walker', 'Sugar'] },
                { name: 'Price', pets: ['Scratches', 'Diesel'] },
                { name: 'Hines', pets: ['Dusty'] },
            ]);
            const query = Literable.from(petOwners)
                .selectMany(petOwner => petOwner.pets, (owner, pet) => ({ owner: owner.name, pet }))
                .where(ownerAndPet => ownerAndPet.pet.startsWith('S'));

            expect([...query]).to.be.deep.equal([
                { owner: 'Higa', pet: 'Scruffy' },
                { owner: 'Higa', pet: 'Sam' },
                { owner: 'Ashkenazi', pet: 'Sugar' },
                { owner: 'Price', pet: 'Scratches' },
            ]);
        });
    });

    describe("sequenceEqual(sequence)", () => {
        it("Determines whether two sequences are equal by comparing the elements by using the default equality comparer for their type.", () => {
            const pet1 = { name: 'Turbo', age: 2 };
            const pet2 = { name: 'Peanut', age: 8 };
            const pets1 = [pet1, pet2];
            const pets2 = [pet1, pet2];
            const pets3 = [
                { name: 'Turbo', age: 2 },
                { name: 'Peanut', age: 8 },
            ];
            const equal1 = Literable.from(iter(pets1)).sequenceEqual(iter(pets2));
            const equal2 = Literable.from(iter(pets1)).sequenceEqual(iter(pets3));

            expect(equal1).to.be.true;
            expect(equal2).to.be.false;
        });

        it("Other collection can be generator functions.", () => {
            const pet1 = { name: 'Turbo', age: 2 };
            const pet2 = { name: 'Peanut', age: 8 };
            const pets1 = [pet1, pet2];
            const pets2 = function* () {
                yield* [pet1, pet2];
            }
            const equal = Literable.from(iter(pets1)).sequenceEqual(pets2);

            expect(equal).to.be.true;
        });
    });

    describe("sequenceEqual(sequence, comparer)", () => {
        it("Determines whether two sequences are equal by comparing their elements by using a specified comparer.", () => {
            const storeA = iter([
                { name: 'apple', code: 9 },
                { name: 'orange', code: 4 },
            ]);
            const storeB = iter([
                { name: 'apple', code: 9 },
                { name: 'orange', code: 4 },
            ]);
            const comparer = (a, b) => a.name === b.name && a.code === b.code;
            const equal = Literable.from(storeA).sequenceEqual(storeB, comparer);

            expect(equal).to.be.true;
        });
    });

    describe("single()", () => {
        it("Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.", () => {
            const fruits1 = ['orange'];
            const fruits2 = ['orange', 'apple'];
            const fruit1 = Literable.from(iter(fruits1)).single();
            const fruit2 = () => Literable.from(iter(fruits2)).single();

            expect(fruit1).to.be.equal('orange');
            expect(fruit2)
                .to.throw();
        });
    });

    describe("single(predicate)", () => {
        it("Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than one such element exists.", () => {
            const fruits = ['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape'];
            const fruit1 = Literable.from(iter(fruits)).single(fruit => fruit.length > 10);
            const fruit2 = () => Literable.from(iter(fruits)).single(fruit => fruit.length > 15);

            expect(fruit1).to.be.equal('passionfruit');
            expect(fruit2)
                .to.throw();
        });
    });

    describe("singleOrDefault(defaultValue)", () => {
        it("Returns the only element of a sequence, or a default value if the sequence is empty; this method throws an exception if there is more than one element in the sequence.", () => {
            const fruits1 = iter(['orange']);
            const fruits2 = iter([]);
            const fruit1 = Literable.from(fruits1).singleOrDefault('No such string!');
            const fruit2 = Literable.from(fruits2).singleOrDefault('No such string!');

            expect(fruit1).to.be.equal('orange');
            expect(fruit2).to.be.equal('No such string!');
        });
    });

    describe("singleOrDefault(predicate, defaultValue)", () => {
        it("Returns the only element of a sequence that satisfies a specified condition or a default value if no such element exists; this method throws an exception if more than one element satisfies the condition.", () => {
            const fruits = ['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape'];
            const fruit1 = Literable.from(iter(fruits)).singleOrDefault(fruit => fruit.length > 10, 'No such string!');
            const fruit2 = Literable.from(iter(fruits)).singleOrDefault(fruit => fruit.length > 15, 'No such string!');

            expect(fruit1).to.be.equal('passionfruit');
            expect(fruit2).to.be.equal('No such string!');
        });
    });

    describe("skip(count)", () => {
        it("Bypasses a specified number of elements in a sequence and then returns the remaining elements.", () => {
            const grades = iter([59, 82, 70, 56, 92, 98, 85]);
            const lowerGrades = Literable.from(grades).skip(3);

            expect([...lowerGrades]).to.be.deep.equal([56, 92, 98, 85]);
        });
    });

    describe("skipLast(count)", () => {
        it("Bypasses a specified number of elements in the end of a sequence and then returns the remaining elements.", () => {
            const grades = iter([59, 82, 70, 56, 92, 98, 85]);
            const higherGrades = Literable.from(grades).skipLast(3);

            expect([...higherGrades]).to.be.deep.equal([59, 82, 70, 56]);
        });
    });

    describe("skipWhile(predicate)", () => {
        it("Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.", () => {
            const grades = iter([59, 82, 70, 56, 92, 98, 85]);
            const lowerGrades = Literable.from(grades)
                .orderByDescending(grade => grade)
                .skipWhile(grade => grade >= 80);

            expect([...lowerGrades]).to.be.deep.equal([70, 59, 56]);
        });

        it("Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements. The element's index is used in the logic of the predicate function.", () => {
            const amounts = iter([5000, 2500, 9000, 8000, 6500, 4000, 1500, 5500]);
            const query = Literable.from(amounts).skipWhile((amount, index) => amount > index * 1000);

            expect([...query]).to.be.deep.equal([4000, 1500, 5500]);
        });
    });

    describe("sum()", () => {
        it("Computes the sum of a sequence of numeric values.", () => {
            const points = iter([null, 0, 92.83, null, 100.0, 37.46, 81.1]);
            const sum = Literable.from(points).sum();

            expect(sum).to.be.equal(311.39);
        });
    });

    describe("sum(selector)", () => {
        it("Computes the sum of the sequence of values that are obtained by invoking a transform function on each element of the input sequence.", () => {
            const packages = iter([
                { company: 'Coho Vineyard', weight: 25.2 },
                { company: 'Lucerne Publishing', weight: 18.7 },
                { company: 'Wingtip Toys', weight: 6.0 },
                { company: 'Adventure Works', weight: 33.8 },
            ]);
            const totalWeight = Literable.from(packages).sum(pkg => pkg.weight);

            expect(totalWeight.toPrecision(3)).to.be.equal('83.7');
        });
    });

    describe("take(count)", () => {
        it("Returns a specified number of contiguous elements from the start of a sequence.", () => {
            const grades = iter([59, 82, 70, 56, 92, 98, 85]);
            const topThreeGrades = Literable.from(grades)
                .orderByDescending(grade => grade)
                .take(3);

            expect([...topThreeGrades]).to.be.deep.equal([98, 92, 85]);
        });
    });

    describe("takeLast(count)", () => {
        it("Returns a specified number of contiguous elements from the end of a sequence.", () => {
            const grades = iter([59, 82, 70, 56, 92, 98, 85]);
            const bottomThreeGrades = Literable.from(grades)
                .orderByDescending(grade => grade)
                .takeLast(3);

            expect([...bottomThreeGrades]).to.be.deep.equal([70, 59, 56]);
        });
    });

    describe("takeWhile(predicate)", () => {
        it("Returns elements from a sequence as long as a specified condition is true, and then skips the remaining elements.", () => {
            const fruits = iter(['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape']);
            query = Literable.from(fruits).takeWhile(fruit => fruit !== 'orange');

            expect([...query]).to.be.deep.equal(['apple', 'banana', 'mango']);
        });

        it("Returns elements from a sequence as long as a specified condition is true. The element's index is used in the logic of the predicate function.", () => {
            const fruits = iter(['apple', 'passionfruit', 'banana', 'mango', 'orange', 'blueberry', 'grape', 'strawberry']['apple', 'passionfruit', 'banana', 'mango', 'orange', 'blueberry']);
        });
    });

    describe("toArray()", () => {
        it("Creates an array from a Literable.", () => {
            const packages = iter([
                { company: 'Coho Vineyard', weight: 25.2 },
                { company: 'Lucerne Publishing', weight: 18.7 },
                { company: 'Wingtip Toys', weight: 6.0 },
                { company: 'Adventure Works', weight: 33.8 },
            ]);
            const companies = Literable.from(packages)
                .select(pkg => pkg.company)
                .toArray();

            expect(companies).to.be.deep.equal([
                'Coho Vineyard',
                'Lucerne Publishing',
                'Wingtip Toys',
                'Adventure Works',
            ]);
        });
    });

    describe("traverseBreadthFirst(childSelector)", () => {
        it("Traverse over elements exploring all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.", () => {
            const document = iter([{
                name: 'html',
                childs: [{
                    name: 'head',
                    childs: iter([{
                        name: 'title',
                        childs: [],
                    }]),
                }, {
                    name: 'body',
                    childs: [],
                }],
            }]);
            const nodes = Literable.from(document)
                .traverseBreadthFirst(node => node.childs)
                .select(node => node.name)
                .toArray();

            expect(nodes).to.be.deep.equal([
                'html',
                'head',
                'body',
                'title',
            ]);
        });
    });

    describe("traverseBreadthFirst(childSelector, resultSelector)", () => {
        it("Traverse over elements exploring all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level and invokes a result selector function on each element therein.", () => {
            const document = iter([{
                name: 'html',
                childs: [{
                    name: 'head',
                    childs: iter([{
                        name: 'title',
                        childs: [],
                    }]),
                }, {
                    name: 'body',
                    childs: [],
                }],
            }]);
            const nodes = Literable.from(document)
                .traverseBreadthFirst(node => node.childs, (node, level) => `${level} [${node.name}]`)
                .toArray();

            expect(nodes).to.be.deep.equal([
                '0 [html]',
                '1 [head]',
                '1 [body]',
                '2 [title]',
            ]);
        });
    });

    describe("traverseDepthFirst(childSelector)", () => {
        it("Traverse over elements exploring as far as possible along each branch before backtracking.", () => {
            const document = iter([{
                name: 'html',
                childs: [{
                    name: 'head',
                    childs: iter([{
                        name: 'title',
                        childs: [],
                    }]),
                }, {
                    name: 'body',
                    childs: [],
                }],
            }]);
            const nodes = Literable.from(document)
                .traverseDepthFirst(node => node.childs)
                .select(node => node.name)
                .toArray();

            expect(nodes).to.be.deep.equal([
                'html',
                'head',
                'title',
                'body',
            ]);
        });
    });

    describe("traverseDepthFirst(childSelector, resultSelector)", () => {
        it("Traverse over elements exploring as far as possible along each branch before backtracking and invokes a result selector function on each element therein.", () => {
            const document = iter([{
                name: 'html',
                childs: [{
                    name: 'head',
                    childs: iter([{
                        name: 'title',
                        childs: [],
                    }]),
                }, {
                    name: 'body',
                    childs: [],
                }],
            }]);
            const nodes = Literable.from(document)
                .traverseDepthFirst(node => node.childs, (node, level) => `${level} [${node.name}]`)
                .toArray();

            expect(nodes).to.be.deep.equal([
                '0 [html]',
                '1 [head]',
                '2 [title]',
                '1 [body]',
            ]);
        });
    });

    describe("union(sequence)", () => {
        it("Produces the set union of two sequences by using the default equality comparer.", () => {
            const ints1 = iter([5, 3, 9, 7, 5, 9, 3, 7]);
            const ints2 = iter([8, 3, 6, 4, 4, 9, 1, 0]);
            const union = Literable.from(ints1).union(ints2);

            expect([...union]).to.be.deep.equal([5, 3, 9, 7, 8, 6, 4, 1, 0]);
        });

        it("Other collection can be generator functions.", () => {
            const ints1 = iter([5, 3, 9, 7, 5, 9, 3, 7]);
            const ints2 = function* () { yield* [8, 3, 6, 4, 4, 9, 1, 0] };
            const union = Literable.from(ints1).union(ints2);

            expect([...union]).to.be.deep.equal([5, 3, 9, 7, 8, 6, 4, 1, 0]);
        });
    });

    describe("union(sequence, comparer)", () => {
        it("Produces the set union of two sequences by using a specified comparer.", () => {
            const store1 = iter([
                { name: "apple", code: 9 },
                { name: "orange", code: 4 },
            ]);
            const store2 = iter([
                { name: "apple", code: 9 },
                { name: "lemon", code: 12 },
            ]);
            const comparer = (a, b) => a.name === b.name && a.code === b.code;
            const union = Literable.from(store1).union(store2, comparer);

            expect([...union]).to.be.deep.equal([
                { name: "apple", code: 9 },
                { name: "orange", code: 4 },
                { name: "lemon", code: 12 },
            ]);
        });
    });

    describe("where(predicate)", () => {
        it("Filters a sequence of values based on a predicate.", () => {
            const fruits = iter(['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape']);
            const query = Literable.from(fruits).where(fruit => fruit.length < 6);

            expect([...query]).to.be.deep.equal(['apple', 'mango', 'grape']);
        });

        it("Filters a sequence of values based on a predicate. Each element's index is used in the logic of the predicate function.", () => {
            const numbers = iter([0, 30, 20, 15, 90, 85, 40, 75]);
            const query = Literable.from(numbers).where((number, index) => number <= index * 10);

            expect([...query]).to.be.deep.equal([0, 20, 15, 40]);
        });
    });

    describe("zip(sequence, selector)", () => {
        it("Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.", () => {
            const numbers = iter([1, 2, 3, 4]);
            const words = iter(['one', 'two', 'three']);

            const numbersAndWords = Literable.from(numbers).zip(words, (first, second) => `${first} ${second}`);

            expect([...numbersAndWords]).to.be.deep.equal([
                '1 one',
                '2 two',
                '3 three',
            ]);
        });

        it("Other collection can be generator functions.", () => {
            const numbers = iter([1, 2, 3, 4]);
            const words = function* () { yield* ['one', 'two', 'three']; };

            const numbersAndWords = Literable.from(numbers).zip(words, (first, second) => `${first} ${second}`);

            expect([...numbersAndWords]).to.be.deep.equal([
                '1 one',
                '2 two',
                '3 three',
            ]);
        });
    });
});
