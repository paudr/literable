## [literable].defaultIfEmpty

### defaultIfEmpty(defaultValue)
Returns the elements of an `Literable`, or a default value if the sequence is empty.

#### Parameters
* **defaultValue**: The value to return if the sequence is empty.
* **result**: A `Literable` that contains `defaultValue` if the `Literable` is empty; otherwise, the `Literable` itself.

#### Examples
The following code example demonstrates how to use the DefaultIfEmpty method and specify a default value. The first sequence is not empty and the second sequence is empty.

```javascript
const Literable = require('literable');

const defaultPet = { name: 'Default Pet', age: 0 };

const pets1 = Literable.from([
    { name: 'Barley', age: 8 },
    { name: 'Boots', age: 4 },
    { name: 'Whiskers', age: 1 },
]);

for (const pet of pets1.defaultIfEmpty(defaultPet)) {
    console.log(`Name: ${pet.name}`);
}

const pets2 = Literable.from([]);

for (const pet of pets2.defaultIfEmpty(defaultPet)) {
    console.log(`Name: ${pet.name}`);
}

/*
 This code produces the following output:

 Name: Barley
 Name: Boots
 Name: Whiskers

 Name: Default Pet
*/
```
