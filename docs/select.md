## [literable].select

### select(selector)
Projects each element of a sequence into a new form.

#### Parameters
* **selector**: A transform function to apply to each source element; the second parameter of the function represents the index of the source element.
* **result**: A new `Literable` whose elements are the result of invoking the transform function on each element of source.

#### Examples
The following code example demonstrates how to use Select to project over a sequence of values.

```javascript
const Literable = require('literable');

const squares = Literable.range(1, 10).select(x => x * x);

console.log(squares.toArray());

// This code produces the following output:
//
// [ 1, 4, 9, 16, 25, 36, 49, 64, 81, 100 ]
```

The following code example demonstrates how to use Select to project over a sequence of values and use the index of each element.

```javascript
const Literable = require('literable');

const fruits = Literable.from(['apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape']);
const query = fruits.select((fruit, index) => ({ index, fruit }));

for (let obj of query) {
    console.log(obj)
}

// This code produces the following output:
//
// { index: 0, fruit: 'apple' }
// { index: 1, fruit: 'banana' }
// { index: 2, fruit: 'mango' }
// { index: 3, fruit: 'orange' }
// { index: 4, fruit: 'passionfruit' }
// { index: 5, fruit: 'grape' }
```
