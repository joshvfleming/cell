/* Cell
 *
 * This is the cell representation class.
 */
cell.Cell = (function() {
  var Cell = function(left, right) {
    this.left = left || null;
    this.right = right || null;
  };

  Cell.cons = function(left, right) {
    var cell = new Cell(left, right);
    return cell;
  };

  Cell.fromArray = function(arr) {
    var arrDup = arr.slice();
    var curr = arrDup.shift();

    if (curr) {
      return Cell.cons(curr, Cell.fromArray(arrDup));
    } 

    return null;
  };

  /* Returns the head, or first element of the list. */
  Cell.prototype.first = function first() {
    return this.left;
  };

  /* Returns the rest of the list after the first element. None of the
   * elements are evaluated. */
  Cell.prototype.rest = function rest() {
    return this.right || new Cell();
  };

  /* Constructs a new list by adding the given value onto the current
   * list. */
  Cell.prototype.cons = function cons(val) {
    return Cell.cons(val, this);
  };

  return Cell;
})();

