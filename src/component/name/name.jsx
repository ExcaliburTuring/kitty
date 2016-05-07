/**
 * @author xiezhenzong
 */
import React from 'react';
import { Panel, Form, FormGroup, FormControl, Col, ControlLabel, HelpBlock } from 'react-bootstrap';

import validator from 'validator';

var Name = React.createClass({

    getName: function() {
        return this.state.name;
    },

    isChange: function() {
        return this.state.name !== this.props.defaultName;
    },

    onChange: function(e) {
        var value = e.target.value;
        if (this.state.name === value) {
            return;
        }
        var ret = validator.name(value);
        this.setState({
            'name': e.target.value,
            'validationState': ret['state'],
            'msg': ret['msg']
        })
        this.props.onChange(e, name);
    },

    revert: function() {
        this.setState({
            'name': this.props.defaultName,
            'validationState': null,
            'msg': '',
        });
    },

    getInitialState: function() {
        return {
            'name': this.props.defaultName,
            'validationState': null,
            'msg': '',
        }
    },

    render: function() {
        var content;
        if (this.props.readOnly) {
            content = (
                <Col md={6}> <p>{this.state.name}</p> </Col>
             );
        } else {
            content = (
                <Col md={6}>
                    <FormControl
                        type="text"
                        value={this.state.name}
                        onChange={this.onChange}/>
                    <FormControl.Feedback />
                </Col>
            );
        }
        return (
            <FormGroup
                controlId={this.props.controlId}
                validationState={this.state.validationState}>
                <Col componentClass={ControlLabel} smHidden xsHidden md={3}>
                    名字
                </Col>
                {content}
                <Col smHidden xsHidden md={3}>
                    <HelpBlock>{this.state.msg}</HelpBlock> 
                </Col>
            </FormGroup>
        );
    }

});

module.exports = Name;
