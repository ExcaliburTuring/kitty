/**
 * @author xiezhenzong 
 */
import Reflux from 'reflux';
import { url } from 'config';

var IndexHotActions = Reflux.createActions([
    {
        'load': {
            asyncResult: true
        }
    }
]);

IndexHotActions.load.listen(function() {
    var self = this;
    $.getJSON(url.indexHot)
    .done(function(data) {
        if (data.status == 0) {
            self.completed(data.routes)
        } else {
            self.fail();
        }
    })
    .fail(function(jqxhr, textStatus, error) {
        self.failed();
    });
});

var IndexHotStore = Reflux.createStore({

    listenables: IndexHotActions,

    onLoadCompleted: function(data) {
        this.trigger(data);
    },

    onLoadFailed: function() {
        console.log('store failed');
    }

});

module.exports = {
    actions: IndexHotActions,
    store: IndexHotStore
};
