angular.module("melissa.services")
.factory('trackableApi', 
    ['apiClient', 'connectionIndicator',
    (apiClient, connectionIndicator) => {
  return {
    getFenData: (fen) => {
      
    },
    getBase: () => {
      
    }
  };
}])