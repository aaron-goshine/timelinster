// 720 was derived by converting the 12 hrs between 8AM to  8PM
var TOTAL_MINS_IN_WORKDAY = 720;

// Work seems to start at 8AM
var WORK_STARTS = 800;

/**
 * @function  eventSpan
 * @param {number} startTime - a value representing the start time in twenty four hour format
 * @param {number} endTime - a value representing the end time in twenty four hour format
 * @return {number} - as percentage value representing the width of the span
 */
var eventSpan = function (startTime, endTime) {
  var startTimeInMinutes = convertTWHtoMins(startTime);
  var positionInMinutes = convertTWHtoMins(endTime);
  var position = ((positionInMinutes - startTimeInMinutes) / TOTAL_MINS_IN_WORKDAY) * 100;
  return position;
};

/**
 * @function timelineScale
 * @param {number} - twenty four hour format
 * @return {number} - a percentage value representing a relative position on the time line
 */
var timelineScale = function (time) {
  return eventSpan(WORK_STARTS, time);
};

/**
 * @function convertTWHtoMins
 * @param {number} - twenty four hour format
 * @return {number} - return the number of seconds
 */

var convertTWHtoMins = function (time) {
  var partialMinutes = time % 100;
  var hours = (time - partialMinutes) / 100;
  var conversion = (hours * 60) + partialMinutes;
  return conversion;
};

/**
 * @function generateEventStyle
 * @param {object} event
 * @return {object} style object
 */
var generateEventStyle = function (event) {
  return {
    'left': Math.round(timelineScale(event.from)) + '%',
    'width': Math.round(eventSpan(event.from, event.to)) + '%'
  };
};

/**
 * @function ggenerateTickStyle
 * @param {object} value - value of the tick
 * @return {object} style object
 */
var generateTickStyle = function (value, width) {
  return {
    'left': Math.round(timelineScale(value)) + '%',
    'width': width + 'px'
  };
};

/**
 * @function renderEventView
 * @param {object} $parent - a jQuery wrapped element designated to contain time line moving parts
 * @param {array} collection - collection of items to render to the html view
 * @param {function} stylefn - callback that should return an object containing styles
 * @param {string} className - a class name for each element generated from the collection
 */

var renderEventView = function ($parent, collection, stylefn, className) {
  for (var i = 0; i < collection.length; i++) {
    var item = collection[i];
    var $elem = $('<div />');
    if (typeof item === 'number' || typeof item === 'string') {
      $elem.html('<label>' + item + '</label>');
    }
    $elem.css(stylefn(item)).addClass(className);
    $parent.append($elem);
  }
};

$(document).ready(function () {
  $.get('/schedule.json', function (data) {
    var $parent = $('#bars');
    renderEventView($parent, data.schedule, generateEventStyle, 'event-deltas');
    renderEventView($parent, data.ticks, generateTickStyle, 'ticks');
  });
});
