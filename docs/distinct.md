## [literable].distinct
Returns distinct elements from a sequence.

#### Overloads
* [distinct()](#[distinct()): Returns distinct elements from a sequence by using the default equality comparer to compare values.
* [distinct(comparer)](#[distinct(comparer)): Returns distinct elements from a sequence by using a specified `comparer` to compare values.

#### Comments
The result sequence is unordered.

### distinct()
Returns distinct elements from a sequence by using the default equality comparer to compare values.

#### Parameters
* **result**: An `Literable` that contains distinct elements from the source sequence.

#### Examples
The following code example demonstrates how to use Distinct to return distinct elements from a sequence of integers.

```javascript
const Literable = require('literable');

const ages = Literable.from([ 21, 46, 46, 55, 17, 21, 55, 55 ]);

const distinctAges = ages.distinct();

console.log('Distinct ages:');

for(const age of distinctAges)
{
    console.log(age);
}

/*
 This code produces the following output:

 Distinct ages:
 21
 46
 55
 17
*/
```

### distinct(comparer)
Returns distinct elements from a sequence by using a specified IEqualityComparer<T> to compare values.

#### Parameters
* **comparer**: A function to compare values.
* **result**: An `Literable` that contains distinct elements from the source sequence.

#### Examples
The following example shows how to implement an equality comparer that can be used in the Distinct method.

```javascript
const Literable = require('literable');

const products = Literable.from([
    { name: 'apple', code: 9 },
    { name: 'orange', code: 4 },
    { name: 'apple', code: 9 },
    { name: 'lemon', code: 12 },
]);

const comparer = (a, b) => a.name === b.name && a.code === b.code;

//Exclude duplicates.

const noduplicates = products.distinct(comparer);

for(const product of noduplicates) {
    console.log(`${product.name} ${product.code}`);
}

/*
    This code produces the following output:
    apple 9 
    orange 4
    lemon 12
*/
```
