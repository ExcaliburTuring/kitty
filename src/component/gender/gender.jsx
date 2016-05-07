/**
 * @author xiezhenzong
 */
import React from 'react';
import { FormGroup, ControlLabel, HelpBlock, Radio, Col } from 'react-bootstrap';

import { gender } from 'config';
import validator from 'validator';

const UNKNOW_DESC = gender.getDesc(gender.UNKNOW);
const MALE_DESC = gender.getDesc(gender.MALE);
const FEMALE_DESC = gender.getDesc(gender.FEMALE);

var Gender = React.createClass({

    getGender: function() {
        return  this.state.gender;
    },

    setGender: function(g) {
        this.setState({
            'gender': g
        });
    },

    isChecked: function(type) {
        var g = this.getGender();
        return type === g;
    },

    isChange: function() {
        return this.state.gender !== this.props.defaultGender;
    },

    onChange: function(type, e) {
        if (this.props.readOnly) {
            return;
        }
        this.setState({
            'gender': type,
        });
    },

    revert: function() {
        return this.setState({
            'gender': this.props.defaultGender,
        });
    },

    getInitialState: function() {
        return {
            'gender': this.props.defaultGender,
        };
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.gender != prevState.gender) { // 有时候state 不能立即更新，所以这里要这commponenetDidupdate
            this.props.onChange(this.state.gender);
        }  
    },

    render: function() {
        return (
           <FormGroup
                controlId={this.props.controlId}>
                <Col componentClass={ControlLabel} smHidden xsHidden md={3}>
                    性别
                </Col>
                <Col md={6}>
                    <Radio 
                        inline
                        checked={this.isChecked(gender.UNKNOW)}
                        onChange={(e) => {this.onChange(gender.UNKNOW, e)}}>
                        {UNKNOW_DESC}
                    </Radio>
                    <Radio 
                        inline 
                        checked={this.isChecked(gender.MALE)}
                        onChange={(e) => {this.onChange(gender.MALE, e)}}>
                        {MALE_DESC}
                    </Radio>
                    <Radio 
                        inline 
                        checked={this.isChecked(gender.FEMALE)}
                        onChange={(e) => {this.onChange(gender.FEMALE, e)}}>
                        {FEMALE_DESC}
                    </Radio>
                </Col>
            </FormGroup>
        );
    }
});

module.exports = Gender;
