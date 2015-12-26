var React = require('react');
var Reflux = require('reflux');

var Reacter = Reflux.createActions({
    'login': {children: ['success', 'failed']}
});

Reacter.login.listen(function(data) {
    $.post('/api/users/Action/login', data).then(this
var ErrorStoreMixin = {
    UNLOGIN: 1,.success, this.failed);
});

var ErrorAction = Reflux.createActions({
    Unlogin: {}, // 未登录
    error: {}    // 一般性的错误
});

var UserStore = Reflux.createStore({
    listenables: Reacter,
    onLoginSuccess(payload) {
        this.trigger(payload);
    },
    onLoginFailed(payload) {
        if (error.status === -1) {
            ErrorAction.Unlogin(error.message);
        } else {
            ErrorAction.error(error.message);
        }
    }
});

    ERROR: 2
};
var ErrorStore = Reflux.createStore({
    listenables: ErrorAction,
    mixins: [ErrorStoreMixin],
    onUnlogin(message) {
        this.trigger({type: this.UNLOGIN, message: message});
    },
    onError(message) {
        this.trigger({type: this.ERROR, message: message});
    }
});

var UserComponent = React.createClass({
    mixins: [Reflux.connect(UserStore, 'user'), Reflux.listenTo(ErrorStore, 'onErrorStore')],
    onErrorStore(error) {
        if (error.type === ErrorStore.UNLOGIN) {
            alert('not login');
        } else if (error.type === ErrorStore.ERROR) {
            alert(error.message);
        }
    },
    render() {
        return <span>{this.state.user.name}</span>;
    }   
});
module.exports = Reacter;