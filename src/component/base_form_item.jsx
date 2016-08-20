/**
 * @author xiezhenzong
 */
import React from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;

import 'antd/lib/index.css';
import './base_form_item.less';

var BaseFromItem = {

    // api method

    getValue: function() {
        return this.state.value;
    },

    setValue: function(value) {
        this.setState({'value': value});
    },

    isChange: function() {
        return this.state.value !== this.props.defaultValue;
    },

    validate: function() {
        var ret = this._validate(this.state.value);
        this.setState({
            'validationState': ret['state'],
            'msg': ret['msg']
        });
        return ret['state'];
    },

    cleanValidate: function() {
        this.setState({
            'validationState': null,
            'msg': ''
        });
    },

    revert: function() {
        this.setState(this.getInitialState());
    },

    // inner use

    // mixin需要实现这个方法
    //_validate: function() {},

    _onChange: function(e) {
        var value = e.target.value;
        if (this.state.value === value) {
            return;
        }
        var ret = this._validate(value);
        this.setState({
            'value': value,
            'validationState': ret['state'],
            'msg': ret['msg']
        });
    },

    _createInitalState: function(defaultValue) {
        return {
            'value': defaultValue,
            'validationState': null,
            'msg': '',
        };
    },

    // component specs

    getInitialState: function() {
        return this._createInitalState(this.props.defaultValue);
    },

    componentWillReceiveProps: function(newProps) {
        if (newProps.defaultValue != this.props.defaultValue) {
            this.setState(this._createInitalState(newProps.defaultValue));
        }
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.value != prevState.value) { // 有时候state不能立即更新，所以这里要这屌用onChange
            this.props.onChange(this.state.value);
        }
    }

};

module.exports = BaseFromItem;
