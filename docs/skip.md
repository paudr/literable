## [literable].skip

### skip(count)
Bypasses a specified number of elements in a sequence and then returns the remaining elements.

#### Parameters
* **count**: The number of elements to skip before returning the remaining elements.
* **result**: A new `Literable` that contains the elements that occur after the specified index in the input sequence.

#### Examples
The following code example demonstrates how to use Skip to skip a specified number of elements in a sorted array and return the remaining elements.

```javascript
const Literable = require('literable');

const grades = Literable.from([59, 82, 70, 56, 92, 98, 85]);

const lowerGrades = grades.skip(3);

console.log(lowerGrades.toArray());

// This code produces the following output:
//
// [ 56, 92, 98, 85 ]
```
