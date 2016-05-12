/**
 * @author xiezhenzong
 */
import React from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;

import validator from 'validator';

import 'antd/lib/index.css';
import './mobile.less'

var Mobile = React.createClass({

    validate: function() {
        var ret = validator.mobile(this.state.mobile, '手机号输入有误');
        this.setState({
            'validationState': ret['state'],
            'msg': ret['msg']
        });
        return ret['state'];
    },

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
        var ret = validator.mobile(value, '手机号输入有误');
        this.setState({
            'mobile': e.target.value,
            'validationState': ret['state'],
            'msg': ret['msg']
        })
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

    getInitialState: function() {
        return {
            'mobile': this.props.defaultMobile,
            'validationState': null,
            'msg': '',
        }
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.mobile != prevState.mobile) { // 有时候state 不能立即更新，所以这里要这commponenetDidupdate
            this.props.onChange(this.state.mobile);
        }  
    },

    render: function() {
        return (
            <FormItem
                className="mobile-input-container"
                label="手机：" 
                required={this.props.required}
                validateStatus={this.state.validationState}
                help={this.state.msg}
                hasFeedback
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}>
                {
                    this.props.readOnly
                    ? <p>{this.state.mobile}</p>
                    : <Input
                        value={this.state.mobile}
                        defaultValue={this.props.defaultMobile}
                        placeholder="请输入您的手机"
                        onChange={this.onChange}/>
                }
            </FormItem>
        );
    }

});

module.exports = Mobile;

