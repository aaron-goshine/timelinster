window.addEventListener('load', function () {
  /**
   * fetch Schedule data
   */
  d3.json('/schedule.json', function (error, data) {
    d3.select('#timeline')
    .style({'width': '100%', 'height': '2em'})
    .append('rect')
    .style({'fill': '#ECECEC', 'width': '100%', 'height': '2em'});

    d3.select('#timeline').selectAll('.event-daltas')
    .data(data.schedule)
    .enter()
    .append('rect')
    .style({'fill': '#94BF21', 'height': '2em'})
    .attr({'width': function (eventd) {
      return timelineFns.generateEventStyle(eventd).width;
    }, 'x': function (eventd) {
      return timelineFns.generateEventStyle(eventd).left;
    }, 'class': 'event-daltas'});

    // ---
    var timeline = d3.select('#timeline')
    .selectAll('.ticks')
    .data(data.ticks)
    .enter();

    // ---
    timeline.append('rect')
    .attr({'class': 'ticks', 'x': function (tickValue, i) {
      var x = timelineFns.generateTickStyle(tickValue).n_left * 100;
      // pure magic
      if (i > 0) {
        x = x - 0.5;
      }
      return x + '%';
    }, 'width': function (tickValue) {
      return timelineFns.generateTickStyle(tickValue).width;
    }})
    .style({'fill': 'black', 'height': '2em'});

    // ---
    timeline.append('text')
    .text(function (tickValue) {
      return timelineFns.labelFormat(tickValue);
    })
    .attr({'y': '-1em', 'class': 'label', 'x': function (tickValue, i) {
      var x = timelineFns.generateTickStyle(tickValue).n_left * 100;
      // pure magic
      if (i > 0) {
        x = x - 4;
      }
      return x + '%';
    }});
  });
});
