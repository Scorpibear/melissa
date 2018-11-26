'use strict';

describe('gameCreator', function() {
  var gameCreator;
  var learningProgress = {isLearnt: ()=>false};
  var puzzleBuilder = {buildFromPositionObject: ()=>({})};
  var positionSelector = {getNextPositionOfTheColor: ()=>{}};

  beforeEach(module('melissa.services'));
  beforeEach(module(function($provide) {
    $provide.value("learningProgress", learningProgress);
    $provide.value("puzzleBuilder", puzzleBuilder);
    $provide.value("positionSelector", positionSelector);
  }));
  beforeEach(inject(function (_gameCreator_) {
    gameCreator = _gameCreator_;
  }));

  describe('create', function() {
    it('ignores games with less than 10 moves', () => {
      var game = gameCreator.create({});
      expect(game).toEqual(null);
    });
  })

  describe('isBetter', function() {
    it('better to have longest game', function() {
      expect(gameCreator.isBetter([{},{}], [{}])).toBeTruthy();
    });
    it('better to have not-learnt positions', function() {
      spyOn(puzzleBuilder, 'buildFromPositionObject').and.callFake(position => position);
      spyOn(learningProgress, 'isLearnt').and.callFake((puzzle) => ({"a": true,"b": false}[puzzle]));
      var gameLongButLearnt = ["a", "a", "a"];
      var gameShortButNotLearnt = ["b"];
      expect(gameCreator.isBetter(gameLongButLearnt, gameShortButNotLearnt)).toBeFalsy();
    });
  })

  describe('getNotLearntPositionsCount', function() {
    it('return zero for empty game', function() {
      expect(gameCreator.getNotLearntPositionsCount([])).toBe(0);
    });
    it('returns game length if everything is not learnt', function() {
      expect(gameCreator.getNotLearntPositionsCount([{},{}])).toBe(2);
    });
    it('returns zero if a single position is learnt', function() {
      spyOn(learningProgress, 'isLearnt').and.returnValue(true);
      expect(gameCreator.getNotLearntPositionsCount([{}])).toBe(0);
    });
  })
})
