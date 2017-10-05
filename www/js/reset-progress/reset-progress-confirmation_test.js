'use strict';

describe('resetProgressConfirmation', function() {
  var resetProgressConfirmation;
  var window = {confirm: function(){}, prompt: function(){}};
  var messages = {get: function(){{}}};
  
  beforeEach(module('melissa.resetProgress'));
  beforeEach(module(function($provide) {
    $provide.value('$window', window);
    $provide.value('messages', messages);
  }));
  beforeEach(inject(function(_resetProgressConfirmation_){
    resetProgressConfirmation = _resetProgressConfirmation_;
  }))
  describe('show', function() {
    it('return false when not confirmed', function(done) {
      spyOn(window, 'confirm').and.returnValue(false);
      var result = resetProgressConfirmation.show();
      result.then(
        function(confirmed) {
          expect(confirmed).toBe(false);
        }
      ).then(done);
    });
    it('return true when confirmed and answer matches', function(done) {
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(messages, 'get').and.callFake(function() {return 'CORRECT_ANSWER'});
      spyOn(window, 'prompt').and.returnValue('CORRECT_ANSWER');
      resetProgressConfirmation.show()
        .then(function(confirmed) {
          expect(confirmed).toBe(true);
        })
        .then(done)
        .catch(function error(){
          console.error(error);
          done();
        });
    });
    it('return false when confirmed but incorrect text typed', function(done) {
      spyOn(window, 'confirm').and.returnValue(true);
      spyOn(messages, 'get').and.callFake(function() {return 'CORRECT_ANSWER'});
      spyOn(window, 'prompt').and.returnValue('I am lazy to type');
      resetProgressConfirmation.show()
        .then(function(confirmed) {
          expect(confirmed).toBe(false);
        })
        .then(done)
        .catch(function error(){
          console.error(error);
          done();
        });
    });
  });
});
