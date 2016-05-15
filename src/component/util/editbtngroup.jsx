/** 
 * @author xiezhenzong
 */
import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import FaButton from './fabutton';

import './buttongroup.less';

var EditButtonGroup = React.createClass({

    render: function() {
        if (this.props.readOnly) {
            return (
                <ButtonGroup>
                    <FaButton faClass="fa fa-pencil-square-o" onClick={this.props.onEditBtnClick}/>
                    {this.props.children}
                </ButtonGroup>
            );
        } else {
            if (this.props.isChange) {
                return (
                    <ButtonGroup >
                        <FaButton faClass="fa fa-undo" onClick={this.props.onRevertBtnClick}/>
                        <FaButton faClass="fa fa-check-circle" onClick={this.props.onSubmitBtnClick}/>
                        {this.props.children}
                    </ButtonGroup>
                );
            } else {
                return (
                    <ButtonGroup>
                        <FaButton faClass="fa fa-times" onClick={this.props.onCancelBtnClick}/>
                        {this.props.children}
                    </ButtonGroup>
                );
            }
        }
    }

});



module.exports = EditButtonGroup;
