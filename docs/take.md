## [literable].take

### take(count)
Returns a specified number of contiguous elements from the start of a sequence.

#### Parameters
* **count**: The number of elements to return.
* **result**: A new `Literable` that contains the specified number of elements from the start of the input sequence.

#### Examples
The following code example demonstrates how to use Take to return elements from the start of a sequence.

```javascript
const Literable = require('literable');

const grades = Literable.from([59, 82, 70, 56, 92, 98, 85]);

const lowerGrades = grades.orderByDescending(grade => grade).take(3);

console.log(lowerGrades.toArray());

// This code produces the following output:
//
// [ 98, 92, 85 ]
```
