(function (win) {
  // 720 was derived by converting the 12 hrs between 8AM to  8PM
  var TOTAL_MINS_IN_WORKDAY = 720;
  // Work seems to start at 8AM
  var WORK_STARTS = 800;

  win.timelineFns = {};

  /**
   * @function  eventSpan
   * @param {number} startTime - a value representing the start time in twenty four hour format
   * @param {number} endTime - a value representing the end time in twenty four hour format
   * @return {number} - as percentage value representing the width of the span
   */
  win.timelineFns.eventSpan = function (startTime, endTime) {
    var startTimeInMinutes = win.timelineFns.convertTWHtoMins(startTime);
    var positionInMinutes = win.timelineFns.convertTWHtoMins(endTime);
    var position = ((positionInMinutes - startTimeInMinutes) / TOTAL_MINS_IN_WORKDAY) * 100;
    return (position).toFixed(2);
  };

  /**
   * @function timelineScale
   * @param {number} time - twenty four hour format
   * @return {number} - a percentage value representing a relative position on the time line
   */
  win.timelineFns.timelineScale = function (time) {
    return win.timelineFns.eventSpan(WORK_STARTS, time);
  };

  /**
   * @function convertTWHtoMins
   * @param {number} - twenty four hour format
   * @return {number} - return the number of seconds
   */

  win.timelineFns.convertTWHtoMins = function (time) {
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
  win.timelineFns.generateEventStyle = function (event) {
    var left = win.timelineFns.timelineScale(event.from);
    var width = win.timelineFns.eventSpan(event.from, event.to);

    return {
      'left': left + '%',
      'width': width + '%',
      'n_left': left / 100,
      'n_width': width / 100
    };
  };
  /**
   * @function generateTickStyle
   * @param {object} value - value of the tick
   * @return {object} style object
   */
  win.timelineFns.generateTickStyle = function (value, paramWidth) {
    var left = win.timelineFns.timelineScale(value);
    var width = paramWidth || 5;
    return {
      'left': left + '%',
      'width': width + 'px',
      'n_left': left / 100,
      'n_width': width
    };
  };

  /**
   * @function labelFormat
   * @param  {string|number} - twenty four hours format value
   * @return {string} - a formatted string with the semicolon in the correct
   * place.
   */
  win.timelineFns.labelFormat = function (value) {
    if (!value || value.length > 4) return value;
    var valueStr = String(value);
    var valueArr = (['', '0', '00', '000'][4 - valueStr.length] + valueStr).split('');
    valueArr.splice(2, 0, ':');
    return valueArr.join('');
  };
}(window));
