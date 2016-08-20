/**
 * @author xiezhenzong
 */
import React from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;

import validator from 'validator';
import BaseFromItem from 'base_form_item';

import 'antd/lib/index.css';

var Address = React.createClass({

    mixins: [BaseFromItem],

    _validate: function() {
        return validator.address(this.state.value, '地址输入有误');
    },

    render: function() {
        return (
            <FormItem
                className="form-item-container"
                label="地址：" 
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
                        placeholder="请输入您的地址"
                        onChange={this._onChange}/>
                }
            </FormItem>
        );
    }

});

module.exports = Address;
