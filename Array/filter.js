/**
 * Array.prototype.filter()
 *
 * The native filter() method creates a new array with all elements that pass the test
 * implemented by the provided function.
 *
 * @param {Function} callback - Function to test each element of the array,
 * taking three arguments:
 * - item: The current element being processed in the array.
 * - index: The index of the current element being processed in the array.
 * - array: The array filter was called upon.
 * @param {any} [thisArg] - Optional. Value to use as this when executing callback.
 *
 * @returns {Array} A new array with the elements that pass the test.
 */

Array.prototype.ownFilter = function (callback, thisArg) {
  // Check if the context is null or undefined
  if (this == null) {
    throw new TypeError("Array.prototype.filter called on null or undefined");
  }

  // Check if callback is a function
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }

  var newArray = [];
  var len = this.length || 0; // If `this.length` is falsy, use 0

  for (var i = 0; i < len; i++) {
    if (this.hasOwnProperty(i)) {
      var element = this[i];
      if (callback.call(thisArg, element, i, this)) {
        newArray.push(element);
      }
    }
  }

  return newArray;
};

let arr = [1, 2, 3, 4, 5];

// Native example
let nativeFilter = arr.filter(function (item, index, array) {
  return item > this;
}, 2);
console.log(nativeFilter); // Output: [3, 4, 5]

// Polyfill example
let polyfillFilter = arr.ownFilter(function (item, index, array) {
  return item > this;
}, 2);

console.log(polyfillFilter); // Output: [3, 4, 5]
