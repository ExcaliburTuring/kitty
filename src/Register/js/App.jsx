var React = require('react');
var CreateAccountScreen = require('./CreateAccountScreen');
var SuccessScreen = require('./SuccessScreen');
var Reflux = require('reflux');

var TodoActions = Reflux.createActions([
  'validate'
  ]);

var TodoStore = Reflux.createStore({
  items: {},
  listenables: [TodoActions],
  onValidate:function(data){
    var update = data;
    //var url = new URL("http://192.168.1.110:8080/service/emailValidation"),
    // params = {lat:35.696233, long:139.570431}
    //Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    //console.log(url);
    //这个地方是fetch官方文档里面写的url后面加param的方法，我自己用的时候也不好使

    console.log(data);
    fetch("http://192.168.1.110:8080/service/emailValidation?email=aa@qq.com", {
      method: "GET",
    }).then(function(res) {
      if (res.ok) {
        res.text().then(function(data) {
          console.log(data);
          this.items=data; //这个data怎么往items里面传 就不会了
        });
      } else if (res.status == 401) {
        console.log("401");
      }
    }, function(e) {
      console.log(e);
    });
  },
});


var App = React.createClass({
  mixins: [Reflux.connect(TodoStore, 'items')],
  getInitialState: function () {
    return {items:{}};
  },
  onSubmit: function(data) {  
    TodoActions.validate(data);
  },  
  render: function () {
    return (
     <TodoItem onSubmit={this.onSubmit} data={this.state.map}/>
     )
  }
});


var TodoItem = React.createClass({
  onChange:function(data){
    this.props.onSubmit(data);
    console.log(data);
  },
  render: function() {
    return (
      <div className="application_wrapper">

      <div className="application_routeHandler">
      <CreateAccountScreen
      onChange={this.onChange}
      />
      <SuccessScreen
      email={this.props.data}

      />
      </div>

      </div>
      );
  }
  
});

module.exports = App;