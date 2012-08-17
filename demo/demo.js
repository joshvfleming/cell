/* cell demo
 *
 * This is the demo code
 */
cell.demo = (function() {
  var demo = {};

  demo.init = function init() {
    cell.init();
    cell.Loader.require('/cell/core.cell');

    demo.bindEvents();
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
  };

  demo.evalClicked = function evalClicked(e) {
    e.preventDefault();

    var input = document.getElementById('console');
    var consoleOutput = document.getElementById('console-output');
    var val = input.value;
    input.value = '';

    var reader = new cell.Reader(val);
    var form = null;
    var output = null;
    while (form = reader.read()) {
      output = form.eval(cell.environment);
    }

    consoleOutput.value = consoleOutput.value + "\n" +
      val + "\n" +
      output + "\n";

    consoleOutput.scrollTop = consoleOutput.clientHeight;
  };

  // init on page ready
  demo.on(document, 'DOMContentLoaded', function() {
    demo.init();
  });

  return demo;
})();
