## [literable].groupBy
Groups the elements of a sequence.

#### Overloads
* [groupBy(keySelector)](#[groupBy(keySelector)): Groups the elements of a sequence according to a specified key selector function.
* [groupBy(keySelector, elementSelector)](#[groupBy(keySelector,-elementSelector)): Groups the elements of a sequence according to a specified key selector function and projects the elements for each group by using a specified function.
* [groupBy(keySelector, elementSelector, resultSelector)](#[groupBy(keySelector,-elementSelector,-resultSelector)): Groups the elements of a sequence according to a specified key selector function and creates a result value from each group and its key. The elements of each group are projected by using a specified function.
* [groupBy(keySelector, elementSelector, resultSelector, comparer)](#[groupBy(keySelector,-elementSelector,-resultSelector,-comparer)): Groups the elements of a sequence according to a specified key selector function and creates a result value from each group and its key. Key values are compared by using a specified comparer, and the elements of each group are projected by using a specified function.

### groupBy(keySelector)
Groups the elements of a sequence according to a specified key selector function.

#### Parameters
* **keySelector**: A function to extract the key for each element.
* **result**: A `Literable` where each element contains a sequence of objects and a key.

#### Examples
The following code example demonstrates how to use GroupBy.

```javascript
const Literable = require('literable');

const petsList = Literable.from([
    { name: 'Barley', age: 8.3 },
    { name: 'Boots', age: 4.9 },
    { name: 'Whiskers', age: 1.5 },
    { name: 'Daisy', age: 4.3 },
]);

const query = Literable.from(petsList).groupBy(pet => Math.floor(pet.age));

for (let element of query) {
    console.log(` * Key: ${element.key}`);
    element.value.forEach(value => console.log(`  -> ${value.name} has ${value.age} years`));
}

/*
 This code produces the following output:

  * Key: 8
   -> Barley has 8.3 years
  * Key: 4
   -> Boots has 4.9 years
   -> Daisy has 4.3 years
  * Key: 1
   -> Whiskers has 1.5 years
*/
```

### groupBy(keySelector, elementSelector)
Groups the elements of a sequence according to a specified key selector function and projects the elements for each group by using a specified function.

#### Parameters
* **keySelector**: A function to extract the key for each element.
* **elementSelector**: A function to map each source element to an element in the group.
* **result**: A `Literable` where each element contains a sequence of objects and a key.

#### Examples
The following code example demonstrates how to use GroupBy.

```javascript
const Literable = require('literable');

const petsList = Literable.from([
    { name: 'Barley', age: 8.3 },
    { name: 'Boots', age: 4.9 },
    { name: 'Whiskers', age: 1.5 },
    { name: 'Daisy', age: 4.3 },
]);

const query = Literable.from(petsList).groupBy(
    pet => Math.floor(pet.age),
    pet => pet.name,
);

for (let element of query) {
    console.log(element);
}

/*
 This code produces the following output:

 { key: 8, value: [ 'Barley' ] }
 { key: 4, value: [ 'Boots', 'Daisy' ] }
 { key: 1, value: [ 'Whiskers' ] }
*/
```

### groupBy(keySelector, elementSelector, resultSelector)
Groups the elements of a sequence according to a specified key selector function and creates a result value from each group and its key. The elements of each group are projected by using a specified function.

#### Parameters
* **keySelector**: A function to extract the key for each element.
* **elementSelector**: A function to map each source element to an element in the group.
* **resultSelector**: A function to create a result value from each group.
* **result**: A `Literable` where each element contains a sequence of objects and a key.

#### Examples
The following code example demonstrates how to use GroupBy.

```javascript
const Literable = require('literable');

const petsList = Literable.from([
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
    }),
);

for (let element of query) {
    console.log(`Age group: ${element.key}`);
    console.log(`Number of pets in this age group: ${element.count}`);
    console.log(`Minimum age: ${element.min}`);
    console.log(`Maximum age: ${element.max}`);
    console.log('');
}

/*
 This code produces the following output:

 Age group: 8
 Number of pets in this age group: 1
 Minimum age: 8.3
 Maximum age: 8.3

 Age group: 4
 Number of pets in this age group: 2
 Minimum age: 4.3
 Maximum age: 4.9

 Age group: 1
 Number of pets in this age group: 1
 Minimum age: 1.5
 Maximum age: 1.5

*/
```

### groupBy(keySelector, elementSelector, resultSelector, comparer)
Groups the elements of a sequence according to a specified key selector function and creates a result value from each group and its key. Key values are compared by using a specified comparer, and the elements of each group are projected by using a specified function.

#### Parameters
* **keySelector**: A function to extract the key for each element.
* **elementSelector**: A function to map each source element to an element in the group.
* **resultSelector**: A function to create a result value from each group.
* **comparer**: An function to compare keys with.
* **result**: A `Literable` where each element contains a sequence of objects and a key.

#### Examples
The following code example demonstrates how to use GroupBy.

```javascript
const Literable = require('literable');

const petsList = Literable.from([
    { name: 'Barley', age: 8.3 },
    { name: 'Boots', age: 4.9 },
    { name: 'Whiskers', age: 1.5 },
    { name: 'Daisy', age: 4.3 },
]);

const query = Literable.from(petsList).groupBy(
    pet => pet.age,
    pet => pet,
    (age, pets) => ({
        key: age,
        count: pets.length,
        min: Literable.from(pets).min(pet => pet.age),
        max: Literable.from(pets).max(pet => pet.age),
    }),
    (a, b) => Math.floor(a) === Math.floor(b),
);

for (let element of query) {
    console.log(`Age group: ${element.key}`);
    console.log(`Number of pets in this age group: ${element.count}`);
    console.log(`Minimum age: ${element.min}`);
    console.log(`Maximum age: ${element.max}`);
    console.log('');
}

/*
 This code produces the following output:

 Age group: 8.3
 Number of pets in this age group: 1
 Minimum age: 8.3
 Maximum age: 8.3

 Age group: 4.9
 Number of pets in this age group: 2
 Minimum age: 4.3
 Maximum age: 4.9

 Age group: 1.5
 Number of pets in this age group: 1
 Minimum age: 1.5
 Maximum age: 1.5

*/
```
