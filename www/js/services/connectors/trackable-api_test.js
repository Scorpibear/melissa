describe('trackableApi', () => {
  let trackableApi;
  const stub = () => {/* stub */};
  let connectionIndicator = {startSending: stub, success: stub, error: stub};
  let apiClient = {getBase: () => Promise.resolve({})};
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
      spyOn(apiClient, 'getBase').and.returnValue(base);
      expect(await trackableApi.getBase()).toBe(base);
    });
    it('calls success() method of connectionIndicator', async () => {
      spyOn(connectionIndicator, 'success');
      await trackableApi.getBase();
      expect(connectionIndicator.success).toHaveBeenCalled();
    });
    it('calls connectionIndicator.error() in case of rejected promise', async () => {
      spyOn(apiClient, 'getBase').and.callFake(() => Promise.reject());
      spyOn(connectionIndicator, 'error');
      try {
        await trackableApi.getBase();
        expect.fail('promise was not rejected');
      } catch (err) {
      }
      expect(connectionIndicator.error).toHaveBeenCalled();
    });
  })
})