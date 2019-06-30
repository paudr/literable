## [literable].skipLast

### skipLast(count)
Bypasses a specified number of elements in the end of a sequence and then returns the remaining elements.

#### Parameters
* **count**: The number of elements to skip after returning the remaining elements.
* **result**: A new `Literable` that contains the elements that occur before the specified index in the input sequence.

#### Examples
The following code example demonstrates how to use SkipLast to skipLast a specified number of elements in a sorted array and return the remaining elements.

```javascript
const Literable = require('literable');

const grades = Literable.from([59, 82, 70, 56, 92, 98, 85]);

const lowerGrades = grades.skipLast(3);

console.log(lowerGrades.toArray());

// This code produces the following output:
//
// [ 59, 82, 70, 56 ]
```
