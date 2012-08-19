/* Keyword
 *
 * This is the symbol representation class.
 */
cell.Keyword = (function() {
  var Keyword = function Keyword(name) {
    this.name = name;
  };

  Keyword.PATTERN = /\:.+/;
  Keyword.interned = {};

  // Keywords are interned, so we first look to see if there's an
  // existing instance of the specified keyword.
  Keyword.get = function get(name) {
    var keyword = Keyword.interned[name];
    if (!keyword) {
      keyword = new Keyword(name);
      Keyword.interned[name] = keyword;
    }

    return keyword;
  };

  // Inherit from Atom
  Keyword.prototype = new cell.Atom();

  // Keyword eval. Keywords eval to themselves.
  Keyword.prototype.eval = function eval(env) {
    return this;
  };

  // Tests for equality between Keywords
  Keyword.prototype.eq = function eq(other) {
    return this === other ? cell.TRUE : cell.FALSE;
  };

  // Returns the string representation for a Keyword
  Keyword.prototype.toString = function() {
    return this.name;
  };

  return Keyword;
})();
