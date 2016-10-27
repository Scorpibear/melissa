describe('baseManager', function() {
  var baseManager;
  
  beforeEach(module("melissa.services"));
  beforeEach(inject(function (_baseManager_) {
    baseManager = _baseManager_;
  }));

  describe('restoreBase', function() {
    it('restores base from local storage', function() {
      spyOn(Storage.prototype, 'getItem').and.returnValue("{}");
      var base = baseManager.restoreBase();
      expect(Storage.prototype.getItem).toHaveBeenCalledWith('base'); 
    });
  });
  describe('saveBase', function() {
    it('saves base to localStorage', function() {
      var base = {m: ""};
      spyOn(Storage.prototype, 'setItem').and.stub();
      spyOn(JSON, 'stringify').and.returnValue('{"some": "json"}');
      baseManager.saveBase(base);
      expect(JSON.stringify).toHaveBeenCalledWith(base);
      expect(Storage.prototype.setItem).toHaveBeenCalledWith('base', '{"some": "json"}');
    });
  });
});
