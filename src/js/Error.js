/* Error
 *
 * This is the error representation class.
 */
cell.Error = (function() {
  var Error = {};

  Error.assertArgCount = function assertArgCount(args, count) {
    var argCount = args.count();
    if (argCount !== count) {
      throw("Expected " + count + " arguments, got " + argCount);
    }
  }

  Error.assertEvenArgCount = function assertEvenArgCount(args) {
    var argCount = args.count();
    if (argCount % 2 !== 0) {
      throw("Expected an even number arguments, got " + argCount);
    }
  }

  return Error;
})();

