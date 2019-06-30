## Literable.range

### range(start, count)
Generates a sequence of integral numbers within a specified range.

#### Parameters
* **start**: The value of the first integer in the sequence.
* **count**: The number of sequential integers to generate.
* **result**: A `Literable` that contains a range of sequential integral numbers.

#### Examples
The following code example demonstrates how to use Range to generate a sequence of values.

```javascript
const Literable = require('literable');

const squares = Literable.range(1, 10)
    .select(x => x * x);

for(let square of squares) {
    console.log(square);
}

// This code produces the following output:
//
// 1
// 4
// 9
// 16
// 25
// 36
// 49
// 64
// 81
// 100
```
