describe("trainMode", function() {
  var trainMode = null;
  
  beforeEach(module('melissa.services'));
  beforeEach(inject(function (_trainMode_) {
    trainMode = _trainMode_;
  }));

  describe("isBestMoves", function() {
    it("default mode is best moves", function() {
      expect(trainMode.isBestMoves()).toBeTruthy();
    })
  })
})