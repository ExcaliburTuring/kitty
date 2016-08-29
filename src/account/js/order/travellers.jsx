/**
 * @author xiezhenzong
 */
import React from 'react'; 

var TravellerList = React.createClass({

    render: function() {
        var keyPrefix = this.props.keyPrefix;
        if (this.props.names == null) {
            return (
                <div className="traveller-names">
                    {travellers}
                </div>
            );
        }
        var travellers = this.props.names.map(function(name, index) {
            return (
                <p key={`${keyPrefix}-${index}`}><i className="fa fa-check-square-o" />{name}</p>
            );
        });
        return (
            <div className="traveller-names">
                {travellers}
            </div>
        );
    }
});

module.exports = TravellerList;
