## [literable].elementAt

### elementAt(index)
Returns the element at a specified index in a sequence.

#### Parameters
* **index**: The zero-based index of the element to retrieve.
* **result**: The element at the specified position in the source sequence.

#### Examples
The following code example demonstrates how to use ElementAt to return an element at a specific position.

```javascript
const Literable = require('literable');

const names = Literable.from(['Hartono, Tommy', 'Adams, Terry', 'Andersen, Henriette Thaulow', 'Hedlund, Magnus', 'Ito, Shu']);

const name = names.elementAt(4);

console.log(`The name chosen is '${name}'.`);

/*
 This code produces the following sample output:

 The name chosen is 'Ito, Shu'.
*/
```
