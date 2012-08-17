/* Environment
 *
 * This is the environment representation class. Environment is a
 * dynamic, hierarchical binding space.
 */
cell.Environment = (function() {
  var Environment = function(parent) {
    this.parent = parent || null;
    this.bindings = {};
  };

  /* Returns the value for the binding name, if present. Searches
  parent bindings also." */
  Environment.prototype.get = function get(name) {
    // If we don't find the binding here, go up to the parent binding
    return this.bindings[name] ||
      (this.parent &&
       this.parent.get(name));
  };

  /* Puts the binding and value into the environment. */
  Environment.prototype.set = function set(name, val) {
    this.bindings[name] = val;
    return val;
  };

  /* Sets all of the bindings by name to the values specified in
   * order */
  Environment.prototype.setAll = function setAll(env, names, vals) {
    if (names.first()) {
      this.set(names.first(), vals.first().eval(env));
      this.setAll(env, names.rest(), vals.rest());
    }
  };

  return Environment;
})();
