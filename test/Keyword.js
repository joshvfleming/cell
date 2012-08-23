var expect = require('chai').expect;

describe("Keyword", function() {
  var kw1 = cell.Keyword.get(':test1');
  var kw2 = cell.Keyword.get(':test2');
  var kw3 = cell.Keyword.get(':test1');

  beforeEach(function() {
  });

  it("evals to itself", function() {
    var env = new cell.Environment();

    expect(kw1.eval(env)).to.equal(kw1);
    expect(kw2.eval(env)).to.equal(kw2);
  });

  it("tests for equality", function() {
    expect(kw1.eq(kw2)).to.equal(cell.FALSE);
    expect(kw1.eq(kw1)).to.equal(cell.TRUE);
    expect(kw1.eq(kw3)).to.equal(cell.TRUE);
  });

  it("interns instances", function() {
    expect(kw1).not.to.equal(kw2);
    expect(kw1).to.equal(kw3);
  });

  it("converts to string", function() {
    expect(kw1.toString()).to.equal(':test1');
    expect(kw2.toString()).to.equal(':test2');
    expect(kw3.toString()).to.equal(':test1');
  });
})
