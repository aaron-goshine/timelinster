/**
 * @ignore @hack for eslint
 */
var timelineFns = timelineFns;
var jQuery = jQuery;
// --- end hack --- //

(function ($, tlfns) {
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
        $elem.html('<label>' + tlfns.labelFormat(item) + '</label>');
      }
      var style = stylefn(item);
      $elem.css({'width': style.width, 'left': style.left}).addClass(className);
      $parent.append($elem);
    }
  };

  $(document).ready(function () {
    $.get('/schedule.json', function (data) {
      var $parent = $('#bars');
      renderEventView($parent, data.schedule, tlfns.generateEventStyle, 'event-deltas');
      renderEventView($parent, data.ticks, tlfns.generateTickStyle, 'ticks');
    });
  });
}(jQuery, timelineFns));
