var expect = require('chai').expect;

describe("Reader", function() {
  var env = null;

  beforeEach(function() {
    cell.init();
    env = cell.environment;
  });

  it("produces a valid form from simple input strings", function() {
    var r = new cell.Reader("(eq 1 2)");
    var f = r.read();

    expect(f.count()).to.equal(3);

    var token = f.first();
    expect(token.data).to.equal('eq');

    token = f.rest().first();
    expect(token.data).to.equal(1);

    token = f.rest().rest().first();
    expect(token.data).to.equal(2);

    r = new cell.Reader("(+ 1 3 0)");
    f = r.read();

    expect(f.count()).to.equal(4)
    expect(f.rest().rest().rest().first().data).to.equal(0);

    r = new cell.Reader("(=> () 2)");
    f = r.read();

    expect(f.first().data).to.equal('lambda');
    expect(f.rest().first().eq(cell.FALSE)).to.equal(cell.TRUE);
    expect(f.rest().rest().first().data).to.equal(2);

  });

  it("handles single-value input", function() {
    var r = new cell.Reader("3");
    var f = r.read();

    expect(f.data, 3);

    var r = new cell.Reader("'(1 2 3)");
    var f = r.read();

    expect(f.count()).to.equal(2);
    expect(f.first().data).to.equal('quote');
  });

  it("correctly reads keyword names with numbers", function() {
    var r = new cell.Reader("(def test :test2)");
    var f = r.read();

    expect(f.count()).to.equal(3);

    var token = f.first();
    expect(token.data).to.equal('def');

    token = f.rest().first();
    expect(token.data).to.equal('test');

    token = f.rest().rest().first();
    expect(token.name).to.equal(':test2');
  });

  it("handles nested expressions", function() {
    var r = new cell.Reader("(=> (a b) (+ a b))");
    var f = r.read();

    expect(f.count()).to.equal(3);

    var token = f.first();
    expect(token.data).to.equal('lambda');

    token = f.rest().first().first();
    expect(token.data).to.equal('a');

    token = f.rest().first().rest().first();
    expect(token.data).to.equal('b');

    token = f.rest().rest().first().first();
    expect(token.data).to.equal('+');

    token = f.rest().rest().first().rest().first();
    expect(token.data).to.equal('a');

    token = f.rest().rest().first().rest().rest().first();
    expect(token.data).to.equal('b');
  });

  it("detects unbalanced parens", function() {
    var r = new cell.Reader("(a b (c d))");

    var read = function() {
      return r.read();
    }

    expect(read).not.to.throw();

    r = new cell.Reader("(a b (c d) (e f)");
    expect(read).to.throw();

    r = new cell.Reader("(a b (");
    expect(read).to.throw();

    r = new cell.Reader("(a b");
    expect(read).to.throw();
  });

  it("handles string values", function() {
    var r = new cell.Reader("(def test \"this is a test\")");
    var f = r.read();

    expect(f.count()).to.equal(3);

    var token = f.first();
    expect(token.data).to.equal('def');

    token = f.rest().first();
    expect(token.data).to.equal('test');

    token = f.rest().rest().first();
    expect(token.data).to.equal('this is a test');
  });

  it("expands reader macros into forms", function() {
    var r = new cell.Reader("(def test '(1 2 3 4))");
    var f = r.read();

    expect(f.count()).to.equal(3);

    var token = f.first();
    expect(token.data).to.equal('def');

    token = f.rest().first();
    expect(token.data).to.equal('test');

    token = f.rest().rest().first().first();
    expect(token.data).to.equal('quote');

    token = f.rest().rest().first().rest().first().first();
    expect(token.data).to.equal(1);
  });

})
