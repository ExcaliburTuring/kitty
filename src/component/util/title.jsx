/**
 * @author
 */
import React from 'react';

var Title = React.createClass({

    render: function() {
        var leftNode, rightNode;
        var children = React.Children.toArray(this.props.children);
        if (children.length == 1) {
            rightNode = this.props.children;
        } else {
            leftNode = children.slice(0, children.length - 1) ;
            rightNode = children.slice(children.length - 1) ;
        }
        return (
            <div className={`${this.props.className} clearfix`}>
                <h3 className="pull-left">{this.props.title}</h3>
                <div className="pull-left">
                    { leftNode }
                </div>
                <div className="pull-right">
                    { rightNode }
                </div>
            </div>
        );
    }

});

module.exports = Title;