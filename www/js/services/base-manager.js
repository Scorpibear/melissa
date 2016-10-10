angular.module("melissa.services")
  .value("base", base)
  .constant("localStorage", localStorage)
  .constant("JSON", JSON)
  .constant("localStorageItemForBase", "base")
  .factory("baseManager", ["base", "localStorageItemForBase", "localStorage", "JSON",
    function(base, localStorageItemForBase, localStorage, JSON) {
    return {
      restoreBase: function() {
        base.pgn = '';
        var baseFromLocalStorage = localStorage.getItem(localStorageItemForBase);
        if(baseFromLocalStorage) {
          try {
            base = JSON.parse(baseFromLocalStorage);
          } catch (err) {
            console.error(err);
          }
        }
        return base;
      },
      saveBase: function(base) {
        localStorage.setItem(localStorageItemForBase, JSON.stringify(base));
      }
    }
  }]);
