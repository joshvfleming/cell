/* Lambda
 *
 * This is the lambda representation class.
 */
cell.Lambda = (function() {
  var Lambda = function Lambda(env, argNames, forms) {
    this.env = env;
    this.argNames = argNames || cell.FALSE;
    this.argCount = this.argNames.count();
    this.forms = forms;
  };

  // Lambda eval. Returns the result of eval'ing the Lambda's
  // forms. Environment inherits from the point where the Lambda is
  // defined, which means that we have lexical scope.
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

  // Returns the string representation for a Lambda
  Lambda.prototype.toString = function() {
    var args = [];
    this.argNames.each(function(arg) {
      args.push(arg);
    });

    return "<Function: " + args.join(", ") + ">"; 
  };

  return Lambda;
})();

