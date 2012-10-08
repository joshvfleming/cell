var expect = require('chai').expect;
var fs = require('fs');

describe("Core", function() {
  var env = null;

  beforeEach(function() {
    cell.init();
    env = cell.environment;

    // require the core lib
    var core = fs.readFileSync('src/cell/core.cell', 'utf8');
    var r = new cell.Reader(core);
    var f = null;
    while (f = r.read()) {
      f.eval(cell.environment);
    }
  });

  it("executes simple mathematical operations", function() {
    var r = new cell.Reader("(+ 1 2 3)");
    var f = r.read()
    cell.init()
    expect(f.eval(cell.environment).data).to.equal(6);

    var r = new cell.Reader("(+ 3 4)");
    var f = r.read()
    cell.init()
    expect(f.eval(cell.environment).data).to.equal(7);

    var r = new cell.Reader("(- 14 4)");
    var f = r.read()
    cell.init()
    expect(f.eval(cell.environment).data).to.equal(10);

    var r = new cell.Reader("(* 117 (+ 1 1))");
    var f = r.read()
    cell.init()
    expect(f.eval(cell.environment).data).to.equal(234);

    var r = new cell.Reader("(/ 213 75)");
    var f = r.read()
    cell.init()
    expect(f.eval(cell.environment).data).to.equal(2.84);
  });

  it("executes a simple lambda expression", function() {
    var r = new cell.Reader("((lambda (a) (eq a 2)) 1)");
    var f = r.read()
    cell.init()
    expect(f.eval(cell.environment)).to.equal(cell.FALSE);

    var r = new cell.Reader("((lambda (a) (eq a 2)) 2)");
    var f = r.read()
    cell.init()
    expect(f.eval(cell.environment)).to.equal(cell.TRUE);
  });

  it("returns correct values for all demo expressions", function() {
    var r = new cell.Reader("(+ 2 3)");
    var f = r.read()

    expect(f.eval(cell.environment).data).to.equal(5);

    r = new cell.Reader("(+ 5 (- 11 7) 22)");
    f = r.read()

    expect(f.eval(cell.environment).data).to.equal(31);

    r = new cell.Reader("(inc 1)");
    f = r.read()

    expect(f.eval(cell.environment).data).to.equal(2);

    r = new cell.Reader("(def myfunc (=> (a b) (+ a b)))");
    f = r.read()

    expect(f.eval(cell.environment).forms.empty()).to.equal(false);

    r = new cell.Reader("(myfunc 2 3)");
    f = r.read()

    expect(f.eval(cell.environment).data).to.equal(5);

    r = new cell.Reader("(take 3 '(1 2 3 4))");
    f = r.read()
    var res = f.eval(cell.environment);
    expect(res.count()).to.equal(3);
    expect(res.first().data).to.equal(1);
    expect(res.rest().first().data).to.equal(2);
    expect(res.rest().rest().first().data).to.equal(3);

    r = new cell.Reader("(reduce + 0 (map inc '(1 2 3 4)))");
    f = r.read()
    res = f.eval(cell.environment);
    expect(res.data).to.equal(14);
  });

  it("returns the correct value for the Fibonacci example", function() {
    var fib = fs.readFileSync('src/cell/examples/fibonacci.cell', 'utf8');
    var r = new cell.Reader(fib);
    var f = null;
    var res = null;
    while (f = r.read()) {
      res = f.eval(cell.environment);
    }

    expect(res.data).to.equal(89);
  });

  it("returns the correct value for the Hanoi example", function() {
    var fib = fs.readFileSync('src/cell/examples/hanoi.cell', 'utf8');
    var r = new cell.Reader(fib);
    var f = null;
    var res = null;
    while (f = r.read()) {
      res = f.eval(cell.environment);
    }

    expect(res.count()).to.equal(7);
    expect(res.first().first().data).to.equal(1);
    expect(res.first().rest().first().data).to.equal(':peg3');

    expect(res.rest().first().first().data).to.equal(2);
    expect(res.rest().first().rest().first().data).to.equal(':peg2');

    expect(res.rest().rest().first().first().data).to.equal(1);
    expect(res.rest().rest().first().rest().first().data).to.equal(':peg2');

    expect(res.rest().rest().rest().first().first().data).to.equal(3);
    expect(res.rest().rest().rest().first().rest().first().data)
      .to.equal(':peg3');

    expect(res.rest().rest().rest().rest().first().first().data).to.equal(1);
    expect(res.rest().rest().rest().rest().first().rest().first().data)
      .to.equal(':peg1');

    expect(res.rest().rest().rest().rest().rest().first().first().data)
      .to.equal(2);
    expect(res.rest().rest().rest().rest().rest().first().rest().first().data)
      .to.equal(':peg3');

    expect(res.rest().rest().rest().rest().rest().rest().first().first().data)
      .to.equal(1);
    expect(res.rest().rest().rest().rest().rest().rest().first().rest().first()
           .data).to.equal(':peg3');
  });

  it("returns the correct value for the binomial coefficient example", function() {
    var fib = fs.readFileSync('src/cell/examples/binomial_coefficient.cell', 'utf8');
    var r = new cell.Reader(fib);
    var f = null;
    var res = null;
    while (f = r.read()) {
      res = f.eval(cell.environment);
    }

    expect(res.data).to.equal(10);
  });

  it("handles lexical scope", function() {
    var r = new cell.Reader("(def a 217)");
    var f = r.read()
    f.eval(cell.environment);

    r = new cell.Reader("(def myadd (=> (a) (=> (b) (+ a b))))");
    f = r.read()
    f.eval(cell.environment);

    r = new cell.Reader("(def add-2 (myadd 2))");
    f = r.read()
    f.eval(cell.environment);

    r = new cell.Reader("(add-2 5)");
    f = r.read()
    expect(f.eval(cell.environment).data).to.equal(7);

    r = new cell.Reader("(add-2 17)");
    f = r.read()
    expect(f.eval(cell.environment).data).to.equal(19);

    // using the version of 'a' def'ed in parent env
    r = new cell.Reader("(def myadd2 (=> (b) (+ a b)))");
    f = r.read()
    f.eval(cell.environment);

    r = new cell.Reader("(myadd2 5)");
    f = r.read()
    expect(f.eval(cell.environment).data).to.equal(222);
  });
});
