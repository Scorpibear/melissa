describe('language', function() {
  var language;
  var navigator = {language: 'ru', languages: ['ru', 'en']};
  beforeEach(module('melissa.messages'));
  beforeEach(module(function($provide){
    $provide.value('$window', {navigator: navigator});
  }))
  beforeEach(inject(function(_language_){
    language = _language_;
  }))
  describe('getCode', function() {
    beforeEach(function() {
      navigator.language = 'ru';
      navigator.languages = ['ru', 'en'];
    })
    it('returns language property', function() {
      expect(language.getCode(['en', 'ru'])).toBe('ru');
    });
    it('returns part before hyphen', function() {
      navigator.language = 'ru-RU';
      expect(language.getCode(['en', 'ru'])).toBe('ru');
    });
    it('for unsupported language, returns first from languages', function() {
      navigator.language = 'ua';
      navigator.languages = ['ua', 'ru', 'en'];
      expect(language.getCode(['en', 'ru'])).toBe('ru');
    });
    it('if no match, returns first available', function() {
      navigator.language = 'fr';
      navigator.languages = ['fr', 'sp'];
      expect(language.getCode(['en', 'ru'])).toBe('en');
    });
    it('returns first if it is primary', function() {
      navigator.language = 'en-US';
      navigator.languages = ['en-US', 'ru-RU'];
      expect(language.getCode(['en', 'ru'])).toBe('en');
    });
    it('returns second if it is primary', function() {
      navigator.language = 'ru-RU';
      navigator.languages = ['ru-RU', 'en-US'];
      expect(language.getCode(['en', 'ru'])).toBe('ru');
    })
  })
})