'use strict';

describe('userService', function() {
  beforeEach(module('melissa.services'));

  describe('getUser', function() {
    it('generates new user matching xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx template', function() {
      spyOn(localStorage, 'getItem').and.returnValue(null);
      var userService;
      inject(function(_userService_){
        userService = _userService_;
      });

      var user = userService.getUser();
      
      expect(user.id.length).toBe(36);
    })
  })
})