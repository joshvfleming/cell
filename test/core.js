describe("Core", function() {
  var env = null;

  beforeEach(function() {
    cell.init();
    env = cell.environment;
  });

  it("executes a simple lambda expression", function() {
    var r = new cell.Reader("((lambda (a) (eq a 2)) 1)");
    var f = r.read()
    cell.init()
    expect(f.eval(cell.environment)).toBe(false);

    var r = new cell.Reader("((lambda (a) (eq a 2)) 2)");
    var f = r.read()
    cell.init()
    expect(f.eval(cell.environment)).toBe(true);
  });
});
