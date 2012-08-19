/* Function
 *
 * This is the symbol representation class.
 */
cell.Function = (function() {
  var Function = function(fn) {
    this.fn = fn;
  };

  // Function eval. Returns the result of applying the function, with
  // the remaining list items as arguments
  Function.prototype.eval = function eval(env, args) {
    return this.fn(env, args);
  };

  // Returns the string representation for a Function
  Function.prototype.toString = function() {
    return "<Function>";
  };

  return Function;
})();
