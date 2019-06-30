## Literable.repeat

### repeat(element, count)
Generates a sequence that contains one repeated value.

#### Parameters
* **element**: The value to be repeated.
* **count**: The number of times to repeat the value in the generated sequence.
* **result**: A `Literable` that contains a repeated value.

#### Examples
The following code example demonstrates how to use Repeat to generate a sequence of a repeated value.

```javascript
const Literable = require('literable');

const strings = Literable.repeat('I like programming.', 10);

for(let current of strings) {
    console.log(current);
}

// This code produces the following output:
//
// 'I like programming.
// 'I like programming.
// 'I like programming.
// 'I like programming.
// 'I like programming.
// 'I like programming.
// 'I like programming.
// 'I like programming.
// 'I like programming.
// 'I like programming.
```
