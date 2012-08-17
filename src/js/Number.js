/* Number
 *
 * This is the number representation class.
 */
cell.Number = (function() {
  var Number = function(data, radix) {
    radix = radix || Number.DEFAULT_RADIX;

    if (data && typeof(data) === 'string') {
      if (data.match(Number.FLOAT_PATTERN)) {
        data = parseFloat(data, radix);
      } else {
        data = parseInt(data, radix);
      }

      if (isNaN(data)) {
        throw("Error: invalid number");
      }
    }

    this.data = data;
  };

  Number.PATTERN = /\-?\d+(\.\d+)?(e\-?\d+)?/;
  Number.FLOAT_PATTERN = /\./;
  Number.DEFAULT_RADIX = 10;

  Number.prototype.eval = function eval() {
    return this;
  };

  Number.prototype.eq = function eq(other) {
    return this.data === other.data ? cell.TRUE : cell.FALSE;
  };

  Number.prototype.plus = function plus(other) {
    return new Number(this.data + other.data);
  };

  Number.prototype.minus = function minus(other) {
    return new Number(this.data - other.data);
  };

  Number.prototype.mult = function mult(other) {
    return new Number(this.data * other.data);
  };

  Number.prototype.div = function div(other) {
    return new Number(this.data / other.data);
  };

  Number.prototype.mod = function mod(other) {
    return new Number(this.data % other.data);
  };

  Number.prototype.toString = function() {
    return this.data.toString();
  };

  return Number;
})();

