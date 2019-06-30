## [literable].append

### append(...elements)
Appends values to the end of the sequence.

#### Parameters
* **elements**: The values to append.
* **result**: A new `Literable` than ends with `elements`.

#### Examples
The following code example demonstrates how to use Append to append a value to the end of the sequence.

```javascript
const Literable = require('literable');

// Creating a list of numbers
const numbers = Literable.from([ 1, 2, 3, 4 ]);

// Trying to append any value of the same type
numbers.append(5);

// It doesn't work because the original list has not been changed
console.log(numbers.toArray().join(', '));

// It works now because we are using a changed copy of the original list
const newNumbers = numbers.append(5);

// And then write to the console output
console.log(numbers.toArray().join(', '));

// This code produces the following output:
//
// 1, 2, 3, 4
// 1, 2, 3, 4, 5
```
