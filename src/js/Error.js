/* Error
 *
 * This is the error representation class.
 */
cell.Error = (function() {
  var Error = {};

  var pluralize = function(word, count) {
    if (count === 1) {
      return word;
    }

    return word + "s";
  };

  Error.assertArgCount = function assertArgCount(args, count) {
    var argCount = args.count();
    if (argCount !== count) {
      throw("Error: expected " + count +
            " " + pluralize("argument", count) +
            ", got " + argCount);
    }
  }

  Error.assertEvenArgCount = function assertEvenArgCount(args) {
    var argCount = args.count();
    if (argCount % 2 !== 0) {
      throw("Error: expected an even number of arguments, got " + argCount);
    }
  }

  return Error;
})();

