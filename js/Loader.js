/* Loader
 *
 * This is the file loader class.
 * Changed
 */
cell.Loader = (function() {
  var Loader = function Loader(){};

  // Sends a GET request to the given path, returning the results to
  // the "success" callback
  Loader.get = function load(path, opts) {
    var xhr = new XMLHttpRequest();

    // add cachebuster
    var sep = '?';
    if (path.match(/\?/)) {
      sep = '&';
    }
    path = path + sep + 'nc=' + (+new Date());

    var recvFile = function() {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status !== 200) {
        if (opts.error) {
          opts.error(xhr.status);
        }

        return;
      }

      if (opts.success) {
        opts.success(xhr.responseText);
      }
    };

    xhr.onreadystatechange = recvFile;
    xhr.open("GET", path, true);
    xhr.send();
  };

  // Requests the cell source file at the given path, and evals its
  // contents in the current global Environment
  Loader.require = function require(path) {
    Loader.get(path, {
      success: function(data) {
        var reader = new cell.Reader(data);
        var form = null;
        while (form = reader.read()) {
          form.eval(cell.environment);
        }
      },
      error: function() {
        throw("Error: couldn't get file.");
      }
    });
  };

  return Loader;
})();
