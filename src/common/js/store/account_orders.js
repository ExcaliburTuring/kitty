/**
 * @author xiezhenzong 
 */
import Reflux from 'reflux';
import { url } from 'config';

var accountOrders = null; 

var AccountOrdersActions = Reflux.createActions([
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

AccountOrdersActions.get.listen(function(option) {
    var self = this;
    $.getJSON(url.accountOrders)
    .done(function(data) {
       if (data.status == 0) {
            accountOrders = data;
            self.completed(accountOrders)
        } else {
            self.fail();
        }
    })
    .fail(function(jqxhr, textStatus, error) {
        self.failed();
    });
});

AccountOrdersActions.post.listen(function(option) {
    //var self = this;
    // $.getJSON(url.contacts)
    //     .done(function(data) {
    //         self.completed(data);
    //     })
    //     .fail(function(jqxhr, textStatus, error) {
    //         self.failed();
    //     });
});

var AccountOrdersStore = Reflux.createStore({
    listenables: AccountOrdersActions,
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
    actions: AccountOrdersActions,
    store: AccountOrdersStore
};
