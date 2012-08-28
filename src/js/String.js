/* String
 *
 * This is the string representation class.
 */
cell.String = (function() {
  var String = function String(data) {
    // call base class constructor
    cell.Atom.call(this, data || null);
  };

  String.PATTERN = /"/;

  // Inherit from Atom
  String.prototype = new cell.Atom();

  // String eval. Strings eval to themselves.
  String.prototype.eval = function eval() {
    return this;
  };

  // Returns the string representation for a String
  String.prototype.toString = function() {
    return '"' + this.data + '"';
  };

  return String;
})();
