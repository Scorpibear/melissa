describe("learningProgressSynchronizer", function() {
  var synchronizer;
  var $window = {localStorage: {getItem: function(){}, setItem: function(){}}};

  beforeEach(module("melissa.services"));
  beforeEach(module(function ($provide) {
    $provide.value("$window", $window);
  }));
  beforeEach(inject(function (_learningProgressSynchronizer_) {
    synchronizer = _learningProgressSynchronizer_;
  }));

  describe("save", function() {
    it('set value to localStorage', function() {
      spyOn($window.localStorage, 'setItem');
      synchronizer.save({some: "data"});
      expect($window.localStorage.setItem).toHaveBeenCalledWith('melissa.learntPuzzles', '{"some":"data"}');
    });
  });

  describe("load", function() {
    it('use localStorage', function() {
      spyOn($window.localStorage, 'getItem');
      synchronizer.load();
      expect($window.localStorage.getItem).toHaveBeenCalledWith('melissa.learntPuzzles');
    });
    it('allow to load root position', function() {
      spyOn($window.localStorage, 'getItem').and.returnValue('[{"position": "", "answer": "e4"}]');
      synchronizer.load();
      expect(synchronizer.load()).toEqual([{position: '', answer: 'e4'}]);
    })
  });
});