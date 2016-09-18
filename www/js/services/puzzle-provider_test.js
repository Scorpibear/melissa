describe('puzzleProvider', function() {
  var puzzleProvider;
  var puzzleGenerator = {getNew: function(){return {}}, reset: function(){}};

  beforeEach(module('melissa.services'));
  beforeEach(module(function ($provide) {
    $provide.value("puzzleGenerator", puzzleGenerator);
  }));
  beforeEach(inject(function (_puzzleProvider_) {
    puzzleProvider = _puzzleProvider_;
  }));
  describe('getPuzzle', function() {
    it('returns puzzle', function() {
      var puzzle = puzzleProvider.getPuzzle();

      expect(puzzle).toEqual({});
    });
    /*it("1000 puzzles per second", function() {
      var start = new Date();
      var puzzle;
      var count = 1000;
      for(var i=0; i<count; i++) {
        puzzle = puzzleProvider.getPuzzle();
      }
      var end = new Date();
      var duration = new Date() - start;
      expect(duration).toBeLessThan(count);
    })*/
  });
  describe('reset', function() {
    it('calls reset for puzzleGenerator', function() {
      spyOn(puzzleGenerator, 'reset');

      puzzleProvider.reset();

      expect(puzzleGenerator.reset).toHaveBeenCalled();
    });
    it('empty puzzles buffer', function() {
      spyOn(puzzleGenerator, 'getNew').and.returnValue(null);

      puzzleProvider.reset();
      var puzzle = puzzleProvider.getPuzzle();

      expect(puzzle).toEqual(null);
    });
  });
});
