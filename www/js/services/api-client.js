angular.module("melissa.services")
.factory('apiClient', () => {
  return {
    getFenData: (fen) => {
      return {bestMove: 'c4'}
    }
  }
})