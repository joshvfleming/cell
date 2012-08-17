/* Symbol
 *
 * This is the symbol representation class.
 */
cell.Symbol = (function() {
  var Symbol = function Symbol(data) {
    this.data = data || null;
  };

  Symbol.PATTERN = /.+/;

  // inherit from Atom
  Symbol.prototype = new cell.Atom();

  Symbol.prototype.eval = function eval(env) {
    return env.get(this.data);
  };

  Symbol.prototype.eq = function eq(other) {
    return this.data === other.data;
  };

  Symbol.prototype.toString = function toString() {
    return this.data;
  };

  // special symbols
  cell.TRUE = new Symbol("true");
  cell.FALSE = new Symbol("false");

  return Symbol;
})();
