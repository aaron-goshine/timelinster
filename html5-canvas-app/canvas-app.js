
(function (tlfns) {

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var data;
  var barHeight = 30;
  var topMargin = 20;
  var draw = function () {
    var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop('0', '#FFCC00');
    gradient.addColorStop('0.5', 'orange');
    gradient.addColorStop('1.0', '#94BF21');

    ctx.fillStyle = '#ECECEC';
    ctx.fillRect(0, topMargin, canvas.width, barHeight);

    ctx.canvas.width = window.innerWidth;
    ctx.font = '15px Helvetica';
    for (var i = 0; i < data.schedule.length; i++) {
      ctx.fillStyle = gradient;
      var eventStyle = tlfns.generateEventStyle(data.schedule[i]);
      ctx.fillRect(canvas.width * Number(eventStyle.n_left),
        topMargin, canvas.width * Number(eventStyle.n_width), barHeight);
    }

    for (var j = 0; j < data.ticks.length; j++) {
      ctx.fillStyle = 'black';
      var tickSytyle = tlfns.generateTickStyle(data.ticks[j], 5);
      ctx.fillRect(canvas.width * Number(tickSytyle.n_left),
        topMargin, tickSytyle.n_width, barHeight);

      ctx.fillStyle = gradient;
      var formattedLabel = tlfns.labelFormat(String(data.ticks[j]));
      ctx.fillText(formattedLabel, canvas.width * Number(tickSytyle.n_left), 15);
    }
  };

  window.addEventListener('load', function () {
    var roger = new XMLHttpRequest();
    roger.open('GET', '/schedule.json', true);
    roger.onreadystatechange = function () {
      if (roger.readyState !== 4 || roger.status !== 200) return;
      data = JSON.parse(roger.responseText);
      draw();
    };
    roger.send();
  });

  window.addEventListener('resize', function () {
    if (!data) return;
    draw();
  });
}(timelineFns));
