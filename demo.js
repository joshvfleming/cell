/* cell demo
 *
 * This is the demo code
 */
cell.demo = (function() {
  var demo = {};
  var history = [];
  var historyCursor = 0;

  var ENTER = 13;
  var UP = 38;
  var DOWN = 40;

  var INPUT_QUOTE = ">>> ";

  // Startup
  demo.init = function init() {
    var console = document.getElementById('console');

    cell.init();
    cell.Loader.require('cell/core.cell');

    demo.bindEvents();
    
    console.focus();
  };

  // This is a replacement for the jQuery 'on' cross-browser event
  // binding API
  demo.on = function on(el, eventName, handler) {
    if (el.addEventListener) {
      el.addEventListener(eventName, handler, false);
    } else {
      el.attachEvent('on' + eventName, handler);
    }
  };

  // Bind all of the view's events
  demo.bindEvents = function bindEvents() {
    var evalBtn = document.getElementById('eval-btn');
    demo.on(evalBtn, 'click', demo.evalClicked);

    var console = document.getElementById('console');
    demo.on(console, 'keydown', demo.consoleKeydown);

    var examples = document.getElementsByClassName('example-btn');
    for (var i=0, l=examples.length; i<l; i++) {
      var ex = examples[i];
      demo.on(ex, 'click', demo.exampleClicked);
    }
  };

  // Evals the code and displays the result
  demo.eval = function(data) {
    var consoleOutput = document.getElementById('console-output');

    try {
      var reader = new cell.Reader(data);
      var form = null;
      var output = null;
      while (form = reader.read()) {
        output = form.eval(cell.environment);
      }
    } catch (e) {
      output = e;
    }

    consoleOutput.value = consoleOutput.value + "\n" +
      INPUT_QUOTE + data.replace(/\n/g, '\n' + INPUT_QUOTE) + "\n" +
      output + "\n";

    consoleOutput.scrollTop = consoleOutput.scrollHeight;
  };

  // Click handler for the "eval" button
  demo.evalClicked = function evalClicked(e) {
    e.preventDefault();

    var input = document.getElementById('console');
    var val = input.value;
    input.value = '';

    // Put eval on the event loop, so that potentially slow evals do
    // not block the UI
    setTimeout(function() {
      demo.eval(val);

      history.push(val);
      historyCursor = 0;
    }, 1);

    input.focus();
  };

  // Moves the previously entered command into the console input field
  demo.prevHistory = function() {
    if (!history.length) {
      return;
    }

    historyCursor++;

    var input = document.getElementById('console');
    var pos = history.length - historyCursor;

    if (pos <= 0) {
      pos = 0;
      historyCursor = history.length;
    }
    
    var curr = history[pos];
    input.value = curr;
  };

  // Moves the next entered command into the console input field
  demo.nextHistory = function() {
    if (!history.length) {
      return;
    }

    historyCursor--;

    var input = document.getElementById('console');
    var pos = history.length - historyCursor;

    if (pos >= (history.length - 1)) {
      pos = history.length - 1;
      historyCursor = 0;
    }

    var curr = history[pos];
    input.value = curr;
  };

  // Handler for console key down
  demo.consoleKeydown = function(e) {
    switch(e.keyCode) {
      case ENTER:
      demo.evalClicked(e);
      break;

      case UP:
      demo.prevHistory();
      break;

      case DOWN:
      demo.nextHistory();
      break;
    }
  };

  // Loads the example program at the given path, and evals it
  demo.loadAndEvalExample = function(path) {
    var input = document.getElementById('console');

    cell.Loader.get(path, {
      success: function(data) {
        demo.eval(data);
        input.focus();

        demo.removeLoaders();
      },
      error: function(data) {
        // TODO output error message
        input.focus();

        demo.removeLoaders();
      }});
  };

  // Click handler for the example links
  demo.exampleClicked = function(e) {
    e.preventDefault();

    var button = e.target;

    demo.appendLoader(button.parentNode);

    demo.loadAndEvalExample(button.href);
  };

  // appends a loader to the element
  demo.appendLoader = function(parent) {
    var loader = document.createElement('img');
    loader.className = 'loader';
    loader.src = 'loader.gif';
    parent.appendChild(loader);
  };

  // removes page loaders
  demo.removeLoaders = function() {
    var loaders = document.getElementsByClassName('loader');
    for (var i=0, l=loaders.length; i<l; i++) {
      var loader = loaders[i];

      loader.parentNode.removeChild(loader);
    }
  };

  // init on page ready
  demo.on(document, 'DOMContentLoaded', function() {
    demo.init();
  });

  return demo;
})();
