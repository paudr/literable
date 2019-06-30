## [literable].sum
Computes the sum of a sequence of numeric values.

#### Overloads
* [sum()](#[sum()): Computes the sum of a sequence of values.
* [sum(predicate)](#[sum(predicate)): Computes the sum of the sequence of values that are obtained by invoking a transform function on each element of the input sequence.

### sum()
Computes the sum of a sequence of values.

#### Parameters
* **result**: The sum of the values in the sequence.

#### Examples
The following code example demonstrates how to use Sum to sum the values of a sequence.

```javascript
const Literable = require('literable');

const numbers = Literable.from([43.68, 1.25, 583.7, 6.5]);
const sum = numbers.sum();

console.log(`The sum of the numbers is ${sum}.`);

// This code produces the following output:
//
// The sum of the numbers is 635.13.
```

### sum(predicate)
Computes the sum of the sequence of values that are obtained by invoking a transform function on each element of the input sequence.

#### Parameters
* **predicate**: A transform function to apply to each element.
* **result**: The sum of the projected values.

#### Examples
The following code example demonstrates how to use Sum to sum the projected values of a sequence.

```javascript
const Literable = require('literable');

const packages = Literable.from([
    { company: 'Coho Vineyard', weight: 25.2 },
    { company: 'Lucerne Publishing', weight: 18.7 },
    { company: 'Wingtip Toys', weight: 6.0 },
    { company: 'Adventure Works', weight: 33.8 },
]);

const totalWeight = packages.sum(pkg => pkg.weight);

console.log(`The total weight of the packages is: ${totalWeight.toPrecision(3)}`);

// This code produces the following output:
//
// The total weight of the packages is: 83.7
```
