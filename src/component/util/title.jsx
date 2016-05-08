/**
 * @author
 */
import React from 'react';

var Title = React.createClass({

    render: function() {
        return (
            <div className={this.props.className}>
                <h3 className="pull-left">{this.props.title}</h3>
                <div className="pull-right">
                    {this.props.children}
                </div>
            </div>
        );
    }

});

module.exports = Title;