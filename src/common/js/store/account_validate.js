/**
 * @author xiezhenzong 
 */
import Reflux from 'reflux';
import { url } from 'config';

var AccountValidateActions = Reflux.createActions([{
    'validateEmail': {
        asyncResult: true
    }
}, {
    'validateTell': {
        asyncResult: true
    }
}]);

AccountValidateActions.validateEmail.listen(function() {
    var self = this;
    $.getJSON(url.validateEmail)
        .done(function(data) {
            self.completed(data);
        })
        .fail(function(jqxhr, textStatus, error) {
            self.failed();
        });
});

AccountValidateActions.validateTell.listen(function() {
    var self = this;
    $.getJSON(url.validateTell)
        .done(function(data) {
            self.completed(data);
        })
        .fail(function(jqxhr, textStatus, error) {
            self.failed();
        });
});

var AccountValidateStore = Reflux.createStore({
    listenables: AccountValidateActions,
    onValidateEmail: function() {

    },
    onValidateEmailCompleted: function(data) {
        this.trigger(data);
    },
    onValidateEmailFailed: function() {
        console.log('store failed');
    },
    onVaildateTell: function() {

    },
    onValidateTellCompleted: function(data) {

    },
    onValidateTellFailed: function(data) {

    }
});

module.exports = {
    actions: AccountValidateActions,
    store: AccountValidateStore
};
