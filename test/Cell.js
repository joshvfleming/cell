var expect = require('chai').expect;

describe("Cell", function() {
  beforeEach(function() {
    cell.init();
  });

  it("cons constructs a list from a value and a cell", function() {
    var c1 = new cell.Number(3);
    var c2 = new cell.Cell(new cell.Number(5));
    var c3 = cell.Cell.cons(c1, c2);

    expect(c3.count()).to.equal(2);
    expect(c3.first().data).to.equal(3);
    expect(c3.rest().first().data).to.equal(5);
  });

  it("constructs a list from an array of values", function() {
    var list = cell.Cell.fromArray([new cell.Number(7),
                                    new cell.Number(11),
                                    new cell.Number(13)]);

    expect(list.count()).to.equal(3);
    expect(list.first().data).to.equal(7);
    expect(list.rest().first().data).to.equal(11);
    expect(list.rest().rest().first().data).to.equal(13);
  });

  it("evals as a function call", function() {
    var i1 = new cell.Symbol('+');
    var i2 = new cell.Number(23);
    var i3 = new cell.Number(29);
    var list = cell.Cell.fromArray([i1, i2, i3]);

    expect(list.count()).to.equal(3);
    
    var result = list.eval(cell.environment);
    
    expect(result.data).to.equal(52);
  });

  it("empty tests for empty list", function() {
    var c1 = new cell.Cell();
    var c2 = new cell.Cell(new cell.Number(5));

    expect(c1.empty()).to.equal(true);
    expect(c2.empty()).to.equal(false);
  });

  it("tests for equality", function() {
    var c1 = cell.Cell.fromArray([new cell.Number(7),
                                  new cell.Number(11),
                                  new cell.Number(13)]);
    var c2 = cell.Cell.fromArray([new cell.Number(7),
                                  new cell.Number(11),
                                  new cell.Number(13)]);
    var c3 = cell.Cell.fromArray([new cell.Number(11),
                                  new cell.Number(31),
                                  new cell.Number(57)]);
    var c4 = new cell.Cell();
    var c5 = new cell.Cell();

    expect(c1.eq(c2)).to.equal(cell.TRUE);
    expect(c1.eq(c3)).to.equal(cell.FALSE);
    expect(c2.eq(c4)).to.equal(cell.FALSE);
    expect(c4.eq(c5)).to.equal(cell.TRUE);
  });

  it("converts to string", function() {
    var c1 = cell.Cell.fromArray([new cell.Number(7),
                                  new cell.Number(11),
                                  new cell.Number(13)]);
    var c2 = cell.Cell.fromArray([new cell.String("testing 123"),
                                  new cell.Keyword(":abc"),
                                  new cell.Number(7)]);

    expect(c1.toString()).to.equal("(7 11 13)");
    expect(c2.toString()).to.equal("(\"testing 123\" :abc 7)");
  });
})
