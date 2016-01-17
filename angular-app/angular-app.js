'use strict';
var timelineApp = angular.module('timelineApp', []);

timelineApp.controller('timelineController', ['$http', function ($http) {
  var self = this;
  $http.get('/schedule.json').then(function (response) {
    self.data = response.data;
  }, function (errResponse) {
    console.error('Error while fetching notes');
  });
}]);

timelineApp.directive('timeline', function () {
  return {
    templateUrl: '/angular-app/timeline-template.html',
    restrict: 'E',
    scope: {
      data: '='
    },
    link: function ($scope, $element, $attr) {
      $scope.getEventStyle = function (event) {
        return timelineFns.generateEventStyle(event);
      };
      $scope.getTickStyle = function (value) {
        return timelineFns.generateTickStyle(value);
      };
    }
  }
});

timelineApp.filter('labelFormat', [function() {
  return function (label) {
    return timelineFns.labelFormat(label);
  }
}]);
