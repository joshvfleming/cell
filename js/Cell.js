/* Cell
 *
 * This is the cell representation class.
 */
cell.Cell = (function() {
  var Cell = function(left, right) {
    this.left = left || null;
    this.right = right || null;
  };

  // Constructs a new Cell from the two items
  Cell.cons = function(left, right) {
    var cell = new Cell(left, right);
    return cell;
  };

  // Constructs a series of linked Cells from the given array of items
  Cell.fromArray = function(arr) {
    var arrDup = arr.slice();
    var curr = arrDup.shift();

    if (curr) {
      return Cell.cons(curr, Cell.fromArray(arrDup));
    } 

    return new cell.Cell();
  };

  // Returns the head, or first element of the list.
  Cell.prototype.first = function first() {
    return this.left;
  };

  // Returns the rest of the list after the first element. None of the
  // elements are evaluated.
  Cell.prototype.rest = function rest() {
    return this.right || new Cell();
  };

  // Constructs a new list by adding the given value onto the current
  // list.
  Cell.prototype.cons = function cons(val) {
    return Cell.cons(val, this);
  };

  // Cells are eval'd as function calls.
  Cell.prototype.eval = function eval(env) {
    var fnSym = this.first().eval(env);

    return fnSym.eval(env, this.rest());
  };

  // Returns a count of list items.
  Cell.prototype.count = function count() {
    var c = 0;

    this.each(function() {
      c++;
    });

    return c;
  };

  // Calls the callback once for each item in the list.
  Cell.prototype.each = function each(callback) {
    var ret = null;

    if (this.first()) {
      ret = callback(this.first());

      // Provide a way to escape the loop
      if (ret === false) {
        return;
      }
    }

    var curr = this.rest();
    while (curr && curr.first()) {
      ret = callback(curr.first());

      if (ret === false) {
        return;
      }

      curr = curr.rest();
    }

    return;
  };

  // Determines whether the list is empty
  Cell.prototype.empty = function() {
    return !this.left && !this.right;
  };

  // Tests for equality between Cells
  Cell.prototype.eq = function(other) {
    var equal = cell.FALSE;

    // Only test equality with other cells
    if (!other.first) {
      return cell.FALSE;
    }

    // Case of empty list
    if (this.empty()) {
      return other.empty() ? cell.TRUE : cell.FALSE;
    }

    // other is empty
    if (other.empty()) {
      return cell.FALSE;
    }

    equal = this.first().eq(other.first());
    var cmp = equal.eq(cell.TRUE);
    if (!cmp.empty || !cmp.empty()) {
      equal = this.rest().eq(other.rest());
    }

    return equal;
  };

  // Return the string representations for a Cell
  Cell.prototype.toString = function() {
    if (this.empty()) {
      return "nil";
    }

    var items = [];
 
    this.each(function(item) {
      items.push(item.toString());
    });

    return '(' + items.join(' ') + ')';
  };

  return Cell;
})();

