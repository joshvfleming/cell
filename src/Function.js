/* Function
 *
 * This is the symbol representation class.
 */
cblisp.Function = (function() {
  var Function = function(name) {
    this.name = name;
  };

  Function.prototype.eval = function eval(env) {
    return this;
  };

  return Function;
})();
