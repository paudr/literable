## [literable].findLastIndex
Searches for an element that matches the conditions defined by a specified predicate, and returns the zero-based index of the last occurrence within the `Literable` or a portion of it.

#### Overloads
* [findLastIndex(match)](#[findLastIndex(match)): Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the entire `Literable`.
* [findLastIndex(match, startIndex)](#[findLastIndex(match,-startIndex)): Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the range of elements in the `Literable` that extends from the first element to the specified index.
* [findLastIndex(match, startIndex, count)](#[findLastIndex(match,-startIndex,-count)): Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the range of elements in the `Literable` that contains the specified number of elements and ends at the specified index.

### findLastIndex(match)
Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the entire `Literable`.

#### Parameters
* **match**: The `match` function that defines the conditions of the element to search for.
* **result**: The zero-based index of the last occurrence of an element that matches the conditions defined by match, if found; otherwise, -1.

#### Examples
The following code example demonstrates how to use the FindLastIndex method to find elements in a collection.

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

const byJ = employees.findLastIndex(e => e.name.startsWith('J'));
console.log(`'J' starts at index ${byJ}`);

const byJa = employees.findLastIndex(e => e.name.startsWith('Ja'));
console.log(`'Ja' starts at index ${byJa}`);

/*
 The example displays the following output:

 'J' starts at index 4
 'Ja' starts at index 3
*/
```

### findLastIndex(match, startIndex)
Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the range of elements in the `Literable` that extends from the first element to the specified index.

#### Parameters
* **match**: The `match` function that defines the conditions of the element to search for.
* **startIndex**: The zero-based starting index of the search.
* **result**: The zero-based index of the last occurrence of an element that matches the conditions defined by match, if found; otherwise, -1.

#### Examples
The following code example demonstrates how to use the FindLastIndex method to find elements in a collection.

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

const byJ = employees.findLastIndex(e => e.name.startsWith('J'), 4);
console.log(`'J' starts at index ${byJ}`);

const byJi = employees.findLastIndex(e => e.name.startsWith('Ji'), 4);
console.log(`'Ji' starts at index ${byJi}`);

/*
 The example displays the following output:

 'J' starts at index 4
 'Ji' starts at index 1
*/
```

### findLastIndex(match, startIndex, count)
Searches for an element that matches the conditions defined by the specified predicate, and returns the zero-based index of the last occurrence within the range of elements in the `Literable` that contains the specified number of elements and ends at the specified index.

#### Parameters
* **match**: The `match` function that defines the conditions of the element to search for.
* **startIndex**: The zero-based starting index of the backward search.
* **count**: The number of elements in the section to search.
* **result**: The zero-based index of the first occurrence of an element that matches the conditions defined by `match`, if found; otherwise, -1.

#### Examples
The following code example demonstrates how to use the FindLastIndex method to find elements in a collection.

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

const byJa = employees.findLastIndex(e => e.name.startsWith('Ja'), 4, 3);
console.log(`'Ja' starts at index ${byJa}`);

const byJi = employees.findLastIndex(e => e.name.startsWith('Ji'), 4, 3);
console.log(`'Ji' starts at index ${byJi}`);

/*
 The example displays the following output:

 'Ja' starts at index 3
 'Ji' starts at index -1
*/
```
