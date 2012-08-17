/* Atom
 *
 * This is the atom representation class.
 */
cell.Atom = (function() {
  var Atom = {};

  Atom.TRUE = true;
  Atom.FALSE = false;

  /* Symbol
   *
   * This is the symbol representation class.
   */
  Atom.Symbol = (function() {
    var Symbol = function Symbol(data) {
      this.data = data || null;
    };

    Symbol.PATTERN = /.+/;

    Symbol.prototype.eval = function eval(env) {
      return env.get(this.data);
    };

    Symbol.prototype.isAtom = function isAtom() {
      return true;
    };

    Symbol.prototype.eq = function eq(other) {
      return this.data === other.data;
    };

    Symbol.prototype.toString = function toString() {
      return this.data;
    };

    return Symbol;
  })();

  /* String
   *
   * This is the string representation class.
   */
  Atom.String = (function() {
    var String = function String(data) {
      this.data = data || null;
    };

    String.PATTERN = /".+"/;

    String.prototype.eval = function eval() {
      return this;
    };

    String.prototype.isAtom = function isAtom() {
      return true;
    };

    String.prototype.eq = function eq(other) {
      return this.data === other.data;
    };

    return String;
  })();

  /* Keyword
   *
   * This is the symbol representation class.
   */
  Atom.Keyword = (function() {
    var Keyword = function Keyword(name) {
      this.name = name;
    };

    Keyword.PATTERN = /\:.+/;
    Keyword.interned = {};

    Keyword.get = function get(name) {
      var keyword = Keyword.interned[name];
      if (!keyword) {
        keyword = new Keyword(name);
        Keyword.interned[name] = keyword;
      }

      return keyword;
    };

    Keyword.prototype.eval = function eval(env) {
      return this;
    };

    Keyword.prototype.isAtom = function isAtom() {
      return true;
    };

    Keyword.prototype.eq = function eq(other) {
      return this === other;
    };

    return Keyword;
  })();

  return Atom;
})();
