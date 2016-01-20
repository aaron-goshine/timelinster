
(function (tlfns) {
  /**
   * @function renderEventView
   * @param {object} parent - a Dom element designated to contain time line moving parts
   * @param {array} collection - collection of items to render to the html view
   * @param {function} stylefn - callback that should return an object containing styles
   * @param {string} className - a class name for each element generated from the collection
   */

  var renderEventView = function (parentElement, collection, stylefn, className) {
    for (var i = 0; i < collection.length; i++) {
      var item = collection[i];
      var styles = stylefn(item);
      var divElement = document.createElement('div');
      divElement.setAttribute('class', className);
      divElement.style.width = styles.width;
      divElement.style.left = styles.left;

      if (typeof item === 'number' || typeof item === 'string') {
        var labelElement = document.createElement('label');
        labelElement.innerHTML = tlfns.labelFormat(item);
        divElement.appendChild(labelElement);
      }
      parentElement.appendChild(divElement);
    }
  };

  var responseCallback = function (data) {
    var parentElement = document.getElementById('bars');
    renderEventView(parentElement, data.schedule, tlfns.generateEventStyle, 'event-deltas');
    renderEventView(parentElement, data.ticks, tlfns.generateTickStyle, 'ticks');
  };

  window.addEventListener('load', function () {
    var roger = new XMLHttpRequest();
    roger.open('GET', '/schedule.json', true);
    roger.onreadystatechange = function () {
      if (roger.readyState !== 4 || roger.status !== 200) return;
      responseCallback(JSON.parse(roger.responseText));
    };
    roger.send();
  });
}(timelineFns));
