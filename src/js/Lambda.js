/* Lambda
 *
 * This is the lambda representation class.
 */
cell.Lambda = (function() {
  var Lambda = function Lambda(env, argNames, forms) {
    this.env = env;
    this.argNames = argNames;
    this.argCount = argNames.count();
    this.forms = forms;
  };

  Lambda.prototype.eval = function eval(callEnv, args) {
    cell.Error.assertArgCount(args, this.argCount);

    var env = new cell.Environment(this.env);
    env.setAll(callEnv, this.argNames, args);

    var result = null;
    this.forms.each(function(form) {
      result = form.eval(env);
    });

    return result;
  };

  Lambda.prototype.toString = function() {
    var args = [];
    this.argNames.each(function(arg) {
      args.push(arg);
    });

    return "<Function: " + args.join(", ") + ">"; 
  };

  return Lambda;
})();

