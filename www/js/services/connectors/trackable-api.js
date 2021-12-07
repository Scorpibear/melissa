angular.module("melissa.services")
.factory('trackableApi', 
    ['apiClient', 'connectionIndicator',
    (apiClient, connectionIndicator) => {
  return {
    getFenData: (fen) => {
      
    },
    getBase: async () => {
      connectionIndicator.startSending();
      try {
        result = await apiClient.getBase();
        connectionIndicator.success();
        return result;
      } catch (err) {
        connectionIndicator.error();
        return Promise.reject(err);
      }
    }
  };
}])