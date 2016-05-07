/**
 * @author xiezhenzong
 */
import React from 'react';
import { FormGroup, ControlLabel,  HelpBlock, Col } from 'react-bootstrap';
import { DatePicker } from 'antd';

import validator from 'validator';

require('antd/lib/index.css');

var Birthday = React.createClass({

    getBirthday: function() {
        return  this.state.birthday;
    },

    setBirthday: function(b) {
        this.setState({
            'birthday': b
        });
    },

    isChange: function() {
        return this.state.birthday !== this.props.defaultBirthday;
    },

    onChange: function( e) {
        var birthday = e;
        if (birthday == this.state.birthday) {
            return;
        }
        this.setState({
            'birthday': birthday
        });
       // this.state.onChange(birthday); 在componentDidUpdate里调用
    },

    revert: function() {
        this.setState({
            'birthday': this.props.defaultBirthday,
            'validationState': null,
            'msg': '',
        });
    },

    getInitialState: function() {
        return {
            'birthday': this.props.defaultBirthday,
            'validationState': null,
            'msg': '',
        };
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.birthday != prevState.birthday) { // 有时候state 不能立即更新，所以这里要这commponenetDidupdate
            this.props.onChange(this.state.birthday);
        }  
    },

    render: function() {
        return (
            <FormGroup
                controlId={this.props.controlId}
                validationState={this.state.validationState}>
                <Col componentClass={ControlLabel} smHidden xsHidden md={3}>
                    生日
                </Col>
                <Col md={6}>
                    <DatePicker
                        defaultValue={this.state.birthday}
                        onChange={this.onChange}
                        disabled={this.props.readOnly} />
                </Col>
                <Col smHidden xsHidden md={3}>
                    <HelpBlock>{this.state.msg}</HelpBlock> 
                </Col>
            </FormGroup>
        );
    }
});

module.exports = Birthday;
