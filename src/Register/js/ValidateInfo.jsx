import React from 'react';
import Reflux from 'reflux';
import CreateAccountScreen from './CreateAccountScreen';
import { History, Router, IndexRoute, Route, Link } from 'react-router';

var TodoActions = Reflux.createActions([
  'validate'
  ]);

var TodoStore = Reflux.createStore({
  items: {},
  listenables: [TodoActions],
  onValidate:function(data){
    var update = data;
    //这是fetch官方文档里面写的url后面加param的方法，我自己用的时候并不好使
    //var url = new URL("http://192.168.1.110:8080/service/emailValidation"),
    // params = {lat:35.696233, long:139.570431}
    //Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    //console.log(url);
    fetch("http://192.168.1.110:8080/service/emailValidation?email=aa@qq.com", {
      method: "GET",
    }).then(function(res) {
      if (res.ok) {
        res.json().then(function(data) {
          console.log(data.status);
          if(data.status=="success"){
            TodoStore.item= data.status;
            TodoStore.trigger(TodoStore.item);
          }
        });
      } else if (res.status == 401) {
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
    return (
      <div className="application_wrapper">
      <div className="application_routeHandler">
      <CreateAccountScreen onSubmit={this.onSubmit}/>
      </div>
      </div>
    )
  }
});

module.exports = ValidateInfo;