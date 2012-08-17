var cell = (function() {
  var cell = {
    init: function() {
      var env = new cell.Environment();
      cell.environment = env;
      
      // set initial bindings
      env.set('cond', new cell.Function(cell.cond));
      env.set('eq', new cell.Function(cell.eq));
      env.set('quote', new cell.Function(cell.quote));
      env.set('first', new cell.Function(cell.first));
      env.set('rest', new cell.Function(cell.rest));
      env.set('cons', new cell.Function(cell.cons));
      env.set('atom', new cell.Function(cell.atom));
      env.set('def', new cell.Function(cell.def));

      // lambda
      env.set('lambda', new cell.Function(function lambda(env, args) {
        return new cell.Lambda(env, args.first(), args.rest());
      }));

      // special symbols
      env.set('true', cell.TRUE);
      env.set('false', cell.FALSE);

      // number builtins
      env.set('+', new cell.Function(cell.plus));
      env.set('-', new cell.Function(cell.minus));
      env.set('*', new cell.Function(cell.mult));
      env.set('/', new cell.Function(cell.div));
      env.set('mod', new cell.Function(cell.mod));
    }
  };

  cell.cond = function cond(env, args) {
    cell.Error.assertEvenArgCount(args);

    var curr = args;
    while (curr.first()) {
      var pred = curr.first().eval(env);

      if (pred.data === cell.TRUE.data) {
        return curr.rest().first().eval(env);
      }

      curr = curr.rest().rest();
    }

    return cell.FALSE;
  };

  cell.eq = function eq(env, args) {
    cell.Error.assertArgCount(args, 2);
    return args.first().eval(env).eq(args.rest().first().eval(env));
  };

  cell.quote = function quote(env, args) {
    cell.Error.assertArgCount(args, 1);
    return args.first();
  };

  cell.first = function first(env, args) {
    cell.Error.assertArgCount(args, 1);
    return args.first().eval(env).first().eval(env);
  };

  cell.rest = function rest(env, args) {
    cell.Error.assertArgCount(args, 1);
    return args.first().eval(env).rest();
  };

  cell.cons = function cons(env, args) {
    cell.Error.assertArgCount(args, 2);
    return cell.Cell.cons(args.first().eval(env),
                          args.first().rest().first().eval(env));
  };

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

  cell.def = function def(env, args) {
    cell.Error.assertArgCount(args, 2);

    var name = args.first();
    var val = args.rest().first().eval(env);
    env.set(name, val);

    return val;
  };

  cell.reduce = function reduce(env, fn, args) {
    var acc = args.first().eval(env);

    args.rest().each(function(arg) {
      acc = fn.call(acc, arg.eval(env));
    });

    return acc;
  };

  // math functions
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
