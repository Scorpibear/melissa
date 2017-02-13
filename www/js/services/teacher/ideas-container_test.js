'use strict';
describe('ideasContainer', function() {
  var ideasContainer;
  
  beforeEach(module('melissa.services'));
  beforeEach(inject(function (_ideasContainer_) {
    ideasContainer = _ideasContainer_;
  }));
  describe('isEmpty', function() {
    it('returns true by default', function(){
      expect(ideasContainer.isEmpty()).toBeTruthy();
    });
    it('pushing idea makes container not empty', function() {
      ideasContainer.pushIdea({pgn:[]});
      expect(ideasContainer.isEmpty()).toBeFalsy();
    })
  });
  describe('addIdea', function() {
    it('what is added could be get', function(){
      ideasContainer.addIdea({pgn:['d4']});
      expect(ideasContainer.getIdea()).toEqual({pgn:['d4']});
    });
  });
  describe('getIdea', function() {
    it('get ideas in the order of adding', function() {
      ideasContainer.addIdea({pgn: ['d3']});
      ideasContainer.addIdea({pgn: ['e3']});
      expect(ideasContainer.getIdea()).toEqual({pgn:['d3']});
    });
  });
  describe('pushIdea', function(){
    it('push idea to the end of backlog', function() {
      ideasContainer.pushIdea({pgn:['a3']});
      ideasContainer.pushIdea({pgn:['b3']});
      expect(ideasContainer.popIdeas()).toEqual([{pgn:['a3']},{pgn:['b3']}]);
    })
  });
  describe('popIdeas', function() {
    it('returns what was pushed', function() {
      ideasContainer.pushIdea({pgn:['a4']});
      expect(ideasContainer.popIdeas()).toEqual([{pgn:['a4']}]);
    });
    it('empties backlog', function() {
      ideasContainer.pushIdea({pgn:['b4']});
      ideasContainer.popIdeas();
      expect(ideasContainer.isEmpty()).toBeTruthy();
    })
  });
  describe('reset', function() {
    it('empties backlog', function() {
      ideasContainer.pushIdea({pgn:'a3'});
      ideasContainer.reset();
      expect(ideasContainer.isEmpty()).toBeTruthy();
    });
    it('empties ideas', function() {
      ideasContainer.addIdea({pgn:'b3'});
      ideasContainer.reset();
      expect(ideasContainer.getIdea()).toEqual(undefined);
    });
  });
});
