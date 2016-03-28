import Reflux from 'reflux';
import urlConfig from 'url_config';

var accountBasicInfo = {
	login: false
}

var AccountBasicInfoActions = Reflux.createActions([{
	'get': {
		asyncResult: true
	}
}, 
'clean'
]);

AccountBasicInfoActions.get.listen(function(){
	var self = this;
	$.getJSON(urlConfig.getAccountBasicInfoUrl)
	.done(function(data) {
		self.completed(data);
	})
	.fail(function(jqxhr, textStatus, error ) {
		self.failed();
	});
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

    }
});

module.exports = {
	actions: AccountBasicInfoActions,
	store: AccountBasicInfoStore
};