## [literable].ofType

### ofType(type)
Filters the elements of an `Literable` based on a specified type.

#### Parameters
* **type**: The type to filter the elements of the sequence on.
* **result**: A `Literable` that contains elements from the input sequence of type `type`.

#### Examples
The following code example demonstrates how to use OfType to filter the elements of a sequence.

```javascript
const Literable = require('literable');

const fruits = Literable.from(['mango', 'orange', 'apple', 3, 'banana']);

const query1 = fruits.ofType(String);

console.log("Elements of type 'string' are:")
query1.forEach(element => console.log(element));

const query2 = fruits.ofType('number');

console.log("Elements of type 'number' are:")
query2.forEach(element => console.log(element));

/*
 This code produces the following output:

 Elements of type 'string' are:
 mango
 orange
 apple
 banana
 Elements of type 'number' are:
 3
*/
```
