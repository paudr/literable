## [literable].join
Correlates the elements of two sequences based on matching keys.

#### Overloads
* [join(sequence, keySelector, sequenceKeySelector)](#[join(sequence,-keySelector,-sequenceKeySelector)): Correlates the elements of two sequences based on matching keys.
* [join(sequence, keySelector, sequenceKeySelector, resultSelector)](#[join(sequence,-keySelector,-sequenceKeySelector,-resultSelector)): Correlates the elements of two sequences based on matching keys. A specified function is used to create a return element.
* [join(sequence, keySelector, sequenceKeySelector, resultSelector, comparer)](#[join(sequence,-keySelector,-sequenceKeySelector,-resultSelector,-comparer)): Correlates the elements of two sequences based on matching keys. A specified function is used to create a return element. A specified function is used to compare keys.

### join(sequence, keySelector, sequenceKeySelector)
Correlates the elements of two sequences based on matching keys.

#### Parameters
* **sequence**: The sequence to join to the `Literable`.
* **keySelector**: A function to extract the join key from each element of the `Literable`.
* **sequenceKeySelector**: A function to extract the join key from each element of the sequence.
* **result**: A `Literable` that contains the elements that form the set intersection of two sequences.

#### Examples
The following code example demonstrates how to use Join to perform a join on two sequences.

```javascript
const Literable = require('literable');

const people = [
    { name: 'Hedlund, Magnus' },
    { name: 'Adams, Terry' },
    { name: 'Weiss, Charlotte' },
];
const pets = [
    { name: 'Barley', owner: 'Adams, Terry' },
    { name: 'Boots', owner: 'Adams, Terry' },
    { name: 'Whiskers', owner: 'Weiss, Charlotte' },
    { name: 'Daisy', owner: 'Hedlund, Magnus' },
];
const query = Literable.from(people).join(
    pets,
    person => person.name,
    pet => pet.owner
);

for (let element of query) {
    console.log(`${element.key.name} - ${element.value.name}`);
}

/*
 This code produces the following output:

 Hedlund, Magnus - Daisy
 Adams, Terry - Barley
 Adams, Terry - Boots
 Weiss, Charlotte - Whiskers
*/
```

### join(sequence, keySelector, sequenceKeySelector, resultSelector)
Correlates the elements of two sequences based on matching keys. A specified function is used to create a return element.

#### Parameters
* **sequence**: The sequence to join to the `Literable`.
* **keySelector**: A function to extract the join key from each element of the `Literable`.
* **sequenceKeySelector**: A function to extract the join key from each element of the sequence.
* **resultSelector**: A function to create a result element from two matching elements.
* **result**: A `Literable` that contains the elements that form the set intersection of two sequences.

#### Examples
The following code example demonstrates how to use Join to perform a join on two sequences.

```javascript
const Literable = require('literable');

const people = [
    { name: 'Hedlund, Magnus' },
    { name: 'Adams, Terry' },
    { name: 'Weiss, Charlotte' },
];
const pets = [
    { name: 'Barley', owner: 'Adams, Terry' },
    { name: 'Boots', owner: 'Adams, Terry' },
    { name: 'Whiskers', owner: 'Weiss, Charlotte' },
    { name: 'Daisy', owner: 'Hedlund, Magnus' },
];
const query = Literable.from(people).join(
    pets,
    person => person.name,
    pet => pet.owner,
    (person, pet) => ({
        owner: person.name,
        pet: pet.name,
    })
);

for (let element of query) {
    console.log(`${element.owner} - ${element.pet}`);
}

/*
 This code produces the following output:

 Hedlund, Magnus - Daisy
 Adams, Terry - Barley
 Adams, Terry - Boots
 Weiss, Charlotte - Whiskers
*/
```

### join(sequence, keySelector, sequenceKeySelector, resultSelector, comparer)
Correlates the elements of two sequences based on matching keys. A specified function is used to create a return element. A specified function is used to compare keys.

#### Parameters
* **sequence**: The sequence to join to the `Literable`.
* **keySelector**: A function to extract the join key from each element of the `Literable`.
* **sequenceKeySelector**: A function to extract the join key from each element of the sequence.
* **resultSelector**: A function to create a result element from two matching elements.
* **comparer**: A function to compare keys.
* **result**: A `Literable` that contains the elements that form the set intersection of two sequences.

#### Examples
The following code example demonstrates how to use Join to perform a join on two sequences.

```javascript
const Literable = require('literable');

const people = [
    { name: 'Hedlund, Magnus' },
    { name: 'Adams, Terry' },
    { name: 'Weiss, Charlotte' },
];
const pets = [
    { name: 'Barley', owner: 'Adams, Terry' },
    { name: 'Boots', owner: 'Adams, Terry' },
    { name: 'Whiskers', owner: 'Weiss, Charlotte' },
    { name: 'Daisy', owner: 'Hedlund, Magnus' },
];
const query = Literable.from(people).join(
    pets,
    person => person.name,
    pet => pet.owner,
    (person, pet) => ({
        owner: `${person.name} (${person.name.indexOf(',')})`,
        pet: pet.name,
    }),
    (a, b) => a.indexOf(',') === b.indexOf(',')
);

for (let element of query) {
    console.log(`${element.owner} - ${element.pet}`);
}

/*
 This code produces the following output:

Hedlund, Magnus (7) - Daisy
Adams, Terry (5) - Barley
Adams, Terry (5) - Boots
Adams, Terry (5) - Whiskers
Weiss, Charlotte (5) - Barley
Weiss, Charlotte (5) - Boots
Weiss, Charlotte (5) - Whiskers
*/
```
