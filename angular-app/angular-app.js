/* globals timelineFns timelineFns  angular */

/**
 * @module timelineApp;
 * @name timelineApp
 * @ngdoc module
 */
var timelineApp = angular.module('timelineApp', []);

/**
 * @memberof timelineApp
 * @name timelineController
 * @ngdoc controller
 * @param {service} $http
 */

var timelineController = function ($http) {
  var self = this;
  $http.get('/timelinster/schedule.json').then(function (response) {
    self.data = response.data;
  }, function (errResponse) {
    console.error('Error while fetching notes');
  });
};

/**
 * @memberof timelineApp
 * @name timelineDirective
 * @ngdoc directive
 * @note on {object} timelineFns;
 */

var timelineDirective = function () {
  return {
    templateUrl: '/timelinster/angular-app/timeline-template.html',
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
  };
};

/**
 * @memberof timelineApp
 * @name labelFormat
 * @ngdoc filter
 */
var labelFormat = function () {
  return function (label) {
    return timelineFns.labelFormat(label);
  };
};

timelineApp.controller('timelineController', timelineController);
timelineApp.directive('timeline', timelineDirective);
timelineApp.filter('labelFormat', labelFormat);
