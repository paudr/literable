## [literable].zip

### zip(sequence, selector)
Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.

#### Parameters
* **sequence**: sequence to merge.
* **selector**: A function that specifies how to merge the elements from the two sequences.
* **result**: A new `Literable` that contains merged elements of two input sequences.

#### Examples
The following code example demonstrates how to use the Zip method to merge two sequences.

```javascript
const Literable = require('literable');

const numbers = [1, 2, 3, 4];
const words = ['one', 'two', 'three'];

const numbersAndWords = Literable.from(numbers)
    .zip(words, (first, second) => `${first} ${second}`);

console.log(numbersAndWords.toArray());

// This code produces the following output:
//
// [ '1 one', '2 two', '3 three' ]
```
