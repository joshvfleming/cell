var expect = require('chai').expect;

describe("Environment", function() {
  beforeEach(function() {
  });

  it("provides store and lookup", function() {
    var env = new cell.Environment();

    expect(env.get('mytest')).to.equal(null);

    env.set('mytest', 'myval');
    
    expect(env.get('mytest')).to.equal('myval');
  });

  it("does hierarchical lookups", function() {
    var parent = new cell.Environment();
    var env = new cell.Environment(parent);

    expect(env.get('mytest')).to.equal(null);

    parent.set('mytest', 'stuff');

    expect(env.get('mytest')).to.equal('stuff');

    env.set('mytest', 'myval');
    
    expect(env.get('mytest')).to.equal('myval');
  });

  it("provides setAll for bulk sets", function() {
    var env = new cell.Environment();

    env.setAll(env,
               cell.Cell.fromArray([new cell.String('arg1'),
                                    new cell.String('arg2')]),
               cell.Cell.fromArray([new cell.Number(1),
                                    new cell.Number(4)]));

    expect(env.get('arg1').data).to.equal(1);
    expect(env.get('arg2').data).to.equal(4);
  });
})
