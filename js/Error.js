/* Error
 *
 * This is the error representation class.
 */
cell.Error = (function() {
  var Error = {};

  // Performs basic pluralization
  var pluralize = function(word, count) {
    if (count === 1) {
      return word;
    }

    return word + "s";
  };

  // Assert that args match to expected count
  Error.assertArgCount = function assertArgCount(args, count) {
    var argCount = args.count();
    if (argCount !== count) {
      throw("Error: expected " + count +
            " " + pluralize("argument", count) +
            ", got " + argCount);
    }
  }

  // Assert that args have an even arg count
  Error.assertEvenArgCount = function assertEvenArgCount(args) {
    var argCount = args.count();
    if (argCount % 2 !== 0) {
      throw("Error: expected an even number of arguments, got " + argCount);
    }
  }

  return Error;
})();

