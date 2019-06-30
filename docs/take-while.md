## [literable].takeWhile

### takeWhile(predicate)
Returns elements from a sequence as long as a specified condition is true, and then skips the remaining elements.

#### Parameters
* **predicate**: A function to test each source element for a condition; the second parameter of the function represents the index of the source element.
* **result**: A new `Literable` that contains elements from the input sequence that occur before the element at which the test no longer passes.

#### Examples
The following code example demonstrates how to use TakeWhile to return elements from the start of a sequence as long as a condition is true.

```javascript
const Literable = require('literable');

const fruits = Literable.from(['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape']);

const query = fruits.takeWhile(fruit => fruit !== 'orange');

for (let fruit of query) console.log(fruit);

// This code produces the following output:
//
// apple
// banana
// mango
```

The following code example demonstrates how to use TakeWhile to return elements from the start of a sequence as long as a condition that uses the element's index is true.

```javascript
const Literable = require('literable');

const amounts = Literable.from(['apple', 'passionfruit', 'banana', 'mango', 'orange', 'blueberry', 'grape', 'strawberry']);
const query = amounts.takeWhile((fruit, index) => fruit.length >= index);

console.log(query.toArray());

// This code produces the following output:
//
// [ 'apple',
//   'passionfruit',
//   'banana',
//   'mango',
//   'orange',
//   'blueberry' ]
```
