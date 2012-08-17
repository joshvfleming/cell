/* String
 *
 * This is the string representation class.
 */
cell.String = (function() {
  var String = function String(data) {
    this.data = data || null;
  };

  String.PATTERN = /".+"/;

  // inherit from Atom
  String.prototype = new cell.Atom();

  String.prototype.eval = function eval() {
    return this;
  };

  String.prototype.eq = function eq(other) {
    return this.data === other.data ? cell.TRUE : cell.FALSE;
  };

  String.prototype.toString = function() {
    return this.data;
  };

  return String;
})();
