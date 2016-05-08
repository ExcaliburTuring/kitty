/**
 * @author xiezhenzong
 */
import React from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;

import validator from 'validator';

import 'antd/lib/index.css';
import './name.less';

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
        });
    },

    revert: function() {
        this.setState(this.getInitialState());
    },

    getInitialState: function() {
        return {
            'name': this.props.defaultName,
            'validationState': null,
            'msg': '',
        }
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.name != prevState.name) {
            this.props.onChange(this.state.name);
        }  
    },

    render: function() {
        return (
            <FormItem
                className="name-input-container"
                label="姓名：" 
                required={this.props.required}
                validateStatus={this.state.validationState}
                help={this.state.msg}
                hasFeedback
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}>
                {
                    this.props.readOnly
                    ? <p>{this.state.name}</p>
                    : <Input
                        value={this.state.name}
                        defaultValue={this.props.defaultName}
                        placeholder="请输入您的姓名"
                        onChange={this.onChange}/>
                }
            </FormItem>
        );
    }

});

module.exports = Name;
