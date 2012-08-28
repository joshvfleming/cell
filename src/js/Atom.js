/* Atom
 *
 * This is the atom representation class.
 */
cell.Atom = (function() {
  var Atom = function Atom(data) {
    this.data = data;
  };

  Atom.prototype.isAtom = function isAtom() {
    return true;
  };

  // Default test for equality between Atoms
  Atom.prototype.eq = function eq(other) {
    return this.data === other.data ? cell.TRUE : cell.FALSE;
  };

  // Default string representation for an Atom
  Atom.prototype.toString = function toString() {
    return this.data.toString();
  };

  return Atom;
})();
