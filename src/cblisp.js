var cblisp = (function() {
  var Lisp = {};

  Lisp.cond = function cond(env, args) {
    Lisp.Error.assertEvenArgCount(args);

    var condQueue = [];
    for (var i=0, l=args.length; i<l; i++) {
      if (condQueue.length < 2) {
        condQueue.push(args[i]);
      } else {
        var pred = condQueue.shift();
        var val = consQueue.shift();
        if (pred.eval(env) === Lisp.Atom.TRUE) {
          return val.eval(env);
        }
      }
    }

    return Lisp.Atom.FALSE;
  };

  Lisp.eq = function eq(env, args) {
    Lisp.Error.assertArgCount(args, 2);
    return args[0].eval(env) === args[1].eval(env);
  };

  Lisp.quote = function quote(env, args) {
    Lisp.Error.assertArgCount(args, 1);
    return args[0];
  };

  Lisp.first = function first(env, args) {
    Lisp.Error.assertArgCount(args, 1);
    return args[0].first().eval(env);
  };

  Lisp.rest = function rest(env, args) {
    Lisp.Error.assertArgCount(args, 1);
    return args[0].rest();
  };

  Lisp.cons = function cons(env, args) {
    Lisp.Error.assertArgCount(args, 2);
    return Lisp.Cell.cons(args[0].eval(env), args[1].eval(env));
  };

  Lisp.atom = function atom(env, args) {
    Lisp.Error.assertArgCount(args, 1);

    var val = args[0].eval(env);

    if (val === Lisp.Atom.TRUE ||
        val === Lisp.Atom.FALSE ||
        (val.isAtom && val.isAtom())) {
      return Lisp.Atom.TRUE;
    }

    return Lisp.Atom.FALSE;
  };

  Lisp.def = function def(env, args) {
    Lisp.Error.assertArgCount(args, 2);

    var name = args[0];
    var val = args[1].eval(env);
    env.set(name, val);

    return val;
  };

  return Lisp;
})();
