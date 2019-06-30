## [literable].findIndex
Searches for an element that matches the conditions defined by a specified predicate, and returns the zero-based index of the first occurrence within the `Literable` or a portion of it. This method returns -1 if an item that matches the conditions is not found.

#### Overloads
* [findIndex(match)](#[findIndex(match)): Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the first occurrence within the entire `Literable`.
* [findIndex(match, startIndex)](#[findIndex(match,-startIndex)): Searches for an element that matches the conditions defined by the `match`, and returns the zero-based index of the first occurrence within the range of elements in the `Literable` that extends from the specified index to the last element.
* [findIndex(match, startIndex, count)](#[findIndex(match,-startIndex,-count)): Searches for an element that matches the conditions defined by the `match`, and returns the zero-based index of the first occurrence within the range of elements in the `Literable` that extends from the specified index to the last element.

### findIndex(match)
Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the first occurrence within the entire `Literable`.

#### Parameters
* **match**: The `match` function that defines the conditions of the element to search for.
* **result**: The zero-based index of the first occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

#### Examples
The following code example demonstrates how to use the FindIndex method to find elements in a collection.

```javascript
const Literable = require('literable');

const employees = Literable.from([
    { name: 'Frank', id: 2 },
    { name: 'Jill', id: 3 },
    { name: 'Dave', id: 5 },
    { name: 'Jack', id: 8 },
    { name: 'Judith', id: 12 },
    { name: 'Robert', id: 14 },
    { name: 'Adam', id: 1 },
]);

const byJ = employees.findIndex(e => e.name.startsWith('J'));
console.log(`'J' starts at index ${byJ}`);

const byJu = employees.findIndex(e => e.name.startsWith('Ju'));
console.log(`'Ju' starts at index ${byJu}`);

/*
 The example displays the following output:

 'J' starts at index 1
 'Ju' starts at index 4
*/
```

### findIndex(match, startIndex)
Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the first occurrence within the range of elements in the `Literable` that extends from the specified index to the last element.

#### Parameters
* **match**: The `match` function that defines the conditions of the element to search for.
* **startIndex**: The zero-based starting index of the search.
* **result**: The zero-based index of the first occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

#### Examples
The following code example demonstrates how to use the FindIndex method to find elements in a collection.

```javascript
const Literable = require('literable');

const employees = Literable.from([
    { name: 'Frank', id: 2 },
    { name: 'Jill', id: 3 },
    { name: 'Dave', id: 5 },
    { name: 'Jack', id: 8 },
    { name: 'Judith', id: 12 },
    { name: 'Robert', id: 14 },
    { name: 'Adam', id: 1 },
]);

const byJ = employees.findIndex(e => e.name.startsWith('J'), 3);
console.log(`'J' starts at index ${byJ}`);

const byJu = employees.findIndex(e => e.name.startsWith('Ju'), 3);
console.log(`'Ju' starts at index ${byJu}`);

/*
 The example displays the following output:

 'J' starts at index 3
 'Ju' starts at index 4
*/
```

### findIndex(match, startIndex, count)
Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the first occurrence within the range of elements in the `Literable` that starts at the specified index and contains the specified number of elements.

#### Parameters
* **match**: The `match` function that defines the conditions of the element to search for.
* **startIndex**: The zero-based starting index of the search.
* **count**: The number of elements in the section to search.
* **result**: The zero-based index of the first occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

#### Examples
The following code example demonstrates how to use the FindIndex method to find elements in a collection.

```javascript
const Literable = require('literable');

const employees = Literable.from([
    { name: 'Frank', id: 2 },
    { name: 'Jill', id: 3 },
    { name: 'Dave', id: 5 },
    { name: 'Jack', id: 8 },
    { name: 'Judith', id: 12 },
    { name: 'Robert', id: 14 },
    { name: 'Adam', id: 1 },
]);

const byJ = employees.findIndex(e => e.name.startsWith('J'), 0, 3);
console.log(`'J' starts at index ${byJ}`);

const byJu = employees.findIndex(e => e.name.startsWith('Ju'), 0, 3);
console.log(`'Ju' starts at index ${byJu}`);

/*
 The example displays the following output:

 'J' starts at index 1
 'Ju' starts at index -1
*/
```
