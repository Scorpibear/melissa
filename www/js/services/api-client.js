angular.module("melissa.services")
.constant('backendUrl', 'http://umain-02.cloudapp.net:9966')
.factory('apiClient', ['backendUrl', (backendUrl) => {
  return {
    getFenData: (fen) => {
      return Promise.resolve({bestMove: 'c4'});
    },
    updateBase: () => {
      return Promise.reject('not implemented, the logic to be moved from baseUpdater');
    }
  };
}])