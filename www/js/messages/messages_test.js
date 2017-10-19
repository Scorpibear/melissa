'use strict';

describe('messages', function() {
  beforeEach(module('melissa.messages'));
  describe('localize filter', function() {
    var localize;
    
    beforeEach(module(function($provide) {
      $provide.value("$window", {navigator: {language: 'ru'}});
    }));
    beforeEach(inject(function(_localizeFilter_) {
      localize = _localizeFilter_;
    }));
    it('translates messages', function() {
      expect(localize('Position')).toEqual('Позиция');
    });
    it('returns empty string for null', function() {
      expect(localize(null)).toEqual('');
    });
  });
  describe('messages service', function() {
    var messages;

    beforeEach(module(function($provide) {
      $provide.value("$window", {navigator: {language: 'unsupported'}});
    }));
    beforeEach(inject(function(_messages_) {
      messages = _messages_;
    }));
    it('returns messages from defaultLocale', function() {
      expect(messages.get('Position')).toEqual('Position');
    });
  });
});
