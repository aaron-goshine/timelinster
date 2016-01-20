/**
 * @ignore @hack to silent eslint in strict mode
 */
var describe = describe;
var beforeEach = beforeEach;
var it = it;
var inject = inject;
var expect = expect;
// --- end hack --- //
//
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
