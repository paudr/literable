## [literable].single
Returns a single, specific element of a sequence.

#### Overloads
* [single()](#[single()): Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.
* [single(predicate)](#[single(predicate)): Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than one such element exists.

### single()
Returns the only element of a sequence, and throws an exception if there is not exactly one element in the sequence.

#### Parameters
* **result**: The single element of the input sequence.

#### Examples
The following code example demonstrates how to use Single to select the only element of an array.

```javascript
const Literable = require('literable');

const fruits1 = Literable.from(['orange']);

const fruit1 = fruits1.single();

console.log(fruit1);

const fruits2 = Literable.from(['orange', 'apple']);

try {
    const fruit2 = fruits2.single();
    console.log(fruit2);
} catch(_) {
    console.log('The collection does not contain exactly one element.');
}

// This code produces the following output:
//
// orange
// The collection does not contain exactly one element.
```

### single(predicate)
Returns the only element of a sequence that satisfies a specified condition, and throws an exception if more than one such element exists.

#### Parameters
* **predicate**: A function to test an element for a condition.
* **result**: The single element of the input sequence.

#### Examples
The following code example demonstrates how to use Single to select the only element of an array that satisfies a condition.

```javascript
const Literable = require('literable');

const fruits = Literable.from(['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape']);

const fruit1 = fruits.single(fruit => fruit.length > 10);

console.log(fruit1)

// This code produces the following output:
//
// passionfruit
```
