var React = require('react');
var CreateAccountScreen = require('./CreateAccountScreen');
var SuccessScreen = require('./SuccessScreen');

var App = React.createClass({
  getInitialState: function () {
    return {
      email: ''
    };
  },
  onChange:function(data){
    var update = data;
    $.post('./A.json',JSON.stringify(data), function (e) {
      this.items = JSON.parse(e);
      alert(this.items);
    }.bind(this));
    if(data != null){
      this.setState({email: update.email})
    }else{

    }
  },
  render: function() {
    return (
      <div className="application_wrapper">

      <div className="application_routeHandler">
      <CreateAccountScreen
      onChange={this.onChange}
      />
      <SuccessScreen
      email={this.state.email}

      />
      </div>

      </div>
      );
  }
  
});

module.exports = App;