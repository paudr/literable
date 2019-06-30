## [literable].indexOf
Searches for the specified element and returns the index of its first occurrence in a `Literable` or in a range of elements in the `Literable`.

#### Overloads
* [indexOf(element)](#[indexOf(element)): Searches for the specified element and returns the index of its first occurrence in a `Literable`.
* [indexOf(element, startIndex)](#[indexOf(element,-startIndex)): Searches for the specified element in a range of elements of a `Literable`, and returns the index of its first occurrence. The range extends from a specified index to the end of the `Literable`.
* [indexOf(element, startIndex, count)](#[indexOf(element,-startIndex,-count)): Searches for the specified element in a range of elements of a `Literable`, and returns the index of ifs first occurrence. The range extends from a specified index for a specified number of elements.

### indexOf(element)
Searches for the specified element and returns the index of its first occurrence in a `Literable`.

#### Parameters
* **element**: The element to locate in `Literable`.
* **result**: The index of the first occurrence of element in `Literable`, if found; otherwise minus 1.

#### Examples
The following code example demonstrates how to use IndexOf method to find the index of a string in a `Literable`.

```javascript
const Literable = require('literable');

const strings = Literable.from(['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', 'in', 'the', 'barn']);

const element = 'the';
const index = strings.indexOf(element);
console.log(`The first occurrence of "${element}" is at index ${index}.`);

/*
 This code produces the following output:

 The first occurrence of "the" is at index 0.
*/
```

### indexOf(element, startIndex)
Searches for the specified element in a range of elements of a `Literable`, and returns the index of its first occurrence. The range extends from a specified index to the end of the `Literable`.

#### Parameters
* **element**: The element to locate in `Literable`.
* **startIndex**: The starting index of the search.
* **result**: The index of the first occurrence of element, if it's found, within the range of elements in `Literable` that extends from startIndex to the last element; otherwise minus 1.

#### Examples
The following code example demonstrates how to use IndexOf method to find the index of a string in a `Literable`.

```javascript
const Literable = require('literable');

const strings = Literable.from(['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', 'in', 'the', 'barn']);

const element = 'the';
const startIndex = 4;
const index = strings.indexOf(element, startIndex);
console.log(`The first occurrence of "${element}" between index ${startIndex} and the end is at index ${index}.`);

/*
 This code produces the following output:

 The first occurrence of "the" between index 4 and the end is at index 6.
*/
```

### indexOf(element, startIndex, count)
Searches for the specified element in a range of elements of a `Literable`, and returns the index of ifs first occurrence. The range extends from a specified index for a specified number of elements.

#### Parameters
* **element**: The element to locate in `Literable`.
* **startIndex**: The starting index of the search.
* **count**: The number of elements to search.
* **result**: The index of the first occurrence of element, if it's found in the `Literable` from index startIndex to startIndex + count - 1; otherwise minus 1.

#### Examples
The following code example demonstrates how to use IndexOf method to find the index of a string in a `Literable`.

```javascript
const Literable = require('literable');

const strings = Literable.from(['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'the', 'lazy', 'dog', 'in', 'the', 'barn']);

const element = 'the';
const startIndex = 7;
const count = 5;
const index = strings.indexOf(element, startIndex);
console.log(`The first occurrence of "${element}" between index ${startIndex} and index ${startIndex+count-1} is at index ${index}.`);

/*
 This code produces the following output:

 The first occurrence of "the" between index 7 and index 11 is at index 10.
*/
```
