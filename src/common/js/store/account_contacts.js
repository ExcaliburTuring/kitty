/**
 * @author xiezhenzong 
 */
import Reflux from 'reflux';
import { url } from 'config';

var accountContacts = null; 

var AccountContactsActions = Reflux.createActions([
    {
        'get': {
            asyncResult: true
        }
    },
    {
        'post': {
            asyncResult: true
        }
    }
]);

AccountContactsActions.get.listen(function(option) {
    var self = this;
    $.getJSON(url.contacts)
        .done(function(data) {
           if (data.status == 0) {
                accountContacts = data.contacts;
                self.completed(accountContacts)
            } else {
                self.failed();
            }
        })
        .fail(function(jqxhr, textStatus, error) {
            self.failed();
        });
});

AccountContactsActions.post.listen(function(option) {
    //var self = this;
    // $.getJSON(url.contacts)
    //     .done(function(data) {
    //         self.completed(data);
    //     })
    //     .fail(function(jqxhr, textStatus, error) {
    //         self.failed();
    //     });
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
    onPost: function() {

    },
    onPostCompleted: function(data) {
        this.trigger(data);
    },
    onPostFailed: function() {

    }
});

module.exports = {
    actions: AccountContactsActions,
    store: AccountContactsStore
};
