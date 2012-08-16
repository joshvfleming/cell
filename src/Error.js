/* Error
 *
 * This is the error representation class.
 */
cell.Error = (function() {
  var Error = {};

  Error.assertArgCount = function assertArgCount(args, count) {
    if (args.length !== count) {
      throw("Expected " + count + " arguments, got " + args.length);
    }
  }

  Error.assertEvenArgCount = function assertEvenArgCount(args) {
    if (args.length % 2 !== 0) {
      throw("Expected an even number arguments, got " + args.length);
    }
  }

  return Error;
})();

