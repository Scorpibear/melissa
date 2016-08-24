describe('baseManager', function() {
  var baseManager;
  
  beforeEach(module("melissa.services"));
  beforeEach(inject(function (_baseManager_) {
    baseManager = _baseManager_;
  }));

  describe('restoreBase', function() {
    it('restores base from local storage', function() {
      spyOn(localStorage, 'getItem');
      var base = baseManager.restoreBase();
      expect(localStorage.getItem).toHaveBeenCalledWith('base'); 
    });
  });
  describe('saveBase', function() {
    it('saves base to localStorage', function() {
      var base = {m: ""};
      spyOn(localStorage, 'setItem');
      spyOn(JSON, 'stringify').and.returnValue('valid json');
      baseManager.saveBase(base);
      expect(JSON.stringify).toHaveBeenCalledWith(base);
      expect(localStorage.setItem).toHaveBeenCalledWith('base', 'valid json');
    });
  });
});
