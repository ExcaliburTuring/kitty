/**
 * @author xiezhenzong 
 */
import Reflux from 'reflux';
import { url } from 'config';

var _accountBasicInfo = {};

var AccountBasicInfoActions = Reflux.createActions([
    {
        'load': {
            asyncResult: true
        }
    },
    'get',
    'clean'
]);

AccountBasicInfoActions.load.listen(function() {
    var self = this;
    $.getJSON(url.basicinfo)
    .done(function(data) {
        if (data.status == 0) {
            _accountBasicInfo = data.accountBasicInfo || {};
            self.completed(_accountBasicInfo)
        } else {
            self.failed();
        }
    })
    .fail(function(jqxhr, textStatus, error) {
        self.failed();
    });
});

var AccountBasicInfoStore = Reflux.createStore({
    listenables: AccountBasicInfoActions,
    onGet: function() {
        this.trigger(_accountBasicInfo);
    },
    onLoadCompleted: function(data) {
        this.trigger(data);
    },
    onLoadFailed: function() {
        console.log('store failed');
    },
    onClean: function() {
        _accountBasicInfo = {};
        this.trigger(_accountBasicInfo);
    }
});

module.exports = {
    actions: AccountBasicInfoActions,
    store: AccountBasicInfoStore
};
