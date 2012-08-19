/* String
 *
 * This is the string representation class.
 */
cell.String = (function() {
  var String = function String(data) {
    this.data = data || null;
  };

  String.PATTERN = /"/;

  // Inherit from Atom
  String.prototype = new cell.Atom();

  // String eval. Strings eval to themselves.
  String.prototype.eval = function eval() {
    return this;
  };

  // Tests for equality between Strings
  String.prototype.eq = function eq(other) {
    return this.data === other.data ? cell.TRUE : cell.FALSE;
  };

  // Returns the string representation for a String
  String.prototype.toString = function() {
    return this.data;
  };

  return String;
})();
