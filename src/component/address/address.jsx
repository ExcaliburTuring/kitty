/**
 * @author xiezhenzong
 */
import React from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;

import validator from 'validator';

import 'antd/lib/index.css';
import './address.less';

var Address = React.createClass({

    validate: function() {
        var ret = validator.address(this.state.address, '地址输入有误');
        this.setState({
            'validationState': ret['state'],
            'msg': ret['msg']
        });
        return ret['state'];
    },

    getAddress: function() {
        return this.state.address;
    },

    isChange: function() {
        return this.state.address !== this.props.defaultAddress;
    },

    onChange: function(e) {
        var value = e.target.value;
        if (this.state.address === value) {
            return;
        }
        var ret = validator.address(value, '地址输入有误');
        this.setState({
            'address': e.target.value,
            'validationState': ret['state'],
            'msg': ret['msg']
        });
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
            'address': this.props.defaultAddress,
            'validationState': null,
            'msg': ''
        }
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.address != prevState.address) { // 有时候state 不能立即更新，所以这里要这commponenetDidupdate
            this.props.onChange(this.state.address);
        }  
    },

    render: function() {
        return (
            <FormItem
                className="address-input-container"
                label="地址：" 
                required={this.props.required}
                validateStatus={this.state.validationState}
                help={this.state.msg}
                hasFeedback
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}>
                {
                    this.props.readOnly
                    ? <p>{this.state.address}</p>
                    : <Input
                        value={this.state.address}
                        defaultValue={this.props.defaultAddress}
                        placeholder="请输入您的地址"
                        onChange={this.onChange}/>
                }
            </FormItem>
        );
    }

});

module.exports = Address;

