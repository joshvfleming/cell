var expect = require('chai').expect;

describe("Core", function() {
  var env = null;

  beforeEach(function() {
    cell.init();
    env = cell.environment;
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

    r = new cell.Reader("(def myfunc (=> (a b) (+ a b)))");
    f = r.read()

    expect(f.eval(cell.environment).forms.empty()).to.equal(false);

    r = new cell.Reader("(myfunc 2 3)");
    f = r.read()

    expect(f.eval(cell.environment).data).to.equal(5);
  });
});
