/**
 * @author xiezhenzong
 */
import React from 'react';
import { Panel, Form, FormGroup, FormControl, Col, ControlLabel, HelpBlock } from 'react-bootstrap';

import validator from 'validator';

var Email = React.createClass({

    getEmail: function() {
        return this.state.email;
    },

    isChange: function() {
        return this.state.email !== this.props.defaultEmail;
    },

    onChange: function(e) {
        var value = e.target.value;
        if (this.state.email === value) {
            return;
        }
        var ret = validator.email(value);
        this.setState({
            'email': e.target.value,
            'validationState': ret['state'],
            'msg': ret['msg']
        })
    },

    revert: function() {
        this.setState({
            'email': this.props.defaultEmail,
            'validationState': null,
            'msg': '',
        });
    },

    getInitialState: function() {
        return {
            'email': this.props.defaultEmail,
            'validationState': null,
            'msg': '',
        }
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.email != prevState.email) { // 有时候state 不能立即更新，所以这里要这commponenetDidupdate
            this.props.onChange(this.state.email);
        }  
    },

    render: function() {
        var content;
        if (this.props.readOnly) {
            content = (
                <Col md={6}> <p>{this.state.email}</p> </Col>
             );
        } else {
            content = (
                <Col md={6}>
                    <FormControl
                        type="email"
                        value={this.state.email}
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
                    邮箱
                </Col>
                {content}
                <Col smHidden xsHidden md={3}>
                    <HelpBlock>{this.state.msg}</HelpBlock> 
                </Col>
            </FormGroup>
        );
    }

});

module.exports = Email;

