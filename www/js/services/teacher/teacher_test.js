'use strict';
describe('teacher', function() {
  var teacher;
  var ideasContainer = {reset: function(){}};
  var ideaTester = {isGoodIdea: function() {return true;}};
  var teacherIdeas = {getIdea: function() {}, areEqual: function(){return false}};
  
  beforeEach(module('melissa.services'));
  beforeEach(module(function ($provide) {
    $provide.value('ideasContainer', ideasContainer);
    $provide.value('ideaTester', ideaTester);
    $provide.value('teacherIdeas', teacherIdeas);
  }));
  beforeEach(inject(function (_teacher_) {
    teacher = _teacher_;
  }));
  describe('getListOfPgnsToLearn', function() {
    it('returns different pgns', function() {
      spyOn(teacherIdeas, 'getIdea').and.returnValues({pgn: []}, {pgn: ['e4']});
      var pgns = teacher.getListOfPgnsToLearn(2);
      expect(pgns[0]).not.toEqual(pgns[1]);
    });
    it('skips positions which did not pass ideaTester test', function() {
      spyOn(teacherIdeas, 'getIdea').and.returnValues({pgn: []}, {pgn: ['e4']});
      spyOn(ideaTester, 'isGoodIdea').and.returnValues(false, true);
      expect(teacher.getListOfPgnsToLearn(1)[0]).toEqual(['e4']);
    });
    it('provides ten pgns by default', function() {
      var i=0;
      spyOn(teacherIdeas, 'getIdea').and.callFake(function() {return {pgn:[i++]};});
      expect(teacher.getListOfPgnsToLearn().length).toEqual(10);
    });
    it('stops asking for ideas if there are no new ideas', function() {
      spyOn(teacherIdeas, 'getIdea').and.returnValue({pgn: []});
      spyOn(teacherIdeas, 'areEqual').and.returnValues(false, true);
      expect(teacher.getListOfPgnsToLearn(2).length).toEqual(1);
    });
    it('resets ideasContainer', function() {
      spyOn(ideasContainer, 'reset');
      spyOn(teacherIdeas, 'areEqual').and.returnValue(true);
      teacher.getListOfPgnsToLearn();
      expect(ideasContainer.reset).toHaveBeenCalled();
    });
    it('does not add empty ideas', function() {
      spyOn(teacherIdeas, 'getIdea').and.returnValues({pgn:['e4']}, null);
      spyOn(ideaTester, 'isGoodIdea').and.returnValue(true);
      expect(teacher.getListOfPgnsToLearn()).toEqual([['e4']]);
    })
  });

});
