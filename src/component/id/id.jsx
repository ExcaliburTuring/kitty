/**
 * @author xiezhenzong
 */
import React from 'react';
import { Form, Input, Select } from 'antd';
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

import { idType, gender } from 'config';
import validator from 'validator';

import 'antd/lib/index.css';
import './id.less';

const IDENTIFICATION_DESC = idType.getDesc(idType.IDENTIFICATION);
const PASSPORT_DESC = idType.getDesc(idType.PASSPORT);
const H_PASSER_DESC = idType.getDesc(idType.H_PASSER);
const T_PASSER_DESC = idType.getDesc(idType.T_PASSER);

var Id = React.createClass({

    getIdType: function() {
        return this.state.idType;
    },

    getId: function() {
        return this.state.id;
    },

    getBirthday: function() {
        return this.state.idType == idType.IDENTIFICATION ? this.state.birthday : null;
    },

    getGender: function() {
        return this.state.idType == idType.IDENTIFICATION ? this.state.gender : null;
    },

    isChange: function() {
        return this.state.idType !== this.props.defaultIdType
                    || this.state.id !== this.props.defaultId.toUpperCase();
    },

    onIdTypeSelect: function(eventKey, e) {
        if (eventKey === this.state.idType) { // 和当前的一样
            return;
        } else if (eventKey === this.props.defaultIdType) { // 和之前传进来的一样
            this.setState({
                'idType': this.props.defaultIdType,
                'id': this.props.defaultId,
                'validationState': null,
                'msg': ''
            });
        } else {
            this.setState({
                'idType': eventKey,
                'id': '',
                'validationState': 'error',
                'msg': ''
            });
        }
    },

    onIdChange: function(e) {
        var value = e.target.value;
        if (value === this.state.id) {
            return;
        }
        var ret;
        if (this.state.idType == idType.IDENTIFICATION) {
            ret = validator.id(value);
        } else {
            ret = validator.hasText(value);
        }
        var newState = {
            'id': value.toUpperCase(),
            'validationState': ret['state'],
            'errMsg': ret['msg']
        };
        if (ret['info']) {
            newState['birthday'] = ret['info']['birth'];
            newState['gender'] = ret['info']['sex'] == 0 ? gender.FEMALE : gender.MALE;
        }
        this.setState(newState);
    },

    revert: function() {
        this.setState(this.getInitialState());
    }, 

    getInitialState: function() {
        return {
            'idType':  this.props.defaultIdType,
            'id': this.props.defaultId.toUpperCase(),
            'birthday': null,
            'gender': null,

            'readOnly': this.props.readOnly ? true : false,
            'validationState': null,
            'msg': '',
        }
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.id != prevState.id
            || this.state.idType != prevState.idType) { // 有时候state 不能立即更新，所以这里要这commponenetDidupdate
            this.props.onChange(this.state.id, this.state.idType);
        }  
    },

    render: function() {
        var select = (
            <Select 
                value={this.state.idType}
                disabled={this.props.readOnly}
                defaultValue={this.props.defaultIdType} 
                onChange={this.onIdTypeSelect}>
                <Option value={idType.IDENTIFICATION}>{IDENTIFICATION_DESC}</Option>
                <Option value={idType.PASSPORT}>{PASSPORT_DESC}</Option>
                <Option value={idType.H_PASSER}>{H_PASSER_DESC}</Option>
                <Option value={idType.T_PASSER}>{T_PASSER_DESC}</Option>
            </Select>
        );
        return (
            <FormItem
                className="id-select-container"
                label="证件："
                required={this.props.required}
                validateStatus={this.state.validationState}
                help={this.state.msg}
                hasFeedback
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}>
                <Input
                    value={this.state.id}
                    defaultValue={this.props.defaultId}
                    disabled={this.props.readOnly}
                    placeholder="请输入您的身份证号"
                    onChange={this.onIdChange}
                    addonBefore={select}/>
            </FormItem> 

        );
    }
});

module.exports = Id;
