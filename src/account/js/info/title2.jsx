/**
 * @author
 */
import React from 'react';
import { Col, Button, ButtonGroup } from 'react-bootstrap';

var Title = React.createClass({

    render: function() {
        var readOnly = this.props.readOnly;
        var isChange = this.props.isChange;
        var btn = (
            <button className="edit" onClick={() => {this.props.onEditBtnClick();}}>
                编辑
            </button>
        ); // 
        if (!this.props.readOnly) {
            btn = (
                <button className="edit" onClick={() => {this.props.onRevertBtnClick();}}>
                    还原
                </button>
            )

        }
        return (
            <div className="item-head">
                <Col md={2}>
                    <div className="item-title">
                        {this.props.title}
                    </div>
                </Col>
                <Col md={8}>
                    <div className="separator-line"/>
                </Col>
                <Col md={2}>
                        {btn}
                </Col>
            </div>
        );
    }

});

module.exports = Title;
