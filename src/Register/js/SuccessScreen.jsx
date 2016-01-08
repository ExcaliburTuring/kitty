import React from 'react';
import { browserHistory, Router, IndexRoute, Route, Link } from 'react-router';


var Signin = React.createClass({
  render: function() {
    var success = this.props.location.state;
    return (
      <div className="success_screen">
        <div className="success_form">
          <h1>Thanks</h1>
          <p>Form has been validated and submitted</p>
          <span>Your email:{success}</span>
        </div>
      </div>
    );
  }
    
});
    
module.exports = Signin;