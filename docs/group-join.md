## [literable].groupJoin
Correlates the elements of two sequences based on key equality, and groups the results.

#### Overloads
* [groupJoin(sequence, keySelector, sequenceKeySelector)](#[groupJoin(sequence,-keySelector,-sequenceKeySelector)): Correlates the elements of two sequences based on equality of keys and groups the results.
* [groupJoin(sequence, keySelector, sequenceKeySelector, resultSelector)](#[groupJoin(sequence,-keySelector,-sequenceKeySelector,-resultSelector)): Correlates the elements of two sequences based on equality of keys and groups the results.
* [groupJoin(sequence, keySelector, sequenceKeySelector, resultSelector, comparer)](#[groupJoin(sequence,-keySelector,-sequenceKeySelector,-resultSelector,-comparer)): Correlates the elements of two sequences based on key equality and groups the results. A specified function is used to compare keys.

### groupJoin(sequence, keySelector, sequenceKeySelector)
Correlates the elements of two sequences based on equality of keys and groups the results.

#### Parameters
* **sequence**: The sequence to join to the `Literable` sequence.
* **keySelector**: A function to extract the join key from each element of the `Literable`.
* **sequenceKeySelector**: A function to extract the join key from each element of the sequence.
* **result**: A new `Literable` that contains elements that are obtained by performing a grouped join on two sequences.

#### Examples
Correlates the elements of two sequences based on key equality and groups the results. A specified function is used to compare keys.


```javascript
const Literable = require('literable');

const people = Literable.from([
    { name: 'Hedlund, Magnus' },
    { name: 'Adams, Terry' },
    { name: 'Weiss, Charlotte' },
]);
const pets = Literable.from([
    { name: 'Barley', owner: 'Adams, Terry' },
    { name: 'Boots', owner: 'Adams, Terry' },
    { name: 'Whiskers', owner: 'Weiss, Charlotte' },
    { name: 'Daisy', owner: 'Hedlund, Magnus' },
]);
const query = people.groupJoin(
    pets,
    person => person.name,
    pet => pet.owner,
).forEach((element) => {
    console.log(`Owner: ${element.key.name}`);
    element.value.forEach(pet => console.log(`  - ${pet.name}`));
});

/*
 This code produces the following output:

 Owner: Hedlund, Magnus
   - Daisy
 Owner: Adams, Terry
   - Barley
   - Boots
 Owner: Weiss, Charlotte
   - Whiskers
*/
```

### groupJoin(sequence, keySelector, sequenceKeySelector, resultSelector)
Correlates the elements of two sequences based on equality of keys and groups the results.

#### Parameters
* **sequence**: The sequence to join to the `Literable` sequence.
* **keySelector**: A function to extract the join key from each element of the `Literable`.
* **sequenceKeySelector**: A function to extract the join key from each element of the sequence.
* **resultSelector**: A function to create a result element from an element from the first sequence and a collection of matching elements from the second sequence.
* **result**: A new `Literable` that contains elements that are obtained by performing a grouped join on two sequences.

#### Examples
Correlates the elements of two sequences based on key equality and groups the results. A specified function is used to compare keys.


```javascript
const Literable = require('literable');

const people = Literable.from([
    { name: 'Hedlund, Magnus' },
    { name: 'Adams, Terry' },
    { name: 'Weiss, Charlotte' },
]);
const pets = Literable.from([
    { name: 'Barley', owner: 'Adams, Terry' },
    { name: 'Boots', owner: 'Adams, Terry' },
    { name: 'Whiskers', owner: 'Weiss, Charlotte' },
    { name: 'Daisy', owner: 'Hedlund, Magnus' },
]);
const query = people.groupJoin(
    pets,
    person => person.name,
    pet => pet.owner,
    (owner, pets) => ({
        ownerName: owner.name,
        pets: pets.map(pet => pet.name),
    })
).forEach((element) => {
    console.log(`Owner: ${element.ownerName}`);
    element.pets.forEach(pet => console.log(`  - ${pet}`));
});

/*
 This code produces the following output:

 Owner: Hedlund, Magnus
   - Daisy
 Owner: Adams, Terry
   - Barley
   - Boots
 Owner: Weiss, Charlotte
   - Whiskers
*/
```

### groupJoin(sequence, keySelector, sequenceKeySelector, resultSelector, comparer)
Correlates the elements of two sequences based on key equality and groups the results. A specified function is used to compare keys.

#### Parameters
* **sequence**: The sequence to join to the `Literable` sequence.
* **keySelector**: A function to extract the join key from each element of the `Literable`.
* **sequenceKeySelector**: A function to extract the join key from each element of the sequence.
* **resultSelector**: A function to create a result element from an element from the first sequence and a collection of matching elements from the second sequence.
* **comparer**: A function to hash and compare keys.
* **result**: A new `Literable` that contains elements that are obtained by performing a grouped join on two sequences.

#### Examples
The following code example demonstrates how to use GroupJoin to perform a grouped join on two sequences.

```javascript
const Literable = require('literable');

const people = Literable.from([
    { name: 'Hedlund, Magnus' },
    { name: 'Adams, Terry' },
    { name: 'Weiss, Charlotte' },
]);
const pets = Literable.from([
    { name: 'Barley', owner: 'Adams, Terry' },
    { name: 'Boots', owner: 'Adams, Terry' },
    { name: 'Whiskers', owner: 'Weiss, Charlotte' },
    { name: 'Daisy', owner: 'Hedlund, Magnus' },
]);
const query = people.groupJoin(
    pets,
    person => person.name,
    pet => pet.owner,
    (owner, pets) => ({
        ownerName: owner.name,
        pets: pets.map(pet => pet.name),
    }),
    (a, b) => a.indexOf(',') === b.indexOf(',')
).forEach((element) => {
    console.log(`Owner: ${element.ownerName}`);
    element.pets.forEach(pet => console.log(`  - ${pet}`));
});

/*
 This code produces the following output:

 Owner: Hedlund, Magnus
   - Daisy
 Owner: Adams, Terry
   - Barley
   - Boots
   - Whiskers
 Owner: Weiss, Charlotte
   - Barley
   - Boots
   - Whiskers
*/
```
