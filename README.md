# Literable
A library for work with iterators inspired in .Net LINQ

## Install

```sh
npm install literable
```

## Quick examples

```javascript
const Literable = require('literable');

const natural = new Literable(function*() {
    let current = 1;
    while (true) yield current++;
});

const pairsSum = natural.take(1000)
    .where(num => num % 2)
    .sum();

console.log(`The sum of all pair natural numbers below 1001 is ${pairsSum}`);
// The sum of all pair natural numbers below 1001 is 250000
```

## Api

* **[aggregate](docs/aggregate.md)**: Applies an accumulator function over a sequence.
* **[all](docs/all.md)**: Determines whether all elements of a sequence satisfy a condition.
* **[any](docs/any.md)**: Determines whether any element of a sequence exists or satisfies a condition.
* **[append](docs/append.md)**: Appends values to the end of the sequence.
* **[average](docs/average.md)**: Computes the average of a sequence of numeric values.
* **[concat](docs/concat.md)**: Concatenates the sequences.
* **[contains](docs/contains.md)**: Determines whether a sequence contains a specified element.
* **[count](docs/count.md)**: Returns the number of elements in a sequence.
* **[defaultIfEmpty](docs/default-if-empty.md)**: Returns the elements of a sequence, or a default value if the sequence is empty.
* **[distinct](docs/distinct.md)**: Returns distinct elements from a sequence.
* **[elementAt](docs/element-at.md)**: Returns the element at a specified index in a sequence.
* **[elementAtOrDefault](docs/element-at-or-default.md)**: Returns the element at a specified index in a sequence or a default value if the index is out of range.
* **[except](docs/except.md)**: Produces the set difference of two sequences.
* **[findIndex](docs/find-index.md)**: Searches for an element that matches the conditions defined by a specified predicate, and returns the zero-based index of the first occurrence within the sequence or a portion of it. This method returns -1 if an item that matches the conditions is not found.
* **[findLastIndex](docs/find-last-index.md)**: Searches for an element that matches the conditions defined by a specified predicate, and returns the zero-based index of the last occurrence within the sequence or a portion of it.
* **[first](docs/first.md)**: Returns the first element of a sequence.
* **[firstOrDefault](docs/first-or-default.md)**: Returns the first element of a sequence, or a default value if no element is found.
* **[flat](docs/flat.md)**: Projects each element of a sequence to a sequence and all sub-sequence elements concatenated into it recursively and flattens the resulting sequences into one sequence.
* **[forEach](docs/for-each.md)**: Performs the specified action on each element of the sequence.
* **[groupBy](docs/group-by.md)**: Groups the elements of a sequence.
* **[groupJoin](docs/group-join.md)**: Correlates the elements of two sequences based on key equality, and groups the results.
* **[indexOf](docs/index-of.md)**: Searches for the specified element and returns the index of its first occurrence in a sequence or in a range of elements in the sequence.
* **[intersect](docs/intersect.md)**: Produces the set intersection of two sequences.
* **[join](docs/join.md)**: Correlates the elements of two sequences based on matching keys.
* **[last](docs/last.md)**: Returns the last element of a sequence.
* **[lastIndexOf](docs/last-index-of.md)**: Returns the index of the last occurrence of a value in a sequence or in a portion of the sequence.
* **[lastOrDefault](docs/last-or-default.md)**: Returns the last element of a sequence, or a default value if no element is found.
* **[max](docs/max.md)**: Returns the maximum value in a sequence of values.
* **[maxElement](docs/max-element.md)**: Returns the maximum value in a sequence of values.
* **[min](docs/min.md)**: Returns the minimum value in a sequence of values.
* **[minElement](docs/min-element.md)**: Returns the minimum value in a sequence of values.
* **[ofType](docs/of-type.md)**: Filters the elements of an sequence based on a specified type.
* **[orderBy](docs/order-by.md)**: Sorts the elements of a sequence in ascending order.
* **[orderByDescending](docs/order-by-descending.md)**: Sorts the elements of a sequence in descending order.
* **[prepend](docs/prepend.md)**: Adds values to the beginning of the sequence.
* **[reverse](docs/reverse.md)**: Inverts the order of the elements in a sequence.
* **[select](docs/select.md)**: Projects each element of a sequence into a new form.
* **[selectMany](docs/select-many.md)**: Projects each element of a sequence to a sequence and flattens the resulting sequences into one sequence.
* **[sequenceEqual](docs/sequence-equal.md)**: Determines whether two sequences are equal according to an equality comparer.
* **[single](docs/single.md)**: Returns a single, specific element of a sequence.
* **[singleOrDefault](docs/single-or-default.md)**: Returns a single, specific element of a sequence, or a default value if that element is not found.
* **[skip](docs/skip.md)**: Bypasses a specified number of elements in a sequence and then returns the remaining elements.
* **[skipLast](docs/skip-last.md)**: Bypasses a specified number of elements in the end of a sequence and then returns the remaining elements.
* **[skipWhile](docs/skip-while.md)**: Bypasses elements in a sequence as long as a specified condition is true and then returns the remaining elements.
* **[sum](docs/sum.md)**: Computes the sum of a sequence of numeric values.
* **[take](docs/take.md)**: Returns a specified number of contiguous elements from the start of a sequence.
* **[takeLast](docs/take-last.md)**: Returns a specified number of contiguous elements from the end of a sequence.
* **[take-while](docs/takeWhile.md)**: Returns elements from a sequence as long as a specified condition is true, and then skips the remaining elements.
* **[thenBy](docs/then-by.md)**: Performs a subsequent ordering of the elements in a sequence in ascending order.
* **[thenByDescending](docs/then-by-descending.md)**: Performs a subsequent ordering of the elements in a sequence in descending order.
* **[toArray](docs/to-array.md)**: Creates an array from a sequence.
* **[traverseBreadthFirst](docs/traverse-breadth-first.md)**: Traverse over elements exploring all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.
* **[traverseDepthFirst](docs/traverse-depth-first.md)**: Traverse over elements exploring as far as possible along each branch before backtracking.
* **[union](docs/union.md)**: Produces the set union of two sequences.
* **[where](docs/where.md)**: Filters a sequence of values based on a predicate.
* **[zip](docs/zip.md)**: Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
