/* Error
 *
 * This is the error representation class.
 */
cblisp.Error = (function() {
  var Error = {};

  Error.assertArgCount = function assertArgCount(args, count) {
    if (args.length !== count) {
      raise("Expected " + count + " arguments, got " + args.length);
    }
  }

  return Error;
})();

