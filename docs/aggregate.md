## [literable].aggregate

#### Overloads
* [aggregate(func)](#aggregate(func)): Applies an accumulator function over a sequence.
* [aggregate(seed, func)](#aggregate(seed,-func)-->-result): Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value.
* [aggregate(seed, func, resultSelector)](#aggregate(seed,-func,-resultSelector)-->-result): Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value, and the specified function is used to select the result value.


### aggregate(func)
Applies an accumulator function over a sequence.

#### Parameters
* **func(accumulated, current, index)**: An accumulator function to be invoked on each element.
* **result**: The final accumulator value.

#### Examples
The following code example demonstrates how to reverse the order of words in a string by using Aggregate.

```javascript
const Literable = require('literable');

const sentence = 'the quick brown fox jumps over the lazy dog';

// Split the string into individual words.
const words = sentence.split(' ');

// Prepend each word to the beginning of the new sentence to reverse the word order.
const reversed = Literable.from(words)
    .aggregate((workingSentence, next) => `${next} ${workingSentence}`);

console.log(reversed);

// This code produces the following output:
//
// dog lazy the over jumps fox brown quick the
```

### aggregate(seed, func) -> result
Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value.

#### Parameters
* **seed**: The initial accumulator value.
* **func(accumulated, current, index)**: An accumulator function to be invoked on each element.
* **result**: The final accumulator value.

#### Examples
The following code example demonstrates how to use Aggregate to apply an accumulator function and use a seed value.

```javascript
const Literable = require('literable');

const ints = [4, 8, 8, 3, 9, 0, 7, 8, 2];

// Count the even numbers in the array, using a seed value of 0.
const numEven = Literable.from(ints)
    .aggregate(0, (total, next) =>
        next % 2 == 0 ? total + 1 : total);

console.log(`The number of even integers is: ${numEven}`);

// This code produces the following output:
//
// The number of even integers is: 6
```

### aggregate(seed, func, resultSelector) -> result
Applies an accumulator function over a sequence. The specified seed value is used as the initial accumulator value, and the specified function is used to select the result value.

#### Parameters
* **seed**: The initial accumulator value.
* **func(accumulated, current, index)**: An accumulator function to be invoked on each element.
* **resultSelector(accumulated) -> result**: A function to transform the final accumulator value into the result value.
* **result**: The final accumulator value.

#### Examples

```javascript
const Literable = require('literable');

const fruits = ['apple', 'mango', 'orange', 'passionfruit', 'grape'];

// Determine whether any string in the array is longer than 'banana'.
const longestName = Literable.from(fruits)
    .aggregate(
        'banana',
        (longest, next) => next.length > longest.length ? next : longest,
        fruit => fruit.toUpperCase() // Return the final result as an upper case string.
    );

console.log(`The fruit with the longest name is ${longestName}.'`);

// This code produces the following output:
//
// The fruit with the longest name is PASSIONFRUIT.
```
