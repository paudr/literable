const chai = require('chai');
const { expect } = chai;

describe("LiterableArray", () => {
    const Literable = require('../literable.js');

    describe("count()", () => {
        it("Returns the number of elements in a sequence.", () => {
            const fruits = ['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape'];
            const numberOfFruits = Literable.from(fruits).count();

            expect(numberOfFruits).to.be.equal(6);
        });
    });

    describe("count(comparer)", () => {
        it("Returns a number that represents how many elements in the specified sequence satisfy a condition.", () => {
            const pets = [
                { name: 'Barley', vaccinated: true },
                { name: 'Boots', vaccinated: false },
                { name: 'Whiskers', vaccinated: false },
            ];
            const numberUnvaccinated = Literable.from(pets)
                .count(pet => pet.vaccinated === false);

            expect(numberUnvaccinated).to.be.equal(2);
        });
    });

    describe("defaultIfEmpty(defaultValue)", () => {
        it("Returns the elements of the specified sequence or the specified value in a singleton collection if the sequence is empty.", () => {
            const defaultPet = { name: 'Default Pet', age: 0 };
            const pets = [
                { name: 'Barley', age: 8 },
                { name: 'Boots', age: 4 },
                { name: 'Whiskers', age: 1 },
            ];

            const petsMock = chai.spy();
            const emptyMock = chai.spy();

            for (pet of Literable.from(pets).defaultIfEmpty(defaultPet)) {
                petsMock(pet.name);
            }
            for (pet of Literable.from([]).defaultIfEmpty(defaultPet)) {
                emptyMock(pet.name);
            }

            expect(petsMock).to.have.been.first.called.with('Barley');
            expect(petsMock).to.have.been.called.exactly(3);
            expect(emptyMock).to.have.been.first.called.with('Default Pet');
            expect(emptyMock).to.have.been.called.once;
        });
    });

    describe("elementAt(index)", () => {
        it("Returns the element at a specified index in a sequence.", () => {
            const names = ['Hartono, Tommy', 'Adams, Terry', 'Andersen, Henriette Thaulow', 'Hedlund, Magnus', 'Ito, Shu'];
            const name = Literable.from(names).elementAt(4);

            expect(name).to.be.equal('Ito, Shu');
        });
    });

    describe("elementAtOrDefault(index, defaultValue)", () => {
        it("Returns the element at a specified index in a sequence or a default value if the index is out of range.", () => {
            const names = ['Hartono, Tommy', 'Adams, Terry', 'Andersen, Henriette Thaulow', 'Hedlund, Magnus', 'Ito, Shu'];
            const name = Literable.from(names).elementAtOrDefault(20, '');

            expect(name).to.be.equal('');
        });
    });

    describe("findLastIndex(predicate)", () => {
        it("Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the entire sequence.", () => {
            const dinosaurs = Literable.from(['Compsognathus', 'Amargasaurus', 'Oviraptor', 'Velociraptor', 'Deinonychus', 'Dilophosaurus', 'Gallimimus', 'Triceratops']);
            const endsWithSaurus = name => name.endsWith('saurus');

            expect(dinosaurs.findLastIndex(endsWithSaurus)).to.be.equal(5);
        });
    });

    describe("findLastIndex(predicate, startIndex)", () => {
        it("Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the range of elements in the sequence that extends from the first element to the specified index.", () => {
            const dinosaurs = ['Compsognathus', 'Amargasaurus', 'Oviraptor', 'Velociraptor', 'Deinonychus', 'Dilophosaurus', 'Gallimimus', 'Triceratops'];
            const endsWithSaurus = name => name.endsWith('saurus');

            expect(Literable.from(dinosaurs).findLastIndex(endsWithSaurus)).to.be.equal(5);
            expect(Literable.from(dinosaurs).findLastIndex(endsWithSaurus, 4)).to.be.equal(1);
            expect(Literable.from(dinosaurs).findLastIndex(endsWithSaurus, 0)).to.be.equal(-1);
        });
    });

    describe("findLastIndex(predicate, startIndex, count)", () => {
        it("Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the range of elements in the sequence that contains the specified number of elements and ends at the specified index.", () => {
            const dinosaurs = ['Compsognathus', 'Amargasaurus', 'Oviraptor', 'Velociraptor', 'Deinonychus', 'Dilophosaurus', 'Gallimimus', 'Triceratops'];
            const endsWithSaurus = name => name.endsWith('saurus');

            expect(Literable.from(dinosaurs).findLastIndex(endsWithSaurus)).to.be.equal(5);
            expect(Literable.from(dinosaurs).findLastIndex(endsWithSaurus, 4)).to.be.equal(1);
            expect(Literable.from(dinosaurs).findLastIndex(endsWithSaurus, 4, 3)).to.be.equal(-1);
            expect(Literable.from(dinosaurs).findLastIndex(endsWithSaurus, 4, 4)).to.be.equal(1);
        });
    });

    describe("last()", () => {
        it("Returns the last element of a sequence.", () => {
            const numbers = [9, 34, 65, 92, 87, 435, 3, 54, 83, 23, 87, 67, 12, 19];
            const last = Literable.from(numbers).last();

            expect(last).to.be.equal(19);
        });
    });

    describe("last(predicate)", () => {
        it("Returns the last element of a sequence that satisfies a specified condition.", () => {
            const numbers = [9, 34, 65, 92, 87, 435, 3, 54, 83, 23, 87, 67, 12, 19];
            const last = Literable.from(numbers).last(num => num > 80);

            expect(last).to.be.equal(87);
        });
    });

    describe("lastIndexOf(element)", () => {
        it("Returns the index of the last occurrence of a value in a sequence.", () => {
            const strings = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', 'in', 'the', 'barn'];

            expect(Literable.from(strings).lastIndexOf('the')).to.be.equal(10);
            expect(Literable.from(strings).lastIndexOf('jumps')).to.be.equal(4);
        });
    });

    describe("lastIndexOf(element, index)", () => {
        it("Searches for the specified object and returns the index of the last occurrence within the range of elements in a sequence extends from the first element to the specified index.", () => {
            const strings = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', 'in', 'the', 'barn'];

            expect(Literable.from(strings).lastIndexOf('the')).to.be.equal(10);
            expect(Literable.from(strings).lastIndexOf('the', 8)).to.be.equal(6);
        });
    });

    describe("lastIndexOf(element, index, count)", () => {
        it("Searches for the specified object and returns the index of the last occurrence within the range of elements in the sequences that contains the specified number of elements and ends at the specified index.", () => {
            const strings = ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', 'in', 'the', 'barn'];

            expect(Literable.from(strings).lastIndexOf('the')).to.be.equal(10);
            expect(Literable.from(strings).lastIndexOf('the', 8)).to.be.equal(6);
            expect(Literable.from(strings).lastIndexOf('the', 5, 6)).to.be.equal(0);
            expect(Literable.from(strings).lastIndexOf('the', 10, 6)).to.be.equal(10);
            expect(Literable.from(strings).lastIndexOf('the', 5, 4)).to.be.equal(-1);
        });
    });

    describe("lastOrDefault(defaultValue)", () => {
        it("Returns the last element of a sequence, or a default value if the sequence contains no elements.", () => {
            const fruits1 = ['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape'];
            const fruits2 = [];
            const last1 = Literable.from(fruits1).lastOrDefault('');
            const last2 = Literable.from(fruits2).lastOrDefault('');

            expect(last1).to.be.equal('grape');
            expect(last2).to.be.equal('');
        });
    });

    describe("lastOrDefault(predicate, defaultValue)", () => {
        it("Returns the last element of a sequence that satisfies a condition or a default value if no such element is found.", () => {
            const numbers = [49.6, 52.3, 51.0, 49.4, 50.2, 48.3];
            const last50 = Literable.from(numbers).lastOrDefault(n => Math.round(n) === 50, -1);
            const last40 = Literable.from(numbers).lastOrDefault(n => Math.round(n) === 40, -1);

            expect(last50).to.be.equal(50.2);
            expect(last40).to.be.equal(-1);
        });
    });

    describe("reverse()", () => {
        it("Inverts the order of the elements in a sequence.", () => {
            const apple = Literable.from(['a', 'p', 'p', 'l', 'e']);
            const reversed = apple.reverse();

            expect([...reversed].join('')).to.be.equal('elppa');
        });
    });

    describe("skip(count)", () => {
        it("Bypasses a specified number of elements in a sequence and then returns the remaining elements.", () => {
            const grades = [59, 82, 70, 56, 92, 98, 85];
            const lowerGrades = Literable.from(grades).skip(3);

            expect([...lowerGrades]).to.be.deep.equal([56, 92, 98, 85]);
        });
    });

    describe("skipLast(count)", () => {
        it("Bypasses a specified number of elements in the end of a sequence and then returns the remaining elements.", () => {
            const grades = [59, 82, 70, 56, 92, 98, 85];
            const higherGrades = Literable.from(grades).skipLast(3);

            expect([...higherGrades]).to.be.deep.equal([59, 82, 70, 56]);
        });
    });

    describe("takeLast(count)", () => {
        it("Returns a specified number of contiguous elements from the end of a sequence.", () => {
            const grades = [59, 82, 70, 56, 92, 98, 85];
            const bottomThreeGrades = Literable.from(grades)
                .orderByDescending(grade => grade)
                .takeLast(3);

            expect([...bottomThreeGrades]).to.be.deep.equal([70, 59, 56]);
        });
    });
});
