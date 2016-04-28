/**
 * @author xiezhenzong
 */
import React from 'react';
import { FormGroup, FormControl, Col, ControlLabel, HelpBlock } from 'react-bootstrap';

 var Input = React.createClass({

    render: function() {
        return (
            <FormGroup
                controlId={this.props.controlId}
                validationState={this.props.validationState}>
                <Col componentClass={ControlLabel} md={2}>
                    {this.props.label}
                </Col>
                <Col md={5}>
                    <FormControl
                        type="input" 
                        value={this.props.value}
                        onChange={this.props.onChange}
                        readOnly={this.props.readOnly}/>
                    <FormControl.Feedback />
                    <HelpBlock>{this.props.msg}</HelpBlock> 
                </Col>
            </FormGroup>
        );
    }

});

module.exports = Input;