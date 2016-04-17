/**
 * @author xiezhenzong 
 */
import Reflux from 'reflux';
import { url } from 'config';

var GroupActions = Reflux.createActions([
    {
        'get': {
            asyncResult: true
        }
    },
]);

GroupActions.get.listen(function() {
    var self = this;
    $.getJSON(url.group)
    .done(function(data) {
        if (data.status == 0) {
            self.completed(data)
        } else {
            self.fail();
        }
    })
    .fail(function(jqxhr, textStatus, error) {
        self.failed();
    });
});

var GroupStore = Reflux.createStore({
    listenables: GroupActions,
    onGet: function() {
    },
    onGetCompleted: function(data) {
        this.trigger(data);
    },
    onGetFailed: function() {
        console.log('store failed');
    }
});

module.exports = {
    actions: GroupActions,
    store: GroupStore
};
