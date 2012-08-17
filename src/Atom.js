/* Atom
 *
 * This is the atom representation class.
 */
cell.Atom = (function() {
  var Atom = function Atom(){};

  Atom.TRUE = true;
  Atom.FALSE = false;

  Atom.prototype.isAtom = function isAtom() {
    return true;
  };

  return Atom;
})();
