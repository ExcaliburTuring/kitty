/**
 * @author xiezhenzong 
 */
import Reflux from 'reflux';
import { url } from 'config';

var accountBasicInfo = null; 

var AccountBasicInfoActions = Reflux.createActions([
    {
        'get': {
            asyncResult: true
        }
    },
    'clean'
]);

AccountBasicInfoActions.get.listen(function() {
    var self = this;
    if (accountBasicInfo) {
        self.completed(accountBasicInfo);
    } else {
        $.getJSON(url.basicinfo)
        .done(function(data) {
            if (data.status == 0) {
                accountBasicInfo = {
                    'login': data.login,
                    'accountInfo': data.accountInfo,
                    'accountSetting': data.accountSetting
                }
                self.completed(accountBasicInfo)
            } else {
                self.fail();
            }
        })
        .fail(function(jqxhr, textStatus, error) {
            self.failed();
        });
    }
});

var AccountBasicInfoStore = Reflux.createStore({
    listenables: AccountBasicInfoActions,
    onGet: function() {
    },
    onGetCompleted: function(data) {
        this.trigger(data);
    },
    onGetFailed: function() {
        console.log('store failed');
    },
    onClean: function() {
        accountBasicInfo = null;
    }
});

module.exports = {
    actions: AccountBasicInfoActions,
    store: AccountBasicInfoStore
};
