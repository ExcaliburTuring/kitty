/**
 * @author xiezhenzong 
 */
import Reflux from 'reflux';

function _createActions(url) {
    var RabbitActions = Reflux.createActions([
        {
            'load': {
                asyncResult: true
            }
        }
    ]);
    RabbitActions.load.listen(function(option) {
        var self = this;
        var getJSON = option ? $.getJSON(url, option) : $.getJSON(url);
        getJSON.done(function(data) {
            if (data.status == 0) {
                self.completed(data)
            } else {
                self.failed(data.errors);
            }
        })
        .fail(function(jqxhr, textStatus, error) {
            self.failed(error);
        });
    });
    return RabbitActions;
}

function _createStore(actions) {
    return Reflux.createStore({

        listenables: actions,

        onLoadCompleted: function(data) {
            this.trigger(data);
        },

        onLoadFailed: function(errors) {
            console.log(JSON.stringify(errors));
        }

    });
}

var Rabbit =  {

    create: function (url) {
        var actions = _createActions(url);
        var store = _createStore(actions);
        return {
            actions: actions,
            store: store
        };
    }

}

module.exports = Rabbit;
