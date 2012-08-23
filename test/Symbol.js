var expect = require('chai').expect;

describe("Keyword", function() {
  var a = new cell.Symbol('a');
  var b = new cell.Symbol('b');
  var c = new cell.Symbol('a');

  beforeEach(function() {
  });

  it("evals to env lookup value", function() {
    var env = new cell.Environment();
    env.set('a', 'this is a test');

    expect(a.eval(env)).to.equal('this is a test');

    var eval = function() {
      return b.eval(env);
    };

    expect(eval).to.throw();
  });

  it("tests for equality", function() {
    expect(a.eq(b)).to.equal(cell.FALSE);
    expect(a.eq(a)).to.equal(cell.TRUE);
    expect(a.eq(c)).to.equal(cell.TRUE);
  });

  it("converts to string", function() {
    expect(a.toString()).to.equal('a');
  });
})
