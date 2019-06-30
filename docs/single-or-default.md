## [literable].singleOrDefault
Returns a single, specific element of a sequence, or a default value if that element is not found.

#### Overloads
* [singleOrDefault(defaultValue)](#[singleOrDefault(defaultValue)): Returns the only element of a sequence, or a default value if the sequence is empty; this method throws an exception if there is more than one element in the sequence.
* [singleOrDefault(predicate, defaultValue)](#[singleOrDefault(predicate,-defaultValue)): Returns the only element of a sequence that satisfies a specified condition or a default value if no such element exists; this method throws an exception if more than one element satisfies the condition.

### singleOrDefault(defaultValue)
Returns the only element of a sequence, or a default value if the sequence is empty; this method throws an exception if there is more than one element in the sequence.

#### Parameters
* **defaultValue**: The value to return if the sequence is empty.
* **result**: The single element of the input sequence.

#### Examples
The following code example demonstrates how to use SingleOrDefault to select the only element of an array.

```javascript
const Literable = require('literable');

const fruits1 = Literable.from(['orange']);

const fruit1 = fruits1.singleOrDefault('No such string!');

console.log(fruit1);

const fruits2 = Literable.from([]);

const fruit2 = fruits2.singleOrDefault('No such string!');

console.log(fruit2);

// This code produces the following output:
//
// orange
// No such string!
```

### singleOrDefault(predicate, defaultValue)
Returns the only element of a sequence that satisfies a specified condition or a default value if no such element exists; this method throws an exception if more than one element satisfies the condition.

#### Parameters
* **predicate**: A function to test an element for a condition.
* **defaultValue**: The value to return if no such element is found.
* **result**: The single element of the input sequence that satisfies the condition, or `defaultValue` if no such element is found.

#### Examples
The following code example demonstrates how to use SingleOrDefault to select the only element of an array that satisfies a condition.

```javascript
const Literable = require('literable');

const fruits = Literable.from(['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape']);

const fruit1 = fruits.singleOrDefault(fruit => fruit.length > 10, 'No such string!');

console.log(fruit1);

const fruit2 = fruits.singleOrDefault(fruit => fruit.length > 15, 'No such string!');

console.log(fruit2);

// This code produces the following output:
//
// passionfruit
// No such string!
```
