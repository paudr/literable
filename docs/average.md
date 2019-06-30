## [literable].average
Computes the average of a sequence of numeric values.

#### Overloads
* [average()](#average()): Computes the average of a sequence of numeric values.
* [average(selector)](#average(selector)): Computes the average of a sequence of numeric values that are obtained by invoking a transform function on each element of the input sequence.

### average()
Computes the average of a sequence of numeric values.

#### Parameters
* **result**: The average of the sequence of values.

#### Examples
The following code example demonstrates how to use Average to calculate an average.

```javascript
const Literable = require('literable');

const grades = [ 78, 92, 100, 37, 81 ];

const average = Literable.from(grades).average();

console.log(`The average grade is ${average}.`);

// This code produces the following output:
//
// The average grade is 77.6.
```

### average(selector)
Computes the average of a sequence of numeric values.

#### Parameters
* **selector**: A transform function to apply to each element.
* **result**: The average of the sequence of values.

#### Examples
The following code example demonstrates how to use Average(selector) to calculate an average.

```javascript
const Literable = require('literable');

const fruits = [ 'apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape' ];

const average = Literable.from(fruits).average(s => s.length);

console.log(`The average string length is ${average}.`);

// This code produces the following output:
//
// The average string length is 6.5.
```
