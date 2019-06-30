## [literable].prepend

### prepend(...elements)
Adds values to the beginning of the sequence.

#### Parameters
* **elements**: The values to prepend to the sequence.
* **result**: A new `Literable` that begins with elements.

#### Examples
The following code example demonstrates how to use Prepend to prepend values to the beginning of the sequence.

```javascript
const Literable = require('literable');

// Creating a list of numbers
const numbers = Literable.from([1, 2, 3, 4]);

// Trying to prepend any value of the same type
numbers.prepend(0);

// It doesn't work because the original list has not been changed
console.log(numbers.toArray().join(', '));

// It works now because we are using a changed copy of the original list
console.log(numbers.prepend(0).toArray().join(', '));

// If you prefer, you can create a new list explicitly
const newNumbers = numbers.prepend(-2, -1, 0);

// And then write to the console output
console.log(newNumbers.toArray().join(', '));

// This code produces the following output:
//
// 1, 2, 3, 4
// 0, 1, 2, 3, 4
// -2, -1, 0, 1, 2, 3, 4
```
