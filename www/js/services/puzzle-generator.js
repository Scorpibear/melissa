angular.module("melissa.services")
  .factory("puzzleGenerator", function (notLearntPuzzleGenerator, gamePuzzleGenerator, trainMode) {
    function getGenerator() {
      var generator = notLearntPuzzleGenerator;
      if(trainMode.isGame()) {
        generator = gamePuzzleGenerator;    
      }
      return generator;
    }
    return {
      getNew: function() {
        var generator = getGenerator();
        var puzzle = generator.getNew();
        return puzzle;
      },
      reset: function() {
        var generator = getGenerator();
        generator.reset();
      }
    }
  });
