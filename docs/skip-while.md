## [literable].skipWhile

### skipWhile(predicate)
Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.

#### Parameters
* **predicate**: A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
* **result**: A new `Literable` that contains the elements from the input sequence starting at the first element in the linear series that does not pass the test specified by `predicate`.

#### Examples
The following code example demonstrates how to use SkipWhile to skip elements of an array as long as a condition is true.

```javascript
const Literable = require('literable');

const grades = Literable.from([59, 82, 70, 56, 92, 98, 85]);

const lowerGrades = grades.orderByDescending(grade => grade)
    .skipWhile(grade => grade >= 80);

console.log(lowerGrades.toArray());

// This code produces the following output:
//
//  [ 70, 59, 56 ]
```

The following code example demonstrates how to use SkipWhile to skip elements of an array as long as a condition that depends on the element's index is true.

```javascript
const Literable = require('literable');

const amounts = Literable.from([5000, 2500, 9000, 8000, 6500, 4000, 1500, 5500]);
const query = amounts.skipWhile((amount, index) => amount > index * 1000);

console.log(query.toArray());

// This code produces the following output:
//
// [ 4000, 1500, 5500 ]
```
