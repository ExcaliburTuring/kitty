/**
 * @author
 */
import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';

var Title = React.createClass({

    render: function() {
        var readOnly = this.props.readOnly;
        var isChange = this.props.isChange;
        var btn = (
            <Button className="pull-right title-btn" bsSize="xsmall" onClick={() => {this.props.onEditBtnClick();}}>
                <i className="fa fa-pencil-square-o" aria-hidden="true"/>{' '}
            </Button>
        ); // 
        if (!this.props.readOnly) { // 并非readOnly，则有可能是有修改或者是没有修改
            if (isChange) {
                btn = (
                    <ButtonGroup className="pull-right title-btn">
                        <Button bsSize="xsmall" onClick={() => {this.props.onRevertBtnClick();}}>
                            <i className="fa fa-undo" aria-hidden="true"/>{' '}
                        </Button>
                        <Button bsSize="xsmall" onClick={() => {this.props.onSubmitBtnClick();}}>
                            <i className="fa fa-check-circle" aria-hidden="true"/>{' '}
                        </Button>
                    </ButtonGroup>
                );
            } else {
                btn = (
                    <Button className="pull-right title-btn" bsSize="xsmall" onClick={() => {this.props.onCancelBtnClick();}}>
                        <i className="fa fa-times" aria-hidden="true"/>{' '}
                    </Button>
                );
            }
        } 
        return (
            <h3 className="panel-title">{this.props.title}
                {btn}
            </h3>
        );
    }

});

module.exports = Title;
