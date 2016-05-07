/**
 * @author xiezhenzong 
 */
import Reflux from 'reflux';
import { url } from 'config';

var _accountBasicInfo = null;

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
            _accountBasicInfo = {
                'accountInfo': data.accountInfo,
                'accountSetting': data.accountSetting
            }
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
        this.trigger(_accountBasicInfo ? _accountBasicInfo : {'login': false});
    },
    onLoadCompleted: function(data) {
        this.trigger(data);
    },
    onLoadFailed: function() {
        console.log('store failed');
    },
    onClean: function() {
        _accountBasicInfo = null;
    }
});

module.exports = {
    actions: AccountBasicInfoActions,
    store: AccountBasicInfoStore
};
