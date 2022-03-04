'use strict';
describe('baseIterator', function() {
  var baseIterator;
  var positionSelector = {getPositionByMoves: function(){}};
  
  beforeEach(module('melissa.services'));
  beforeEach(module(function($provide) {
    $provide.value("positionSelector", positionSelector);
  }));
  beforeEach(inject(function (_baseIterator_) {
    baseIterator = _baseIterator_;
  }));
  describe('getBestPgn', function() {
    it('returns main line for start position', function() {
      spyOn(positionSelector, 'getPositionByMoves').and.returnValue({m: '',s:[{m: 'e4',s:[{m: 'e6', s:[{m:'Nf3'}]}]}]});
      expect(baseIterator.getBestPgn([])).toEqual(['e4', 'e6', 'Nf3']);
    });
    it('does not provide not completed moves', function() {
      spyOn(positionSelector, 'getPositionByMoves').and.returnValue({m: 'a3', s:[
          {m:'Nf6',s:[
            {m:'c4'}]}]});
      expect(baseIterator.getBestPgn(['a3'])).toEqual(['a3', 'Nf6']);
    });
    it('does not count nodes without m property', () => {
      spyOn(positionSelector, 'getPositionByMoves').and.returnValue({m: 'a3', s:[
        {m:'Nf6',s:[
          {mwithtypo:'c4', s:[{m:'c5'}]}]}]});
      expect(baseIterator.getBestPgn(['a3'])).toEqual(['a3', 'Nf6']);
    });
  });
  describe('getBestAnswer', function() {
    it('returns first submove', function() {
      spyOn(positionSelector, 'getPositionByMoves').and.returnValue({m: '', s:[{m: 'e4'}]});
      expect(baseIterator.getBestAnswer([])).toEqual('e4');
    });
  });
  describe('getSubPgns', function() {
    it('returns what is in s', function() {
      spyOn(positionSelector, 'getPositionByMoves').and.returnValue({m: '', s:[{m: 'a4'},{m: 'b4'}]});
      expect(baseIterator.getSubPgns([])).toEqual([['a4'],['b4']]);
    });
    it('returns empty array if input is not an array', function() {
      spyOn(positionSelector, 'getPositionByMoves').and.returnValue({m:'',s:[{m:'e4'}]});
      expect(baseIterator.getSubPgns(2)).toEqual([]);
    });
  })
})
