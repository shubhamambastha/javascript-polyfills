/**
 * Array.prototype.map()
 *
 * The native map() method creates a new array populated with the results of calling a provided function
 * on every element in the calling array.
 *
 * @param {Function} callback - Function that produces an element of the new Array,
 * taking three arguments:
 * - item: The current element being processed in the array.
 * - index: The index of the current element being processed in the array.
 * - array: The array map was called upon.
 * @param {any} [thisArg] - Optional. Value to use as this when executing callback.
 *
 * @returns {Array} A new array with each element being the result of the callback function.
 */

Array.prototype.ownMap = function (callback, thisArg) {
  // Check if the context is null or undefined
  if (this == null) {
    throw new TypeError("Array.prototype.map called on null or undefined");
  }

  // Check if callback is a function
  if (typeof callback !== "function") {
    throw new TypeError(callback + " is not a function");
  }
  var newArray = [];
  var len = this.length || 0; // If `this.length` is falsy, use 0

  for (var i = 0; i < len; i++) {
    if (this.hasOwnProperty(i)) {
      newArray[i] = callback.call(thisArg, this[i], i, this); // Pass `thisArg` to the callback
    }
  }

  return newArray;
};

let arr = [1, 2, 3, 4, 5];

// Native example
let nativeMap = arr.map(function (item, index, array) {
  return item * this;
}, 2);
console.log(nativeMap); // Output: [2, 4, 6, 8, 10]

// Polyfill example
let polyfillMap = arr.ownMap(function (item, index, array) {
  return item * this;
}, 2);

console.log(polyfillMap); // Output: [2, 4, 6, 8, 10]
