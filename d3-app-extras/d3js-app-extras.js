/** @ignore @hack eslint */
var d3 = d3;
var timelineFns = timelineFns;
/* -- end hack -- */

(function (tlfns) {
  var gutter = 10;
  var padding = 10;
  var viewPortHeight = 480;
  var data;

  var draw = function () {
    if (!data) return;
    var dlen = data.schedules.length;
    var lineheight = (viewPortHeight - (padding * dlen)) / dlen;
    var color = d3.scale.category20();
    d3.select('#main-group').remove();

    d3.select('#timeline')
    .attr({'width': '100%', 'height': viewPortHeight + padding })
    .append('g')
    .attr({'id': 'main-group', transform: 'translate(0, 30)' })
    .append('rect')
    .attr({'fill': '#ECECEC', 'width': '100%', 'height': viewPortHeight});

    d3.map(data.schedules)
    .forEach(function (i, userSchdules) {
      var userColor = color(i);
      var mainGroup = d3.select('#main-group').selectAll('.event-daltas' + i)
      .data(userSchdules.schedule)
      .enter();

      mainGroup.append('rect')
      .attr({'fill': function () {
        return color(i);
      },
      'height': lineheight,
      'width': function (eventd) {
        return timelineFns.generateEventStyle(eventd).width;
      },
      'x': function (eventd) {
        return timelineFns.generateEventStyle(eventd).left;
      },
      'y': function () {
        return (lineheight + padding) * Number(i);
      },
      'class': 'event-daltas' + i})
      .forEach(function (v) {
        // create username tags
        mainGroup.append('text')
        .text(function (eventd, idx) {
          if (idx > 0) return;
          return userSchdules.user;
        })
        .attr({
          'x': function (eventd) {
            return gutter;
          },
          'y': function () {
            return (lineheight + padding) * Number(i) + (padding * 2);
          }, 'class': 'userlabel' + i});
      });
    });
    // end of schedule map

    var timeline = d3.select('#main-group')
    .selectAll('.ticks')
    .data(data.ticks)
    .enter();

    var now = new Date();

    timeline.append('rect')
      .attr({'class': 'ticks', 'x': function (tickValue, i) {
        var x = timelineFns.generateTickStyle(tickValue).n_left * 100;
        return (x > 99) ? (x - 0.1) + '%' : x + '%';
      }})
      .attr({'fill': 'black', 'height': viewPortHeight, 'width': function (tickValue) {
        return timelineFns.generateTickStyle(tickValue, 1.5).width;
      }
      });

    timeline.append('text')
      .text(function (tickValue) {
        return timelineFns.labelFormat(tickValue);
      })
      .attr({'y': -gutter, 'class': 'label', 'x': function (tickValue, i) {
        var x = timelineFns.generateTickStyle(tickValue).n_left * 100;
        return (x > 99) ? (x - 4) + '%' : x + '%';
      }});

    d3.select('#main-group')
      .append('rect')
      .attr({'class': 'now', 'x': function () {
        var zerohours = (now.getHours() * 100) + now.getMinutes();
        return timelineFns.generateTickStyle((now.getHours() * 100) + now.getMinutes()).left;
      }, 'width': 100})
      .attr({'fill': 'red', 'height': viewPortHeight, 'width': 1});

    d3.select('#main-group')
      .append('text')
      .text(function (tickValue) {
        return timelineFns.labelFormat((now.getHours() * 100) + now.getMinutes());
      })
      .attr({'y': viewPortHeight - (gutter * 3), 'class': 'label', 'x': function (tickValue) {
        return timelineFns.generateTickStyle((now.getHours() * 100) + now.getMinutes()).left;
      }});
  };

  function redrawWithData () {
    d3.json('/multi-schedules.json', function (erro, responseData) {
      data = responseData;
      draw();
    });
  }

  window.addEventListener('load', function () {
    redrawWithData();
  });

  window.addEventListener('resize', function () {
    draw();
  });

  window.setInterval(function () {
    redrawWithData();
  }, 600);
}(timelineFns));
