describe("Reader", function() {
  var env = null;

  beforeEach(function() {
    cell.init();
    env = cell.environment;
  });

  it("should produce a valid form from simple input strings", function() {
    var r = new cell.Reader("(eq 1 2)");
    var f = r.read();

    expect(cell.Cell.count(f)).toBe(3);

    var token = f.first();
    expect(token.data).toBe('eq');

    token = f.rest().first();
    expect(token.data).toBe('1');

    token = f.rest().rest().first();
    expect(token.data).toBe('2');
  });

  it("should handle nested expressions", function() {
    var r = new cell.Reader("(=> (a b) (+ a b))");
    var f = r.read();

    expect(cell.Cell.count(f)).toBe(3);

    var token = f.first();
    expect(token.data).toBe('=>');

    token = f.rest().first().first();
    expect(token.data).toBe('a');

    token = f.rest().first().rest().first();
    expect(token.data).toBe('b');

    token = f.rest().rest().first().first();
    expect(token.data).toBe('+');

    token = f.rest().rest().first().rest().first();
    expect(token.data).toBe('a');

    token = f.rest().rest().first().rest().rest().first();
    expect(token.data).toBe('b');
  });

  it("should detect unbalanced parens", function() {
    var r = new cell.Reader("(a b (c d))");

    var read = function() {
      return r.read();
    }

    expect(read).not.toThrow();

    r = new cell.Reader("(a b (c d) (e f)");
    expect(read).toThrow();

    r = new cell.Reader("(a b (");
    expect(read).toThrow();

    r = new cell.Reader("(a b");
    expect(read).toThrow();
  })
})
