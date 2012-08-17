/* Loader
 *
 * This is the file loader class.
 */
cell.Loader = (function() {
  var Loader = function Loader(){};

  Loader.get = function load(path, opts) {
    var xhr = new XMLHttpRequest();

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
