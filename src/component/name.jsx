/**
 * @author xiezhenzong
 */
import React from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;

import validator from 'validator';
import BaseFromItem from 'base_form_item';

import 'antd/lib/index.css';

var Name = React.createClass({

    mixins: [BaseFromItem],

    _validate: function(value) {
        return validator.name(value, '您输入的姓名有误');
    },

    render: function() {
        return (
            <FormItem
                className="form-item-container"
                label="姓名：" 
                required={this.props.required}
                validateStatus={this.state.validationState}
                help={this.state.msg}
                hasFeedback
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 17 }}>
                {
                    this.props.readOnly
                    ? <p>{this.state.value}</p>
                    : <Input
                        value={this.state.value}
                        defaultValue={this.props.defaultValue}
                        placeholder="请输入您的姓名"
                        onChange={this._onChange}/>
                }
            </FormItem>
        );
    }

});

module.exports = Name;
