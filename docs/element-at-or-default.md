## [literable].elementAtOrDefault

### elementAtOrDefault(index, defaultValue)
Returns the element at a specified index in a sequence or a default value if the index is out of range.

#### Parameters
* **index**: The zero-based index of the element to retrieve.
* **defaultValue**: The value to return if the index is outside the bounds of the source sequence.
* **result**: `defaultValue` if the index is outside the bounds of the source sequence; otherwise, the element at the specified position in the source sequence.

#### Examples
The following code example demonstrates how to use ElementAtOrDefault. This example uses an index that is outside the bounds of the array.

```javascript
const Literable = require('literable');

const names = Literable.from(['Hartono, Tommy', 'Adams, Terry', 'Andersen, Henriette Thaulow', 'Hedlund, Magnus', 'Ito, Shu']);

const name = names.elementAtOrDefault(20, '<no name at this index>');

console.log(`The name chosen is '${name}'.`);

/*
 This code produces the following output:

 The name chosen at index 20 is '<no name at this index>'.
*/
```
