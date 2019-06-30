## [literable].any
Determines whether any element of a sequence exists or satisfies a condition.

#### Overloads
* [any()](#[any()): Determines whether a sequence contains any elements.
* [any(predicate)](#[any(predicate)): Determines whether any element of a sequence satisfies a condition.

### any()
Determines whether a sequence contains any elements.

#### Parameters
* **result**: `true` if the source sequence contains any elements; otherwise, `false`.

#### Examples
The following code examples demonstrates how to use Any to determine whether a sequence contains any elements.

```javascript
const Literable = require('literable');

const numbers = [1, 2];
const hasElements = Literable.from(numbers).any();

console.log(`The list ${hasElements ? 'is not' : 'is'} empty.`);

// This code produces the following output:
//
// The list is not empty.
```

```javascript
const Literable = require('literable');

const people = [{
    lastName: 'Haas',
    pets: [
        { name: 'Barley', age: 10 },
        { name: 'Boots', age: 14 },
        { name: 'Whiskers', age: 6 },
    ]
}, {
    lastName: 'Fakhouri',
    pets: [
        { name: 'Snowball', age: 1 },
    ]
}, {
    lastName: 'Antebi',
    pets: []
}, {
    lastName: 'Philips',
    pets: [
        { name: 'Sweetie', age: 2 },
        { name: 'Rover', age: 13 },
    ]
}];

// Determine which people have a non-empty Pet array.
const names = people
    .filter(person => Literable.from(person.pets).any())
    .map(person => person.lastName);

console.log(names);
/* This code produces the following output:
[    
    'Haas',
    'Fakhouri',
    'Philips'
]
*/
```

### any(predicate)
Determines whether any element of a sequence satisfies a condition.

#### Parameters
* **predicate**: A function to test each element for a condition.
* **result**: `true` if any elements in the source sequence pass the test in the specified predicate; otherwise, `false`.

#### Examples
The following code example demonstrates how to use Any to determine whether any element in a sequence satisfies a condition.

```javascript
const Literable = require('literable');

// Create an array of Pets.
const pets = [
    { name: 'Barley', age: 8, vaccinated: true },
    { name: 'Boots', age: 4, vaccinated: false },
    { name: 'Whiskers', age: 1, vaccinated: false },
];

// Determine whether any pets over age 1 are also unvaccinated.
const unvaccinated = Literable.from(pets)
    .any(pet => pet.age > 1 && !pet.vaccinated);

console.log(`There ${unvaccinated ? 'are' : 'are not any'} unvaccinated animals over age one.`);

// This code produces the following output:
//
//  There are unvaccinated animals over age one.
```
