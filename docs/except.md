## [literable].except
Produces the set difference of two sequences.

#### Overloads
* [except(sequence)](#[except(sequence)): Produces the set difference of two sequences by using the default equality comparer to compare values.
* [except(sequence, comparer)](#[except(sequence,-comparer)): Produces the set difference of two sequences by using the specified IEqualityComparer<T> to compare values.

### except(sequence)
Produces the set difference of two sequences by using the default equality comparer to compare values.

#### Parameters
* **sequence**: A sequence whose elements that also occur in the sequence will cause those elements to be removed from the returned sequence.
* **result**: A sequence that contains the set difference of the elements of two sequences.

#### Examples
The following code example demonstrates how to use the Except method to compare two sequences of numbers and return elements that appear only in the first sequence.

```javascript
const Literable = require('literable');

const numbers1 =[ 2.0, 2.0, 2.1, 2.2, 2.3, 2.3, 2.4, 2.5 ];
const numbers2 = [ 2.2 ];

const onlyInFirstSet = Literable.from(numbers1).except(numbers2);

for(const number of onlyInFirstSet) {
    console.log(number);
}

/*
 This code produces the following output:

 2
 2.1
 2.3
 2.4
 2.5
*/
```

### except(sequence, comparer)
Produces the set difference of two sequences by using the specified `comparer` to compare values.

#### Parameters
* **sequence**: A sequence whose elements that also occur in the sequence will cause those elements to be removed from the returned sequence.
* **comparer**: An function to compare values.
* **result**: A sequence that contains the set difference of the elements of two sequences.

#### Examples
The following example shows how to implement an equality comparer that can be used in the Except method.

```javascript
const Literable = require('literable');

const fruits1 = [
    { name: 'apple', code: 9 }, 
    { name: 'orange', code: 4 },
    { name: 'lemon', code: 12 },
];

const fruits2 = [
    { name: 'apple', code: 9 },
];

const comparer = (a, b) => a.name === b.name && a.code === b.code;

//Get all the elements from the first array
//except for the elements from the second array.
const except = Literable.from(fruits1).except(fruits2, comparer);

for(const product of except) {
    console.log(`${product.name} ${product.code}`);
}

/*
  This code produces the following output:
 
  orange 4
  lemon 12
*/
```
