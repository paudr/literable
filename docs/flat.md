## [literable].flat
Projects each element of a sequence to an `Literable` and all sub-sequence elements concatenated into it recursively and flattens the resulting sequences into one sequence.

#### Overloads
* [flat()](#[flat()): Projects each element of a sequence to an `Literable` and all sub-sequence elements concatenated into it recursively and flattens the resulting sequences into one sequence.
* [flat(depth)](#[flat(depth)): Projects each element of a sequence to an `Literable` and all sub-sequence elements concatenated into it recursively up to the specified depth and flattens the resulting sequences into one sequence.

### flat()
Projects each element of a sequence to an `Literable` and all sub-sequence elements concatenated into it recursively and flattens the resulting sequences into one sequence.

#### Parameters
* **result**: A `Literable` with the sequence and sub-sequence elements concatenated into it.

#### Examples
The following code example demonstrates how to use Flat to return a flattened `Literable`.

```javascript
const Literable = require('literable');

const tree1 = Literable.from([1, 2, Literable.from([3, 4])]);
const tree2 = Literable.from([1, 2, [3, 4, [5, 6]]]);

const flat1 = tree1.flat().toArray();
console.log(flat1);

const flat2 = tree2.flat().toArray();
console.log(flat2);


/*
 This code produces the following output:

 [ 1, 2, 3, 4 ]
 [ 1, 2, 3, 4, 5, 6 ]
*/
```

### flat(depth)
Projects each element of a sequence to an `Literable` and all sub-sequence elements concatenated into it recursively up to the specified depth and flattens the resulting sequences into one sequence.

#### Parameters
* **depth**: The depth level specifying how deep a nested array structure should be flattened. Defaults to 1.
* **result**: A `Literable` with the sequence and sub-sequence elements concatenated into it.

#### Examples
The following code example demonstrates how to use Flat to return a flattened `Literable`.

```javascript
const Literable = require('literable');

const array1 = Literable.from([1, 2, Literable.from([3, 4])]);
const array2 = Literable.from([1, 2, [3, 4, [5, 6]]]);

const flat1 = array1.flat(2).toArray();
console.log(flat1);

const flat2 = array2.flat(2).toArray();
console.log(flat2);

const flat3 = array2.flat(4).toArray();
console.log(flat3);


/*
 This code produces the following output:

 [ 1, 2, 3, 4 ]
 [ 1, 2, 3, 4, [ 5, 6 ] ]
 [ 1, 2, 3, 4, 5, 6 ]
*/
```
