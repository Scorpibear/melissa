describe('trackableApi', () => {
  let trackableApi;
  const stub = () => {/* stub */};
  let connectionIndicator = {startSending: stub, success: stub, error: stub};
  let apiClient = {getBase: () => Promise.resolve({}), getFenData: () => Promise.resolve({})};
  let fen = 'rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq d6 0 2';
  beforeEach(module('melissa.services'));
  beforeEach(module(function($provide) {
    $provide.value("apiClient", apiClient);
    $provide.value("connectionIndicator", connectionIndicator);
  }));
  beforeEach(inject(function (_trackableApi_) {
    trackableApi = _trackableApi_;
  }));
  describe('getBase', () => {
    it('calls start sending for connection indicator', () => {
      spyOn(connectionIndicator, 'startSending');
      trackableApi.getBase();
      expect(connectionIndicator.startSending).toHaveBeenCalled();
    });
    it('returns the result from apiClient.getBase', async () => {
      const base = {s:[{m:'d4'}]};
      spyOn(apiClient, 'getBase').and.resolveTo(base);
      expect(await trackableApi.getBase()).toBe(base);
    });
    it('calls success() method of connectionIndicator', async () => {
      spyOn(connectionIndicator, 'success');
      await trackableApi.getBase();
      expect(connectionIndicator.success).toHaveBeenCalled();
    });
    it('calls connectionIndicator.error() in case of rejected promise', async () => {
      spyOn(apiClient, 'getBase').and.callFake(() => Promise.reject('something went wrong'));
      spyOn(connectionIndicator, 'error');
      try {
        await trackableApi.getBase();
        expect.fail('promise was not rejected');
      } catch (err) {
        expect(err).toEqual('something went wrong');
      }
      expect(connectionIndicator.error).toHaveBeenCalled();
    });
  });
  describe('getFenData', () => {
    it('returns output from apiClient.getFenData', async () => {
      const data = {fen: 'some fen', bestMove: 'Nf6'};
      spyOn(apiClient, 'getFenData').and.resolveTo(data);
      expect(await trackableApi.getFenData()).toBe(data);
    });
    it('calls startSending', async () => {
      spyOn(connectionIndicator, 'startSending');
      await trackableApi.getFenData(fen);
      expect(connectionIndicator.startSending).toHaveBeenCalled();
    });
    it('calls success, if apiClient resolves', async () => {
      spyOn(connectionIndicator, 'success');
      await trackableApi.getFenData(fen);
      expect(connectionIndicator.success).toHaveBeenCalled();
    });
    it('calls error, if apiClient rejects', async () => {
      spyOn(apiClient, 'getFenData').and.callFake(() => Promise.reject('something went wrong'));
      spyOn(connectionIndicator, 'error');
      try{
        await trackableApi.getFenData(fen);
        expect.fail('promise was not rejected');
      } catch (err) {
        expect(err).toEqual('something went wrong');
      }
      expect(connectionIndicator.error).toHaveBeenCalled();
    });
  });
});
