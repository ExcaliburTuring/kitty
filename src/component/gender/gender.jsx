/**
 * @author xiezhenzong
 */
import React from 'react';
import { Form, Radio } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import { gender } from 'config';
import validator from 'validator';

import 'antd/lib/index.css';
import './gender.less';

const UNKNOW_DESC = gender.getDesc(gender.UNKNOW);
const MALE_DESC = gender.getDesc(gender.MALE);
const FEMALE_DESC = gender.getDesc(gender.FEMALE);

var Gender = React.createClass({

    validate: function() {
        return 'success';
    },

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

    onChange: function(e) {
        if (this.props.readOnly) {
            return;
        }
        this.setState({
            'gender': e.target.value,
        });
    },

    cleanValidate: function() {
        this.setState({
            'validationState': null,
            'msg': ''
        });
    },

    revert: function() {
        return this.setState(this.getInitialState());
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
            <FormItem
                className="gender-select-container"
                label="性别："
                required={this.props.required}
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}>
                <RadioGroup
                    value={this.state.gender}
                    defaultValue={this.props.defaultGender}
                    disabled={this.props.readOnly}
                    onChange={this.onChange}>
                    <Radio value={gender.UNKNOW}>{UNKNOW_DESC}</Radio>
                    <Radio value={gender.MALE}>{MALE_DESC}</Radio>
                    <Radio value={gender.FEMALE}>{FEMALE_DESC}</Radio>
                </RadioGroup>
            </FormItem>
        );
    }
});

module.exports = Gender;
