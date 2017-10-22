'use strict';

describe('messages', function() {
  var language = {getCode: function(){return 'ru'}};
  beforeEach(module('melissa.messages'));
  beforeEach(module(function($provide) {
    $provide.value("language", language);
  }));
  describe('localize filter', function() {
    var localize;
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

    beforeEach(inject(function(_messages_) {
      messages = _messages_;
    }));
    it('returns messages from defaultLocale', function() {
      spyOn(language,'getCode').and.returnValue('unsupported');
      expect(messages.get('Position')).toEqual('Position');
    });
  });
});
