/**
 * @author xiezhenzong
 */
import React from 'react';
import { Form, Radio } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

import { gender } from 'config';
import BaseFromItem from 'base_form_item';

import 'antd/lib/index.css';
import './gender.less';

const UNKNOW_DESC = gender.getDesc(gender.UNKNOW);
const MALE_DESC = gender.getDesc(gender.MALE);
const FEMALE_DESC = gender.getDesc(gender.FEMALE);

var Gender = React.createClass({

    mixins: [BaseFromItem],

    _validate: function() {
        return {
            'state': 'success'
        };
    },

    render: function() {
        return (
            <FormItem
                className="gender-select-container"
                label="性别："
                required={this.props.required}
                labelCol={{ span: 5 }}
                wrapperCol={{ span: 17 }}>
                {
                    this.props.readOnly
                    ? <p>{gender.getDesc(this.state.value ? this.state.value : gender.UNKNOW)}</p>
                    : <RadioGroup
                        value={this.state.value}
                        defaultValue={this.props.defaultValue}
                        onChange={this._onChange}>
                        <Radio value={gender.UNKNOW}>{UNKNOW_DESC}</Radio>
                        <Radio value={gender.MALE}>{MALE_DESC}</Radio>
                        <Radio value={gender.FEMALE}>{FEMALE_DESC}</Radio>
                    </RadioGroup>
                }
            </FormItem>
        );
    }
});

module.exports = Gender;
