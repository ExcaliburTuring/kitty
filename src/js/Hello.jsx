var React = require('react');
var Hello = React.createClass({
  handleClick: function(i) {
    console.log('You clicked: ' + this.props.items[i]);
  },

  render: function() {
    return (
      <div>
      {this.props.items.map(function(item, i) {
        return (
          <div onClick={this.handleClick.bind(this, i)} key={i}>{item}</div>
          );
      }, this)}
      </div>
      );
  }
});
module.exports = Hello;