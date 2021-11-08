describe('apiClient', () => {
  let apiClient;
  let $http = {get: () => Promise.resolve({data: {bestMove: 'c4'}})};
  beforeEach(module('melissa.services'));
  beforeEach(module(function($provide) {
    $provide.value("$http", $http);
  }));
  beforeEach(inject(function (_apiClient_) {
    apiClient = _apiClient_;
  }));
  describe('getFenData', () => {
    it('makes http get request to backend with /api/fenData', async () => {
      spyOn($http, 'get').and.callThrough();
      await apiClient.getFenData('some fen');
      expect($http.get).toHaveBeenCalled();
    })
  });
});