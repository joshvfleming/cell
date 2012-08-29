var cell = (function() {
  var cell = {
    init: function() {
      var env = new cell.Environment();
      cell.environment = env;
      
      // Set initial bindings
      env.set('cond', new cell.Function(cell.cond));
      env.set('eq', new cell.Function(cell.eq));
      env.set('quote', new cell.Function(cell.quote));
      env.set('first', new cell.Function(cell.first));
      env.set('rest', new cell.Function(cell.rest));
      env.set('cons', new cell.Function(cell.cons));
      env.set('atom', new cell.Function(cell.atom));
      env.set('def', new cell.Function(cell.def));
      env.set('println', new cell.Function(cell.println));

      // Lambda
      env.set('lambda', new cell.Function(function lambda(env, args) {
        return new cell.Lambda(env, args.first(), args.rest());
      }));

      // Special symbols
      env.set('true', cell.TRUE);
      env.set('nil', cell.FALSE);

      // Number builtins
      env.set('+', new cell.Function(cell.plus));
      env.set('-', new cell.Function(cell.minus));
      env.set('*', new cell.Function(cell.mult));
      env.set('/', new cell.Function(cell.div));
      env.set('mod', new cell.Function(cell.mod));
    }
  };

  // Built-in functions and helpers
  // These functions wrap the core datastructures' functions and
  // control how forms are unrolled and eval'd

  // Determines 'truthiness'
  cell.isTruthy = function(pred) {
    return (cell.FALSE.eq(pred).empty && cell.FALSE.eq(pred).empty()); 
  };

  // cond
  cell.cond = function cond(env, args) {
    cell.Error.assertEvenArgCount(args);

    var curr = args;
    while (curr.first()) {
      var pred = curr.first().eval(env);

      if (cell.isTruthy(pred)) {
        return curr.rest().first().eval(env);
      }

      curr = curr.rest().rest();
    }

    return cell.FALSE;
  };

  // eq
  cell.eq = function eq(env, args) {
    cell.Error.assertArgCount(args, 2);
    return args.first().eval(env).eq(args.rest().first().eval(env));
  };

  // quote
  cell.quote = function quote(env, args) {
    cell.Error.assertArgCount(args, 1);
    return args.first();
  };

  // first
  cell.first = function first(env, args) {
    cell.Error.assertArgCount(args, 1);
    return args.first().eval(env).first().eval(env);
  };

  // rest
  cell.rest = function rest(env, args) {
    cell.Error.assertArgCount(args, 1);
    return args.first().eval(env).rest();
  };

  // cons
  cell.cons = function cons(env, args) {
    cell.Error.assertArgCount(args, 2);
    return cell.Cell.cons(args.first().eval(env),
                          args.rest().first().eval(env));
  };

  // atom
  cell.atom = function atom(env, args) {
    cell.Error.assertArgCount(args, 1);

    var val = args.first().eval(env);

    if (val === cell.TRUE ||
        val === cell.FALSE ||
        (val.isAtom && val.isAtom())) {
      return cell.TRUE;
    }

    return cell.FALSE;
  };

  // def
  cell.def = function def(env, args) {
    cell.Error.assertArgCount(args, 2);

    var name = args.first();
    var val = args.rest().first().eval(env);
    env.set(name, val);

    return val;
  };

  // println
  cell.println = function println(env, args) {
    var val = args.first().eval(env).toString();
    console.log(val);
    return val;
  };

  // reduce helper function. This is not exported.
  cell.reduce = function reduce(env, fn, args) {
    var acc = args.first().eval(env);

    args.rest().each(function(arg) {
      acc = fn.call(acc, arg.eval(env));
    });

    return acc;
  };

  // Math functions
  cell.plus = function plus(env, args) {
    return cell.reduce(env, cell.Number.prototype.plus, args);
  };

  cell.minus = function minus(env, args) {
    return cell.reduce(env, cell.Number.prototype.minus, args);
  };

  cell.mult = function mult(env, args) {
    return cell.reduce(env, cell.Number.prototype.mult, args);
  };

  cell.div = function div(env, args) {
    return cell.reduce(env, cell.Number.prototype.div, args);
  };

  cell.mod = function mod(env, args) {
    return cell.reduce(env, cell.Number.prototype.mod, args);
  };

  return cell;
})();

// support node.js
if (typeof global !== 'undefined') {
   global.cell = cell;
}
