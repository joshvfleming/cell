var expect = require('chai').expect;

describe("Number", function() {
  var a = new cell.Number(3);
  var b = new cell.Number(7);
  var c = new cell.Number(3);
  var d = new cell.Number(13);

  beforeEach(function() {
    
  });

  it("evals to itself", function() {
    var env = new cell.Environment();

    expect(a.eval(env)).to.equal(a);
  });

  it("tests for equality", function() {
    expect(a.eq(b)).to.equal(cell.FALSE);
    expect(a.eq(a)).to.equal(cell.TRUE);
    expect(a.eq(c)).to.equal(cell.TRUE);
  });

  it("supports plus operation", function() {
    expect(a.plus(b).data).to.equal(10);
    expect(a.plus(d).data).to.equal(16);
    expect(b.plus(d).data).to.equal(20);
  });

  it("supports minus operation", function() {
    expect(a.minus(b).data).to.equal(-4);
    expect(d.minus(b).data).to.equal(6);
    expect(b.minus(c).data).to.equal(4);
  });

  it("supports mult operation", function() {
    expect(a.mult(b).data).to.equal(21);
    expect(d.mult(b).data).to.equal(91);
    expect(a.mult(c).data).to.equal(9);
  });

  it("supports div operation", function() {
    expect(a.div(c).data).to.equal(1);
    expect(a.div(b).data).to.equal(3/7);
    expect(d.div(b).data).to.equal(13/7);
  });

  it("supports mod operation", function() {
    expect(a.mod(c).data).to.equal(0);
    expect(a.mod(b).data).to.equal(3);
    expect(d.mod(b).data).to.equal(6);
  });

  it("converts to string", function() {
    expect(a.toString()).to.equal('3');
    expect(b.toString()).to.equal('7');
    expect(c.toString()).to.equal('3');
    expect(d.toString()).to.equal('13');
  });
})
