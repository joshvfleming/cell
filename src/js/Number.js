/* Number
 *
 * This is the number representation class.
 */
cell.Number = (function() {
  var Number = function(data, radix) {
    radix = radix || Number.DEFAULT_RADIX;

    // try to parse out the number's value if a string was passed
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

  Number.PATTERN = /^\-?\d+(\.\d+)?(e\-?\d+)?$/;
  Number.FLOAT_PATTERN = /\./;
  Number.DEFAULT_RADIX = 10;

  // Number eval. Numbers eval to themselves.
  Number.prototype.eval = function eval() {
    return this;
  };

  // Tests for equality between Numbers
  Number.prototype.eq = function eq(other) {
    return this.data === other.data ? cell.TRUE : cell.FALSE;
  };

  // Performs the '+' mathematical operation between two numbers
  Number.prototype.plus = function plus(other) {
    return new Number(this.data + other.data);
  };

  // Performs the '-' mathematical operation between two numbers
  Number.prototype.minus = function minus(other) {
    return new Number(this.data - other.data);
  };

  // Performs the '*' mathematical operation between two numbers
  Number.prototype.mult = function mult(other) {
    return new Number(this.data * other.data);
  };

  // Performs the '/' mathematical operation between two numbers
  Number.prototype.div = function div(other) {
    return new Number(this.data / other.data);
  };

  // Performs the '%' mathematical operation between two numbers
  Number.prototype.mod = function mod(other) {
    return new Number(this.data % other.data);
  };

  // Returns the string representation for a Number
  Number.prototype.toString = function() {
    return this.data.toString();
  };

  return Number;
})();

