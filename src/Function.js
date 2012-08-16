/* Function
 *
 * This is the symbol representation class.
 */
cell.Function = (function() {
  var Function = function(fn) {
    this.fn = fn;
  };

  Function.prototype.eval = function eval(env) {
    return this.fn(env);
  };

  return Function;
})();
