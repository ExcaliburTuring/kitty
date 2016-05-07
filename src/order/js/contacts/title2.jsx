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
            <div className="edit" onClick={() => {this.props.onEditBtnClick();}}>
                编辑
            </div>
        ); // 
        if (!this.props.readOnly) {
            btn = (
                <div className="edit" onClick={() => {this.props.onRevertBtnClick();}}>
                    还原
                </div>
            )

        }
        return (
            <div className="item-head">

            </div>
        );
    }

});

module.exports = Title;
