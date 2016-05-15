/**
 * @author xiezhenzong
 */
import React from 'react';

var FaButton = React.createClass({

    render: function() {
        return (
            <div className="title-btn" onClick={this.props.onClick}>
                <i className={this.props.faClass} aria-hidden="true"/>
            </div>
        );
    }

});

module.exports = FaButton;
