describe("Chumet", function() {
  var chumet;

  beforeEach(function() {
    chumet = new Chumet();
  });

  it("has learning progress", function() {
    expect(chumet.learningProgress).not.toBe(null);
  });

});
