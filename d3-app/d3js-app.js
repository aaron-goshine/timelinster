/** @ignore @hack eslint */
var d3 = d3;
var timelineFns = timelineFns;
/* -- end hack -- */

window.addEventListener('load', function () {
  /**
   * fetch Schedule data
   */
  d3.json('/schedule.json', function (error, data) {
    if (error) {
      console.log(error);
      return;
    }
    d3.select('#timeline')
    .attr({'width': '100%', 'height': '4em'})
    .append('rect')
    .attr({'fill': '#ECECEC', 'width': '100%', 'height': '2em', 'y': '1.5em'});

    d3.select('#timeline').selectAll('.event-daltas')
    .data(data.schedule)
    .enter()
    .append('rect')
    .attr({'width': function (eventd) {
      return timelineFns.generateEventStyle(eventd).width;
    }, 'x': function (eventd) {
      return timelineFns.generateEventStyle(eventd).left;
    }, 'class': 'event-daltas', 'fill': '#94BF21', 'height': '2em', 'y': '1.5em'});

    // ---
    var timeline = d3.select('#timeline')
    .selectAll('.ticks')
    .data(data.ticks)
    .enter();

    // ---
    timeline.append('rect')
    .attr({'class': 'ticks', 'x': function (tickValue, i) {
      var x = timelineFns.generateTickStyle(tickValue).n_left * 100;
      return (x > 99) ? (x - 0.5) + '%' : x + '%';
    }, 'width': function (tickValue) {
      return timelineFns.generateTickStyle(tickValue).width;
    }, 'fill': 'black', 'height': '2em', 'y': '1.5em'});

    // ---
    timeline.append('text')
    .text(function (tickValue) {
      return timelineFns.labelFormat(tickValue);
    })
    .attr({'y': '1.0em', 'class': 'label', 'x': function (tickValue, i) {
      var x = timelineFns.generateTickStyle(tickValue).n_left * 100;
      return (x > 99) ? (x - 4) + '%' : x + '%';
    }});
  });
});
