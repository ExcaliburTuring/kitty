/**
 * @author xiezhenzong
 */
import React from 'react';
import { Form, Checkbox } from 'antd';
const FormItem = Form.Item;

import BaseFromItem from 'base_form_item';

import 'antd/lib/index.css';
import './emergency.less';

var Emergency = React.createClass({

    mixins: [BaseFromItem],

    _validate: function(value) {
        return {
            'state': 'success'
        };
    },

    render: function() {
        return (
            <FormItem
                className="form-item-container emergency-item-container"
                required={this.props.required}
                wrapperCol={{ span: 17, offset: 5 }}>
                <label>
                    <Checkbox checked={this.state.value} defaultChecked={this.props.defaultValue} 
                        onChange={(e)=>{this._onChange({'target': {'value': e.target.checked}})}}
                        disabled={this.props.readOnly}/>
                    <span className="emergency-label">设置为紧急联系人</span>
                </label>
            </FormItem>
        );
    }
});

module.exports = Emergency;
