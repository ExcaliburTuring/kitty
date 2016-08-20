/**
 * @author xiezhenzong
 */
import React from 'react';
import { Form, DatePicker } from 'antd';
const FormItem = Form.Item;

import validator from 'validator';
import BaseFromItem from 'base_form_item';

import 'antd/lib/index.css';

var Birthday = React.createClass({

    mixins: [BaseFromItem],

    _validate: function() {
        return validator.birthday(this.state.value, '输入的日期有误');
    },

    render: function() {
        return (
            <FormItem
                className="form-item-container"
                label="生日："
                required={this.props.required}
                validateStatus={this.state.validationState}
                help={this.state.msg}
                hasFeedback
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 17 }}>
                {
                    this.props.readOnly
                    ? <p>{this.state.value == null ? '未知' : this.state.value}</p>
                    : <DatePicker
                        value={this.state.value}
                        defaultValue={this.props.defaultValue}
                        onChange={this._onChange}/>
                }
            </FormItem>
        );
    }
});

module.exports = Birthday;
