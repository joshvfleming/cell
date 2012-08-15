/* Number
 *
 * This is the number representation class.
 */
cblisp.Number = (function() {
  var Number = function(data) {
    this.data = data || null;
  };

  Number.PATTERN = /\-?\d+(\.\d+)?(e\-?\d+)?/;

  Number.prototype.eval = function eval() {
    return this.data;
  };

  return Number;
})();

