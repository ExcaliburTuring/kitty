var Reflux = require('reflux');
var React = require('react');

var TodoActions = Reflux.createActions([
    'addItem'
]);

var TodoStore = Reflux.createStore({
    items: [1, 2],
    listenables: [TodoActions],
    onAddItem: function (model) {
        $.post('http://192.168.1.110:8080/service/emailValidation?email=aa@qq.com', function (data) {
            this.items.unshift(data);
            this.trigger(this.items);
        });
    }
});


var App = React.createClass({
    mixins: [Reflux.listenTo(TodoStore, 'onStatusChange')],
    getInitialState: function () {
        return {list: []};
    },
    onStatusChange: function () {
        this.setState({list: TodoStore.items});
    },
    render: function () {
        return (
            <div>THIS is items
                {this.state.list.map(function (item) {
                    return <p>{item}</p>
                })}
            </div>
        )
    }
});

module.exports = App;