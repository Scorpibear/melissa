angular.module("melissa.services")
.constant('backendUrl', 'http://umain-02.cloudapp.net:9966')
.factory('apiClient', 
    ['$http', 'backendUrl', 'userService', 'connectionIndicator',
    ($http, backendUrl, userService, connectionIndicator) => {
  return {
    getFenData: (fen) => {
      return $http.get(backendUrl + '/api/fenData', {params: {fen}}).
        then(res => res.data, error => console.error(error));
    },
    getBase: () => {
      const user = userService.getUser();
      connectionIndicator.startSending();
      return $http.get(backendUrl + '/api/base', {params: {userid: user.id}}).
        then(res => res.data, error => console.error(error));
    }
  };
}])