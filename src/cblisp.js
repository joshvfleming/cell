var cblisp = (function() {
  var Lisp = {};

  Lisp.cond = function cond(env, args) {
    return "TODO";
  };

  Lisp.eq = function eq(env, args) {
    return "TODO";
  };

  Lisp.quote = function quote(env, args) {
    return "TODO";
  };

  Lisp.first = function first(env, args) {
    return "TODO";
  };

  Lisp.rest = function rest(env, args) {
    return "TODO";
  };

  Lisp.cons = function cons(env, args) {
    return "TODO";
  };

  Lisp.atom = function atom(env, args) {
    cblist.Error.assertArgCount(args, 1);

    var val = args[0].eval(env);

    if (val === cblisp.Atom.TRUE ||
        val === cblisp.Atom.FALSE ||
        (val.isAtom && val.isAtom())) {
      return cblisp.Atom.TRUE;
    }

    return cblisp.Atom.FALSE;
  };

  Lisp.def = function def(env, args) {
    return "TODO";
  };

  return Lisp;
})();
