describe('apiClient', () => {
  const stub = () => {/* stub */};
  const pStub = () => Promise.resolve();
  let apiClient;
  let $http = {
    get: () => Promise.resolve({data: {bestMove: 'c4'}}),
    jsonp: pStub
  };
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
  });
  describe('analyze', () => {
    it('makes a POST /api/analyze call to the backend with moves in the body', async () => {
      const moves = ['e4', 'c5', 'c3', 'Nf6', 'Bc5', 'Nfxe5', 'Bxf7+', 'Kxf7', 'Qh4+'];
      spyOn($http, 'jsonp').and.callThrough();
      await apiClient.analyze(moves);
      expect($http.jsonp).toHaveBeenCalledWith(jasmine.stringContaining('/api/analyze'), {data: moves});
    });
  });
});