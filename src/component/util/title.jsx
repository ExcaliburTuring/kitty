/**
 * @author
 */
import React from 'react';

var Title = React.createClass({

    _getTitle: function() {
        var href = this.props.href;
        if (href) {
            return (
                <h3 className="pull-left">
                    <a href={href} target="_blank">
                        {this.props.title}
                    </a>
                </h3>
            );
        } else {
            return (
                <h3 className="pull-left">{this.props.title}</h3>
            );
        }
    },

    render: function() {
        var leftNode, rightNode;
        var children = React.Children.toArray(this.props.children);
        if (children.length == 1) {
            rightNode = this.props.children;
        } else if (children.length == 2) {
            leftNode = (
                <div className="pull-left">
                    { children[0] }
                </div>
            );
            rightNode = children[1];
        } else {
            leftNode = children.slice(0, children.length - 1).map(function(node, index) {
                return (
                    <div key={`title-${index}`} className="pull-left">
                        { node }
                    </div>
                )
            }) ;
            rightNode = children.slice(children.length - 1) ;
        }
        var title = this._getTitle();
        return (
            <div className={`${this.props.className} clearfix`}>
                { title }
                { leftNode }
                <div className="pull-right">
                    { rightNode }
                </div>
            </div>
        );
    }

});

module.exports = Title;