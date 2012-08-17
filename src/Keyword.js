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

  Keyword.get = function get(name) {
    var keyword = Keyword.interned[name];
    if (!keyword) {
      keyword = new Keyword(name);
      Keyword.interned[name] = keyword;
    }

    return keyword;
  };

  // inherit from Atom
  Keyword.prototype = new cell.Atom();

  Keyword.prototype.eval = function eval(env) {
    return this;
  };

  Keyword.prototype.eq = function eq(other) {
    return this === other ? cell.TRUE : cell.FALSE;
  };

  return Keyword;
})();
