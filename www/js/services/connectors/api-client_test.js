describe('apiClient', () => {
  let apiClient;
  let $http = {get: () => Promise.resolve({data: {bestMove: 'c4'}})};
  const stub = () => {/* stub */};
  let connectionIndicator = {startSending: stub, success: stub, error: stub}
  beforeEach(module('melissa.services'));
  beforeEach(module(function($provide) {
    $provide.value("$http", $http);
    $provide.value("connectionIndicator", connectionIndicator);
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
  describe('getBase', () => {
    it('makes http get call to backend with /api/base', async () => {
      spyOn($http, 'get').and.callThrough();
      await apiClient.getBase();
      expect($http.get).toHaveBeenCalledWith(jasmine.stringContaining('/api/base'), jasmine.anything());
    });
    it('returns base from data field of the response', async () => {
      const base = {m:'', e:{v: 0.3, d: 50}, s:[]};
      spyOn($http, 'get').and.returnValue(Promise.resolve({data: base}));
      const result = await apiClient.getBase();
      expect(result).toEqual(base);
    });
  })
});