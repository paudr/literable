## [literable].takeLast

### takeLast(count)
Returns a specified number of contiguous elements from the end of a sequence.

#### Parameters
* **count**: The number of elements to return.
* **result**: A new `Literable` that contains the specified number of elements from the end of the input sequence.

#### Examples
The following code example demonstrates how to use TakeLast to take a specified number of elements from the end in a sorted array and return the remaining elements.

```javascript
const Literable = require('literable');

const grades = Literable.from([59, 82, 70, 56, 92, 98, 85]);

const lowerGrades = grades.orderByDescending(grade => grade).takeLast(3);

console.log(lowerGrades.toArray());

// This code produces the following output:
//
// [ 70, 59, 56 ]
```
