/* Symbol
 *
 * This is the symbol representation class.
 */
cell.Symbol = (function() {
  var Symbol = function Symbol(data) {
    this.data = data || null;
  };

  Symbol.PATTERN = /.+/;

  // Inherit from Atom
  Symbol.prototype = new cell.Atom();

  // Symbol eval. Returns the result of looking up the symbol in the
  // given Environment
  Symbol.prototype.eval = function eval(env) {
    var val = env.get(this.data);
    if (!val) {
      throw("Error: undefined symbol: " + this.data);
    }

    return val;
  };

  // Tests for equality between Symbols
  Symbol.prototype.eq = function eq(other) {
    return this.data === other.data ? cell.TRUE : cell.FALSE;
  };

  // Returns the string representations for a Symbol
  Symbol.prototype.toString = function toString() {
    return this.data;
  };

  // special symbols
  cell.TRUE = new Symbol("true");
  cell.FALSE = new cell.Cell();

  return Symbol;
})();
