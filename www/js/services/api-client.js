angular.module("melissa.services")
.factory('apiClient', [() => {
  return {
    getFenData: (fen) => {
      return Promise.resolve({bestMove: 'c4'});
    }
  };
}])