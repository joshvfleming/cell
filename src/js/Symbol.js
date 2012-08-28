/* Symbol
 *
 * This is the symbol representation class.
 */
cell.Symbol = (function() {
  var Symbol = function Symbol(data) {
    // call base class constructor
    cell.Atom.call(this, data || null);
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

  // special symbols
  cell.TRUE = new Symbol("true");
  cell.FALSE = new cell.Cell();

  return Symbol;
})();
