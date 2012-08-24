var expect = require('chai').expect;

describe("String", function() {
  var a = new cell.String('str1');
  var b = new cell.String('str2');
  var c = new cell.String('str1');

  beforeEach(function() {
  });

  it("evals to itself", function() {
    var env = new cell.Environment();

    expect(a.eval(env)).to.equal(a);
    expect(b.eval(env)).to.equal(b);
    expect(c.eval(env)).to.equal(c);
  });

  it("tests for equality", function() {
    expect(a.eq(b)).to.equal(cell.FALSE);
    expect(a.eq(a)).to.equal(cell.TRUE);
    expect(a.eq(c)).to.equal(cell.TRUE);
  });

  it("converts to string", function() {
    expect(a.toString()).to.equal('str1');
    expect(b.toString()).to.equal('str2');
  });
})
