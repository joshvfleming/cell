var cell = (function() {
  var cell = {
    init: function() {
      var env = new cell.Environment();
      cell.environment = env;
      
      env.set('cond', new cell.Function(cell.Lisp.cond));
      env.set('eq', new cell.Function(cell.Lisp.eq));
      env.set('quote', new cell.Function(cell.Lisp.quote));
      env.set('first', new cell.Function(cell.Lisp.first));
      env.set('rest', new cell.Function(cell.Lisp.rest));
      env.set('cons', new cell.Function(cell.Lisp.cons));
      env.set('atom', new cell.Function(cell.Lisp.atom));
      env.set('def', new cell.Function(cell.Lisp.def));
    }
  };

  cell.Lisp = {};
  var Lisp = cell.Lisp;

  Lisp.cond = function cond(env, args) {
    cell.Error.assertEvenArgCount(args);

    for (var i=0, l=args.length; i<l; i++) {
      var arg = args[i];
      var pred = arg.first().eval(env);

      if (pred === Lisp.Atom.TRUE) {
        return arg.rest().eval(env);
      }
    }

    return Lisp.Atom.FALSE;
  };

  Lisp.eq = function eq(env, args) {
    cell.Error.assertArgCount(args, 2);
    return args[0].eval(env) === args[1].eval(env);
  };

  Lisp.quote = function quote(env, args) {
    cell.Error.assertArgCount(args, 1);
    return args[0];
  };

  Lisp.first = function first(env, args) {
    cell.Error.assertArgCount(args, 1);
    return args[0].first().eval(env);
  };

  Lisp.rest = function rest(env, args) {
    cell.Error.assertArgCount(args, 1);
    return args[0].rest();
  };

  Lisp.cons = function cons(env, args) {
    cell.Error.assertArgCount(args, 2);
    return Lisp.Cell.cons(args[0].eval(env), args[1].eval(env));
  };

  Lisp.atom = function atom(env, args) {
    cell.Error.assertArgCount(args, 1);

    var val = args[0].eval(env);

    if (val === Lisp.Atom.TRUE ||
        val === Lisp.Atom.FALSE ||
        (val.isAtom && val.isAtom())) {
      return Lisp.Atom.TRUE;
    }

    return Lisp.Atom.FALSE;
  };

  Lisp.def = function def(env, args) {
    cell.Error.assertArgCount(args, 2);

    var name = args[0];
    var val = args[1].eval(env);
    env.set(name, val);

    return val;
  };

  return cell;
})();
