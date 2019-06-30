## [literable].selectMany
Projects each element of a sequence to a `Literable` and flattens the resulting sequences into one sequence.

#### Overloads
* [selectMany(collectionSelector)](#[selectMany(collectionSelector)): Projects each element of a sequence to a `Literable` and flattens the resulting sequences into one sequence.
* [selectMany(collectionSelector, resultSelector)](#[selectMany(collectionSelector,-resultSelector)): Projects each element of a sequence to a `Literable`, flattens the resulting sequences into one sequence, and invokes a result selector function on each element therein.

### selectMany(collectionSelector)
Projects each element of a sequence to a `Literable` and flattens the resulting sequences into one sequence.

#### Parameters
* **collectionSelector**: A transform function to apply to each element.
* **result**: A new `Literable` whose elements are the result of invoking the one-to-many transform function on each element of the input sequence.

#### Examples
The following code example demonstrates how to use SelectMany to perform a one-to-many projection over an array.

```javascript
const Literable = require('literable');

const petOwners = Literable.from([
    { name: 'Higa, Sidney', pets: ['Scruffy', 'Sam'] },
    { name: 'Ashkenazi, Ronen', pets: ['Walker', 'Sugar'] },
    { name: 'Price, Vernette', pets: ['Scratches', 'Diesel'] },
    { name: 'Hines, Patrick', pets: ['Dusty'] },
]);

// Query using selectMany().
const query1 = petOwners.selectMany(petOwner => petOwner.pets);

console.log('Using selectMany():');
console.log(query1.toArray());

// Query using select().
const query2 = petOwners.select(petOwner => petOwner.pets);

console.log('Using select():');
console.log(query2.toArray());

// This code produces the following output:
//
// Using selectMany():
// [ 'Scruffy',
//   'Sam',
//   'Walker',
//   'Sugar',
//   'Scratches',
//   'Diesel',
//   'Dusty' ]
// Using select():
// [ [ 'Scruffy', 'Sam' ],
//   [ 'Walker', 'Sugar' ],
//   [ 'Scratches', 'Diesel' ],
//   [ 'Dusty' ] ]
```

### selectMany(collectionSelector, resultSelector)
Projects each element of a sequence to a `Literable`, flattens the resulting sequences into one sequence, and invokes a result selector function on each element therein.

#### Parameters
* **collectionSelector**: A transform function to apply to each element.
* **resultSelector**: A transform function to apply to each element of the intermediate sequence.
* **result**: A new `Literable` whose elements are the result of invoking the one-to-many transform function `collectionSelector` on each element of source and then mapping each of those sequence elements and their corresponding source element to a result element.

#### Examples
he following code example demonstrates how to use SelectMany to perform a one-to-many projection over an array and use a result selector function to keep each corresponding element from the source sequence in scope for the final call to Select.

```javascript
const Literable = require('literable');

const petOwners = Literable.from([
    { name: 'Higa, Sidney', pets: ['Scruffy', 'Sam'] },
    { name: 'Ashkenazi, Ronen', pets: ['Walker', 'Sugar'] },
    { name: 'Price, Vernette', pets: ['Scratches', 'Diesel'] },
    { name: 'Hines, Patrick', pets: ['Dusty'] },
]);

const query = Literable.from(petOwners)
    .selectMany(petOwner => petOwner.pets, (owner, pet) => ({ owner: owner.name, pet }))
    .where(ownerAndPet => ownerAndPet.pet.startsWith('S'));

for (let obj of query) {
    console.log(obj)
}

// This code produces the following output:
//
// { name: 'Higa, Sidney', pets: [ 'Scruffy', 'Sam' ] }
// { name: 'Ashkenazi, Ronen', pets: [ 'Walker', 'Sugar' ] }
// { name: 'Price, Vernette', pets: [ 'Scratches', 'Diesel' ] }
// { name: 'Hines, Patrick', pets: [ 'Dusty' ] }
```
