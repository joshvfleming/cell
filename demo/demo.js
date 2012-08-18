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
  };

  demo.evalClicked = function evalClicked(e) {
    e.preventDefault();

    var input = document.getElementById('console');
    var consoleOutput = document.getElementById('console-output');
    var val = input.value;
    input.value = '';

    try {
      var reader = new cell.Reader(val);
      var form = null;
      var output = null;
      while (form = reader.read()) {
        output = form.eval(cell.environment);
      }
    } catch (e) {
      output = e;
    }

    consoleOutput.value = consoleOutput.value + "\n" +
      val + "\n" +
      output + "\n";

    consoleOutput.scrollTop = consoleOutput.clientHeight;
    input.focus();

    history.push(val);
    historyCursor = 0;
  };

  demo.prevHistory = function() {
    if (!history.length) {
      return;
    }

    var input = document.getElementById('console');
    var pos = history.length - historyCursor - 1;

    if (pos <= 0) {
      pos = 0;
    } else {
      historyCursor++;
    }
    
    var curr = history[pos];
    input.value = curr;
  };

  demo.nextHistory = function() {
    if (!history.length) {
      return;
    }

    var input = document.getElementById('console');
    var pos = history.length - historyCursor - 1;

    if (pos >= (history.length - 1)) {
      pos = history.length - 1;
    } else {
      historyCursor--;
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

  // init on page ready
  demo.on(document, 'DOMContentLoaded', function() {
    demo.init();
  });

  return demo;
})();
