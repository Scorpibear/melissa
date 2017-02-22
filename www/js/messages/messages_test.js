'use strict';

describe('messages', function() {
  beforeEach(module('melissa.messages'));
  describe('localize filter', function() {
    var localize;
    var locale = 'ru';
    
    beforeEach(inject(function(_localizeFilter_) {
      localize = _localizeFilter_;
    }));
    beforeEach(function() {
      locale = 'ru';
    })
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
      $provide.value("locale", 'unsupported');
    }));
    beforeEach(inject(function(_messages_) {
      messages = _messages_;
    }));
    it('returns messages from defaultLocale', function() {
      expect(messages.get('Position')).toEqual('Position');
    });
  });
});
