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

    // call base class constructor
    cell.Atom.call(this, data);
  };

  Number.PATTERN = /^\-?\d+(\.\d+)?(e\-?\d+)?$/;
  Number.FLOAT_PATTERN = /\./;
  Number.DEFAULT_RADIX = 10;

  // Number eval. Numbers eval to themselves.
  Number.prototype.eval = function eval() {
    return this;
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

  // TODO this is a temporary hack to get eval working
  Number.prototype.first = function first() {
    return this.data;
  };

  // Tests for equality between numbers
  Number.prototype.eq = function eq(other) {
    return this.data === other.data ? cell.TRUE : cell.FALSE;
  };

  // Returns the string representation for a Number
  Number.prototype.toString = function toString() {
    return this.data.toString();
  };

  return Number;
})();

