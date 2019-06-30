## Literable.empty

### empty()
Returns an empty sequence that has the specified type argument.

#### Parameters
* **result**: An empty `Literable`.

#### Examples
The following code example demonstrates how to use Empty to create new Literable.

```javascript
const Literable = require('literable');

function numbers(upTo) {
    if (upTo <= 0) {
        return Literable.empty();
    } else {
        return Literable.from(function* () {
            for (let i = 1; i <= upTo; i++) yield i;
        });
    }
}

console.log(numbers(4).toArray());
console.log(numbers(0).toArray());

// This code produces the following output:
//
// [ 1, 2, 3, 4 ]
// []
```
