## [literable].toArray

### toArray()
Creates an array from a `Literable`.

#### Parameters
* **result**: An array that contains the elements from the input sequence.

#### Examples
The following code example demonstrates how to use ToArray to force immediate query evaluation and return an array of results.

```javascript
const Literable = require('literable');

const naturalNumbers = Literable.from(function* () {
    let current = 1;
    while (true) yield current++;
});

const selection = naturalNumbers.skip(10).take(5).toArray();

console.log(selection);

// This code produces the following output:
//
// [ 11, 12, 13, 14, 15 ]
```
