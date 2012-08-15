/* Environment
 *
 * This is the environment representation class. Environment is a
 * dynamic, hierarchical binding space.
 */
cblisp.Environment = (function() {
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

  return Environment;
})();
