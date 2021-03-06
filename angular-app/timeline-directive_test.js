/* globals describe beforeEach inject expect it */

describe('version module', function () {
  beforeEach(module('version'));

  describe('app-version directive', function () {
    it('should print current version', function () {
      module(function ($provide) {
        $provide.value('version', 'TEST_VER');
      });
      inject(function ($compile, $rootScope) {
        var element = $compile('<timeline data = "data"></timeline>')($rootScope);
        expect(element.text()).toEqual('TEST_VER');
      });
    });
  });
});
