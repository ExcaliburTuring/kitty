/**
 * @author xiezhenzong
 */
import React from 'react';
import { Button } from 'react-bootstrap';

var FaButton = React.createClass({

    render: function() {
        return (
            <Button className="title-btn" bsSize="xsmall" onClick={this.props.onClick}>
                <i className={this.props.faClass} aria-hidden="true"/>{' '}
            </Button>
        );
    }

});

module.exports = FaButton;
