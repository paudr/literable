## [literable].firstOrDefault 
Returns the first element of a sequence, or a default value if no element is found.

#### Overloads
* [firstOrDefault(predicate)](#[firstOrDefault(predicate)): Returns the first element of the sequence that satisfies a condition or a default value if no such element is found.
* [firstOrDefault(predicate, defaultValue)](#[firstOrDefault(predicate,-defaultValue)): Returns the first element of a sequence, or a default value if the sequence contains no elements.

### firstOrDefault(predicate)
Returns the first element of the sequence that satisfies a condition or a default value if no such element is found.

#### Parameters
* **predicate**: A function to test each element for a condition.
* **result**: `undefined` if source is empty or if no element passes the test specified by predicate; otherwise, the first element in source that passes the test specified by predicate.

#### Examples
The following code example demonstrates how to use firstOrDefault by passing in a predicate. In the second call to the method, there is no element in the array that satisfies the condition.

```javascript
const Literable = require('literable');

const names = Literable.from(['Hartono, Tommy', 'Adams, Terry', 'Andersen, Henriette Thaulow', 'Hedlund, Magnus', 'Ito, Shu']);

const firstLongName = Literable.from(names).firstOrDefault(name => name.length > 20, '');
console.log(`The first long name is '${firstLongName}'.`);

const firstVeryLongName = Literable.from(names).firstOrDefault(name => name.length > 30, '');
console.log(`There is ${!firstVeryLongName ? 'not a' : 'a'} name longer than 30 characters.`);

/*
 This code produces the following output:

 The first long name is 'Andersen, Henriette Thaulow'.
 There is not a name longer than 30 characters.
*/
```

### firstOrDefault(predicate, defaultValue)
Returns the first element of a sequence, or a default value if the sequence contains no elements.

#### Parameters
* **predicate**: A function to test each element for a condition.
* **defaultValue**: The value to return if the sequence is empty.
* **result**: `defaultValue` if source is empty or if no element passes the test specified by predicate; otherwise, the first element in source that passes the test specified by predicate.

#### Examples
The following code example demonstrates how to use firstOrDefault by passing in a predicate and default value.

```javascript
const Literable = require('literable');

const names = Literable.from(['Hartono, Tommy', 'Adams, Terry', 'Andersen, Henriette Thaulow', 'Hedlund, Magnus', 'Ito, Shu']);

const firstLongName = Literable.from(names).firstOrDefault(name => name.length > 20, '');
console.log(`The first long name length is '${firstLongName.length}'.`);

const firstVeryLongName = Literable.from(names).firstOrDefault(name => name.length > 30, '');
console.log(`The first very long name length is '${firstVeryLongName.length}'.`);

/*
 This code produces the following output:

 The first long name length is '27'.
 The first very long name length is '0'.
*/
```
