'use strict';

describe('trainingSession', function () {
  var trainingSession = null;
  
  beforeEach(module('melissa.services'));
  beforeEach(inject(function (_trainingSession_) {
    trainingSession = _trainingSession_;
  }));

  describe('start', function() {
    it('move session to inProgress state', function() {
      trainingSession.start();
      expect(trainingSession.isInProgress()).toBeTruthy();
    });
    it('saves session limit', function() {
      trainingSession.start(1);
      trainingSession.register({correct: true});
      expect(trainingSession.isInProgress()).toBeFalsy();
    })
  });
  describe('isInProgress', function() {
    it('returns false by default', function() {
      expect(trainingSession.isInProgress()).toBeFalsy();
    });
  });
  describe('register', function() {
    it('increases number of correct answers if correct=true', function() {
      trainingSession.register({correct: true});
      expect(trainingSession.getNumberOfCorrectAnswers()).toEqual(1);
    });
  });
});
