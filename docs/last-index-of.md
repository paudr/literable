## [literable].lastIndexOf
Returns the index of the last occurrence of a value in a `Literable` or in a portion of the `Literable`.

#### Overloads
* [lastIndexOf(element)](#[lastIndexOf(element)): Searches for the specified element and returns the index of the last occurrence within the entire `Literable`.
* [lastIndexOf(element, startIndex)](#[lastIndexOf(element,-startIndex)): Searches for the specified element and returns the index of the last occurrence within the range of elements in the `Literable` that extends from the first element to the specified index.
* [lastIndexOf(element, startIndex, count)](#[lastIndexOf(element,-startIndex,-count)): Searches for the specified element and returns the index of the last occurrence within the range of elements in the `Literable` that contains the specified number of elements and ends at the specified index.

### lastIndexOf(element)
Searches for the specified object and returns the index of the last occurrence within the entire `Literable`.

#### Parameters
* **element**: The element to locate in array.
* **result**: The index of the last occurrence of value within the entire `Literable`, if found; otherwise minus 1.

#### Examples
The following code example shows how to determine the index of the last occurrence of a specified element in an array.

```javascript
const Literable = require('literable');

const strings = Literable.from(['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', 'in', 'the', 'barn']);

const element = 'the';
const index = strings.lastIndexOf(element);

console.log(`The last occurrence of "${element}" is at index ${index}.`);

/*
 This code produces the following output:

 The last occurrence of "the" is at index 10.
*/
```

### lastIndexOf(element, startIndex)
Searches for the specified object and returns the index of the last occurrence within the range of elements in the `Literable` that extends from the first element to the specified index.

#### Parameters
* **element**: The element to locate in array.
* **startIndex**: The starting index of the backward search.
* **result**: The index of the last occurrence of value within the range of elements in `Literable` that extends from the first element to startIndex, if found; otherwise minus 1.

#### Examples
The following code example shows how to determine the index of the last occurrence of a specified element in an array.

```javascript
const Literable = require('literable');

const strings = Literable.from(['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', 'in', 'the', 'barn']);

const element = 'the';
const startIndex = 8;
const index = strings.lastIndexOf(element, startIndex);

console.log(`The last occurrence of "${element}" between the start and index ${startIndex} is at index ${index}.`);

/*
 This code produces the following output:

 The last occurrence of "the" between the start and index 8 is at index 6.
*/
```

### lastIndexOf(element, startIndex, count)
Searches for the specified element and returns the index of the last occurrence within the range of elements in the `Literable` that contains the specified number of elements and ends at the specified index.

#### Parameters
* **element**: The element to locate in array.
* **startIndex**: The starting index of the backward search.
* **count**: The number of elements in the section to search.
* **result**: The index of the last occurrence of value within the range of elements in `Literable` that contains the number of elements specified in count and ends at startIndex, if found; otherwise minus 1.

#### Examples
The following code example shows how to determine the index of the last occurrence of a specified element in an array.

```javascript
const Literable = require('literable');

const strings = Literable.from(['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', 'in', 'the', 'barn']);

const element = 'the';
const startIndex = 10;
const count = 6;
const index = strings.lastIndexOf(element, startIndex, count);

console.log(`The last occurrence of "${element}" between index ${startIndex} and index ${startIndex-count+1} is at index ${index}.`);

/*
 This code produces the following output:

 The last occurrence of "the" between the start and index 8 is at index 6.
*/
```
