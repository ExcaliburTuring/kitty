/**
 * @author xiezhenzong
 */
import React from 'react';
import { Panel, Form, FormGroup, FormControl, Col, ControlLabel, HelpBlock } from 'react-bootstrap';

import validator from 'validator';

var Mobile = React.createClass({

    getMobile: function() {
        return this.state.mobile;
    },

    isChange: function() {
        return this.state.mobile !== this.props.defaultMobile;
    },

    onChange: function(e) {
        var value = e.target.value;
        if (this.state.mobile === value) {
            return;
        }
        var ret = validator.mobile(value);
        this.setState({
            'mobile': e.target.value,
            'validationState': ret['state'],
            'msg': ret['msg']
        })
    },

    revert: function() {
        this.setState({
            'mobile': this.props.defaultMobile,
            'validationState': null,
            'msg': '',
        });
    },

    getInitialState: function() {
        return {
            'mobile': this.props.defaultMobile,

            'controlId': this.props.controlId,
            'validationState': null,
            'msg': '',

            'onChange': this.props.onChange
        }
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.mobile != prevState.mobile) { // 有时候state 不能立即更新，所以这里要这commponenetDidupdate
            this.state.onChange(this.state.mobile);
        }  
    },

    render: function() {
        var content;
        if (this.props.readOnly) {
            content = (
                <Col md={6}> <p>{this.state.mobile}</p> </Col>
             );
        } else {
            content = (
                <Col md={6}>
                    <FormControl
                        type="input"
                        value={this.state.mobile}
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
                    手机
                </Col>
                {content}
                <Col smHidden xsHidden md={3}>
                    <HelpBlock>{this.state.msg}</HelpBlock> 
                </Col>
            </FormGroup>
        );
    }

});

module.exports = Mobile;

