/* List
 *
 * This is the list representation class.
 */
cblisp.List = (function() {
  var List = function(data) {
    this.data = data || [];
  };

  /* Returns the head, or first element of the list. */
  List.prototype.first = function first() {
    return this.data[0] || null;
  };

  /* Returns the rest of the list after the first element. None of the
   * elements are evaluated. */
  List.prototype.rest = function rest() {
    return new List(this.data.slice(1, this.data.length));
  };

  /* Constructs a new list by adding the given value onto the current
   * list. */
  List.prototype.cons = function cons(v) {
    // slice the full array to make a clone
    var data = this.data.slice(0, this.data.length);
    data.splice(0, 0, v)

    return new List(data);
  }

  return List;
})();

