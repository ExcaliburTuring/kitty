/**
 * @author xiezhenzong 
 */
import Reflux from 'reflux';
import { url } from 'config';

var AccountContactsActions = Reflux.createActions([{
        'get': {
            asyncResult: true
        }
    },
    'clean'
]);

AccountContactsActions.get.listen(function() {
    var self = this;
    $.getJSON(url.getAccountBasicInfoUrl)
        .done(function(data) {
            self.completed(data);
        })
        .fail(function(jqxhr, textStatus, error) {
            self.failed();
        });
});

var AccountContactsStore = Reflux.createStore({
    listenables: AccountContactsActions,
    onGet: function() {

    },
    onGetCompleted: function(data) {
        this.trigger(data);
    },
    onGetFailed: function() {
        console.log('store failed');
    },
    onClean: function() {

    }
});

module.exports = {
    actions: AccountContactsActions,
    store: AccountContactsStore
};
