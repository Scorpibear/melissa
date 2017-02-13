'use strict';
describe('teacherIdeas', function() {
  var teacherIdeas;
  var baseIterator = {getBestAnswer: function() {}, getSubPgns: function(){}};
  var ideasContainer = {isEmpty: function(){}, pushIdea: function(){}, addIdea: function(){},
                       getIdea: function(){}, popIdeas: function(){}};
  
  beforeEach(module('melissa.services'));
  beforeEach(module(function ($provide) {
    $provide.value('baseIterator', baseIterator);
  }));
  beforeEach(inject(function (_teacherIdeas_) {
    teacherIdeas = _teacherIdeas_;
  }));
  describe('getIdea', function() {
    it('push white and black ideas roots when idea container is empty', function() {
      spyOn(ideasContainer, 'isEmpty').and.returnValue(true);
      spyOn(ideasContainer, 'pushIdea');
      spyOn(ideasContainer, 'getIdea').and.returnValue({pgn:[]});
      spyOn(baseIterator, 'getSubPgns').and.returnValue([['e4']]);
      teacherIdeas.getIdea(ideasContainer);
      expect(ideasContainer.pushIdea.calls.count()).toBe(2);
    });
    it('returns idea from ideasContainer', function() {
      var idea = {pgn:['h3', 'e5']};
      spyOn(ideasContainer, 'getIdea').and.returnValue(idea);
      expect(teacherIdeas.getIdea(ideasContainer)).toBe(idea);
    });
    it('popIdeas for extension if lack of ideas', function() {
      spyOn(ideasContainer, 'getIdea').and.returnValue(null);
      spyOn(ideasContainer, 'popIdeas').and.returnValue([]);
      teacherIdeas.getIdea(ideasContainer);
      expect(ideasContainer.popIdeas).toHaveBeenCalled();
    });
    it('push extended ideas if lack of ideas', function() {
      spyOn(ideasContainer, 'getIdea').and.returnValue(null);
      spyOn(ideasContainer, 'popIdeas').and.returnValue([{pgn:['e4']}]);
      spyOn(baseIterator, 'getSubPgns').and.returnValue([['e4','e6','Nf3'],['e4','e6','d4']]);
      spyOn(baseIterator, 'getBestAnswer').and.returnValue('e6');
      spyOn(ideasContainer, 'pushIdea');
      teacherIdeas.getIdea(ideasContainer);
      expect(ideasContainer.pushIdea.calls.count()).toBe(2);
      expect(ideasContainer.pushIdea).toHaveBeenCalledWith({pgn:['e4','e6','Nf3']});
      expect(ideasContainer.pushIdea).toHaveBeenCalledWith({pgn:['e4','e6','d4']});
    });
    it('does not push not full ideas', function() {
      spyOn(ideasContainer, 'popIdeas').and.returnValue([{pgn:['a3']}]);
      spyOn(baseIterator, 'getBestAnswer').and.returnValue('e5')
      spyOn(baseIterator, 'getSubPgns').and.returnValue([]);
      spyOn(ideasContainer, 'pushIdea');
      teacherIdeas.getIdea(ideasContainer);
      expect(ideasContainer.pushIdea).not.toHaveBeenCalled();
    });
  });
  describe('areEqual', function() {
    it('returns false if pgns are different', function() {
      expect(teacherIdeas.areEqual({pgn: []}, {pgn: ['e4']})).toBeFalsy();
    });
    it('return true for same pgns', function() {
      expect(teacherIdeas.areEqual({pgn: ['d4']}, {pgn: ['d4']})).toBeTruthy();
    });
  });
});
