angular.module("melissa.services")
.constant('backendUrl', 'http://umain-02.cloudapp.net:9966')
.factory('apiClient', 
    ['$http', 'backendUrl', 'userService', 
    ($http, backendUrl, userService) => {
  return {
    getFenData: (fen) => {
      return $http.get(backendUrl + '/api/fenData', {params: {fen}}).
        then(res => res.data, error => console.error(error));
    },
    updateBase: () => {
      const updateBase = () => {
      const user = userService.getUser();
      connectionIndicator.startSending();
      $http({method: 'GET', url: backendUrl + '/api/getbase?userid=' + user.id, transformResponse: false}).
          then(
              function success(response){
                  console.log("new base received, ", response.data.length, " bytes");
                  base = JSON.parse(response.data);
                  base.pgn = '';
                  baseUpdated = true;
                  baseManager.saveBase(base);
                  connectionIndicator.success();
              },
              function error(response) {
                  console.error("could not update base from server: ", response);
                  connectionIndicator.error();
                  setTimeout(updateBase, retryTimeout+=retryTimeout);
              }
          );
      }
      setTimeout(updateBase, 0);
    }
  };
}])