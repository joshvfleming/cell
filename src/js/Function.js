/* Function
 *
 * This is the symbol representation class.
 */
cell.Function = (function() {
  var Function = function(fn) {
    this.fn = fn;
  };

  Function.prototype.eval = function eval(env, args) {
    return this.fn(env, args);
  };

  Function.prototype.toString = function() {
    return "<Function>";
  };

  return Function;
})();
