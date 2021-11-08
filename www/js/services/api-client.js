angular.module("melissa.services")
.constant('backendUrl', 'http://umain-02.cloudapp.net:9966')
.factory('apiClient', ['$http', 'backendUrl', ($http, backendUrl) => {
  return {
    getFenData: (fen) => {
      return $http.get(backendUrl + '/api/fenData', {params: {fen}}).then(res => res.data, error => console.error(error));
    },
    updateBase: () => {
      return Promise.reject('not implemented, the logic to be moved from baseUpdater');
    }
  };
}])