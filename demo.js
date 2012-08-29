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

  demo.init = function init() {
    var console = document.getElementById('console');

    cell.init();
    cell.Loader.require('cell/core.cell');

    demo.bindEvents();
    
    console.focus();
  };

  demo.on = function on(el, eventName, handler) {
    if (el.addEventListener) {
      el.addEventListener(eventName, handler, false);
    } else {
      el.attachEvent('on' + eventName, handler);
    }
  };

  demo.bindEvents = function bindEvents() {
    var evalBtn = document.getElementById('eval-btn');
    demo.on(evalBtn, 'click', demo.evalClicked);

    var console = document.getElementById('console');
    demo.on(console, 'keydown', demo.consoleKeydown);

    var fib = document.getElementById('fib-btn');
    demo.on(fib, 'click', demo.fibClicked);

    var hanoi = document.getElementById('hanoi-btn');
    demo.on(hanoi, 'click', demo.hanoiClicked);
  };

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

  demo.evalClicked = function evalClicked(e) {
    e.preventDefault();

    var input = document.getElementById('console');
    var val = input.value;
    input.value = '';

    demo.eval(val);

    history.push(val);
    historyCursor = 0;

    input.focus();
  };

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

  demo.fibClicked = function(e) {
    e.preventDefault();

    cell.Loader.get('cell/examples/fibonacci.cell', {
      success: function(data) {
        demo.eval(data);
      }});
  };

  demo.hanoiClicked = function(e) {
    e.preventDefault();

    cell.Loader.get('cell/examples/hanoi.cell', {
      success: function(data) {
        demo.eval(data);
      }});
  };

  // init on page ready
  demo.on(document, 'DOMContentLoaded', function() {
    demo.init();
  });

  return demo;
})();
