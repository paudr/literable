## Literable.from

### from(iterator)
Create a new sequence with given iterator.

#### Parameters
* **iterator**: The source sequence for the new `Literable`
* **result**: A new `Literable` that wraps `iterator`.

#### Examples
The following code example demonstrates how to use From to create new Literables.

```javascript
const Literable = require('literable');

const natural = Literable.from(function*() {
    let current = 1;
    while (true) yield current++;
});

console.log('natural', natural.take(10).toArray());

const pairs = Literable.from({
    value: 0,
    done: false,
    next() {
        this.value += 2;
        return this;
    },
    [Symbol.iterator]() {
        return this;
    }
});

console.log('pairs', pairs.take(10).toArray());

const firsts = Literable.from([1, 2, 3, 4]);

console.log('firsts', firsts.toArray());

const letters = Literable.from('abcdef');

console.log('letters', letters.toArray());

// This code produces the following output:
//
// natural [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
// pairs [ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 ]
// firsts [ 1, 2, 3, 4 ]
// letters [ 'a', 'b', 'c', 'd', 'e', 'f' ]
```
