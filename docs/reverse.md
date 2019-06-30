## [literable].reverse

### reverse()
Inverts the order of the elements in a sequence.

#### Parameters
* **result**: A new `Literable` whose elements correspond to those of the sequence in reverse order.

#### Examples
The following code example demonstrates how to use Reverse to reverse the order of elements in an array.

```javascript
const Literable = require('literable');

const apple = Literable.from('apple');
const reversed = apple.reverse();

console.log(reversed.toArray().join(' '));

// This code produces the following output:
//
// e l p p a
```
