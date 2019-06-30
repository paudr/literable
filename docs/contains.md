## [literable].contains
Determines whether a sequence contains a specified element.

#### Overloads
* [contains(value)](#[contains(value)): Determines whether a sequence contains a specified element by using the default equality comparer.
* [contains(value, comparer)](#[contains(value,-comparer)): Determines whether a sequence contains a specified element by using a specified `comparer`.

### contains(value)
Determines whether a sequence contains a specified element by using the default equality comparer.

#### Parameters
* **value**: The value to locate in the sequence.
* **result**: `true` if the source sequence contains an element that has the specified value; otherwise, `false`.

#### Examples
The following code example demonstrates how to use Contains to determine whether an array contains a specific element.

```javascript
const Literable = require('literable');

const fruits = [ 'apple', 'banana', 'mango', 'orange', 'passionfruit', 'grape' ];

const fruit = 'mango';

const hasMango = Literable.from(fruits).contains(fruit);

console.log(`The array ${hasMango ? 'does' : 'does not'} contain '${fruit}'.`);

// This code produces the following output:
//
// The array does contain 'mango'.
```

### contains(value, comparer)
Determines whether a sequence contains a specified element by using a specified `comparer`.

#### Parameters
* **value**: The value to locate in the sequence.
* **comparer**: An equality comparer to compare values.
* **result**: `true` if the source sequence contains an element that has the specified value; otherwise, `false`.

#### Examples
The following example shows how to implement an equality comparer that can be used in the Contains method.

```javascript
const Literable = require('literable');

const fruits = Literable.from([
    { name: 'apple', code: 9 },
    { name: 'orange', code: 4 },
    { name: 'lemon', code: 12 },
]);

const apple = { name: 'apple', code: 9 };
const kiwi = { name: 'kiwi', code: 8 };

const prodc = (a, b) => a.name === b.name && a.code === b.code;

const hasApple = fruits.contains(apple, prodc);
const hasKiwi = fruits.contains(kiwi, prodc);

console.log(`Apple? ${hasApple}`);
console.log(`Kiwi? ${hasKiwi}`);

/*
    This code produces the following output:
 
    Apple? true
    Kiwi? false
*/
```
