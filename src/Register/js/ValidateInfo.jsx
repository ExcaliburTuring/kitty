import React from 'react';
import Reflux from 'reflux';
import CreateAccountScreen from './CreateAccountScreen';
import { History, Router, IndexRoute, Route, Link } from 'react-router';
var img = document.createElement('img');
img.src = require('../img/bg_city.png');

var TodoActions = Reflux.createActions([
  'validate'
  ]);

var TodoStore = Reflux.createStore({
  items: {},
  listenables: [TodoActions],
  onValidate:function(data){
    var formData = JSON.stringify(data);
    console.log(formData);
    fetch("http://192.168.1.110:8080/service/emailValidation", {
      method: "POST", body: formData
    }).then(function(res) {
      if(res.ok) {
        res.json().then(function(data) {
          console.log(data.status);
          if(data.status=="success"){
            TodoStore.item= data.status;
            TodoStore.trigger(TodoStore.item);
          }
        });
      }else if (res.status == 401) {
        console.log("401");
      }
    });

  },
});

var ValidateInfo = React.createClass({
  mixins: [History,Reflux.connect(TodoStore, 'items')],
  getInitialState: function () {
    return {items:{}};
  },
  onStatusChange: function (result) {
    this.setState({map: result});
    if(result == "success"){this.history.pushState(result, '/Signin',result);}    
  },
  onSubmit: function(model) {  
    this.unsubscribe = TodoStore.listen(this.onStatusChange);
    TodoActions.validate(model);
  },
  componentWillUnmount: function () {
    this.unsubscribe();
  },
  render: function() {
    var data = this.state.map;
    var bgStyle = {
        backgroundImage: "url(" + img.src + ")"
    };
    return (
      <div className="application_wrapper">
      <div className="application_routeHandler">
        <CreateAccountScreen onSubmit={this.onSubmit}/>
        <div className="create_account_bg" style={bgStyle}></div>
      </div>
      </div>
    )
  }
});

module.exports = ValidateInfo;