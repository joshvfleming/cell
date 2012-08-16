/* Number
 *
 * This is the number representation class.
 */
cell.Number = (function() {
  var Number = function(data) {
    this.data = data || null;
  };

  Number.PATTERN = /\-?\d+(\.\d+)?(e\-?\d+)?/;

  Number.prototype.eval = function eval() {
    return this;
  };

  Number.prototype.eq = function eq(other) {
    return this.data === other.data;
  }

  return Number;
})();

