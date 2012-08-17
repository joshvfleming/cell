/* Lambda
 *
 * This is the lambda representation class.
 */
cell.Lambda = (function() {
  var Lambda = function Lambda(env, argNames, forms) {
    this.argNames = argNames;
    this.argCount = argnames.count();
    this.forms = forms;
  };

  Lambda.prototype.eval = function eval(env, args) {
    cell.Error.assertArgCount(args, this.argCount);

    var env = new cell.Environment(env);
    env.setAll(this.argNames, args);

    this.forms.each(function(form) {
      form.eval(env);
    });
  };

  return Lambda;
})();

