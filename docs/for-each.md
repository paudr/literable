## [literable].forEach

### forEach(action)
Performs the specified action on each element of the `Literable`.

#### Parameters
* **action**: The function delegate to perform on each element of the `Literable`.

#### Examples
The following example shows how to use ForEach to display the squares of each element in an integer array.

```javascript
const Literable = require('literable');

const showSquare = int => console.log(`${int} squared ${int * int}`);
const intArray  = Literable.from([2, 3, 4]);
intArray.forEach(showSquare);

/*
 This code produces the following output:

 2 squared = 4
 3 squared = 9
 4 squared = 16
*/
```
