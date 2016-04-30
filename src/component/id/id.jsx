/**
 * @author xiezhenzong
 */
import React from 'react';
import { FormGroup, InputGroup, FormControl, HelpBlock,  DropdownButton, MenuItem } from 'react-bootstrap';

import { defaultValue, idType } from 'config';
import validator from 'validator';

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
        if (this.state.idType != idType.IDENTIFICATION) {
            return null;
        }
        return '1991-06-18';
    },

    getInitialState: function() {
        var idType = this.props.idType ? this.props.idType : idType.IDENTIFICATION;
        return {
            'idType': idType,
            'id': this.props.id,

            'controlId': this.props.controlId,
            'readOnly': this.props.readOnly ? true : false,
            'validationState': null,
            'errMsg': '',
            'placeholder': '请输入证件号',

            'onChange': this.props.onChange,
        }
    },

    onIdTypeSelect: function(eventKey, e) {
        if (eventKey === this.state.idType) { // 和当前的一样
            return;
        } else if (eventKey === this.props.idType) { // 和之前传进来的一样
            this.setState({
                'idType': this.props.idType,
                'id': this.props.id,
                'validationState': null,
                'errMsg': ''
            });
        } else {
            this.setState({
                'idType': eventKey,
                'id': '',
                'validationState': 'error',
                'errMsg': ''
            });
            this.state.onChange(idType, id, e);
        }
    },

    onIdChange: function(e) {
        var value = e.target.value;
        if (value === this.state.id) {
            return;
        }
        var ret = validator.id(value);
        this.setState({
            'id': value,
            'validationState': ret['state'],
            'errMsg': ret['msg']
        });
    },

    render: function() {
        return (
            <div className="id-container">
               <FormGroup
                    controlId={this.state.controlId}
                    validationState={this.state.validationState}>
                    <InputGroup>
                        <DropdownButton
                            componentClass={InputGroup.Button}
                            id="input-dropdown-addon"
                            title={idType.getDesc(this.state.idType)}
                            readOnly={this.state.readOnly}
                            onSelect={this.onIdTypeSelect}>
                            <MenuItem eventKey={idType.IDENTIFICATION}>{IDENTIFICATION_DESC}</MenuItem>
                            <MenuItem eventKey={idType.PASSPORT}>{PASSPORT_DESC}</MenuItem>
                            <MenuItem eventKey={idType.H_PASSER}>{H_PASSER_DESC}</MenuItem>
                            <MenuItem eventKey={idType.T_PASSER}>{T_PASSER_DESC}</MenuItem>
                        </DropdownButton>
                        <FormControl
                            type="input" 
                            value={this.state.id}
                            placeholder={this.state.placeholder}
                            onChange={this.onIdChange}
                            readOnly={this.state.readOnly}/>
                        <FormControl.Feedback />
                        <HelpBlock>{this.state.errMsg}</HelpBlock>
                    </InputGroup>
                </FormGroup>
            </div>
        );
    }
});

module.exports = Id;
