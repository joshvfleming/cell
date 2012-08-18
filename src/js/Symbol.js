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
    var val = env.get(this.data);
    if (!val) {
      throw("Error: undefined symbol: " + this.data);
    }

    return val;
  };

  Symbol.prototype.eq = function eq(other) {
    return this.data === other.data ? cell.TRUE : cell.FALSE;
  };

  Symbol.prototype.toString = function toString() {
    return this.data;
  };

  // special symbols
  cell.TRUE = new Symbol("true");
  cell.FALSE = new cell.Cell();

  return Symbol;
})();
