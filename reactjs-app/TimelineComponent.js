var TimelineComponent = React.createClass({
  displayName: 'TimelineComponent',
  generateEventSpans: function generateEventSpans () {
    var data = this.props.data.schedule;
    return data.map(function (event, index) {
      return React.createElement('div', { key: index, className: 'event-deltas',
        style: timelineFns.generateEventStyle(event) });
    });
  },
  generateTicks: function generateTicks () {
    var data = this.props.data.ticks;
    return data.map(function (item, index) {
      return React.createElement(
        'div',
        { key: index, className: 'ticks', style: timelineFns.generateTickStyle(item) },
        React.createElement(
          'label',
          null,
          timelineFns.labelFormat(item)
        )
      );
    });
  },
  render: function render () {
    return React.createElement(
      'div',
      { className: 'component' },
      React.createElement(
        'div',
        { className: 'time-line', id: 'time-line' },
        'rendered',
        React.createElement(
          'div',
          { className: 'bars', id: 'bars' },
          this.generateEventSpans(),
          this.generateTicks()
        ),
        React.createElement('hr', null)
      )
    );
  }
});
