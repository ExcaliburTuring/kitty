/**
 * @author xiezhenzong
 */
import React from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;

import validator from 'validator';

import 'antd/lib/index.css';
import './email.less';

var Email = React.createClass({

    validate: function() {
        var ret = validator.email(this.state.email);
        this.setState({
            'validationState': ret['state'],
            'msg': ret['msg']
        });
        return ret['state'];
    },

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
        return (
            <FormItem
                className="email-input-container"
                label="邮箱：" 
                type="email"
                required={this.props.required}
                validateStatus={this.state.validationState}
                help={this.state.msg}
                hasFeedback
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}>
                {
                    this.props.readOnly
                    ? <p>{this.state.email}</p>
                    : <Input
                        value={this.state.email}
                        defaultValue={this.props.defaultEmail}
                        placeholder="请输入您的邮箱"
                        onChange={this.onChange}/>
                }
            </FormItem>
        );
    }

});

module.exports = Email;

