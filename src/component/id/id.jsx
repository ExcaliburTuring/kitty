/**
 * @author xiezhenzong
 */
import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock,  InputGroup, DropdownButton, MenuItem, Col } from 'react-bootstrap';

import { idType, gender } from 'config';
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
        this.setState({
            'idType':  this.props.defaultIdType,
            'id': this.props.defaultId.toUpperCase(),
            'birthday': null,
            'gender': null,

            'readOnly': this.props.readOnly ? true : false,
            'validationState': null,
            'errMsg': '',
        });
    }, 

    getInitialState: function() {
        return {
            'idType':  this.props.defaultIdType,
            'id': this.props.defaultId.toUpperCase(),
            'birthday': null,
            'gender': null,

            'readOnly': this.props.readOnly ? true : false,
            'validationState': null,
            'errMsg': '',
            'placeholder': '请输入证件号',
        }
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.id != prevState.id
            || this.state.idType != prevState.idType) { // 有时候state 不能立即更新，所以这里要这commponenetDidupdate
            this.props.onChange(this.state.id, this.state.idType);
        }  
    },

    render: function() {
        var idTypeContainer;
        var idContainer;
        if (this.props.readOnly) {
            idTypeContainer = (
                <Col componentClass={ControlLabel} md={2}>
                    {idType.getDesc(this.state.idType)}
                </Col>
            );
            idContainer = (<Col md={3}> <p>{this.state.id}</p> </Col>);
        } else {
            idTypeContainer = (
                <Col md={2}>
                    <div  className="idtype-selector">
                        <DropdownButton
                            componentClass={InputGroup.Button}
                            id="input-dropdown-addon"
                            title={idType.getDesc(this.state.idType)}
                            onSelect={this.onIdTypeSelect}>
                            <MenuItem eventKey={idType.IDENTIFICATION}>{IDENTIFICATION_DESC}</MenuItem>
                            <MenuItem eventKey={idType.PASSPORT}>{PASSPORT_DESC}</MenuItem>
                            <MenuItem eventKey={idType.H_PASSER}>{H_PASSER_DESC}</MenuItem>
                            <MenuItem eventKey={idType.T_PASSER}>{T_PASSER_DESC}</MenuItem>
                        </DropdownButton>
                    </div>
                </Col>
            );
            idContainer = (
                <Col md={3}>
                    <FormControl
                        type="input" 
                        value={this.state.id}
                        placeholder={this.state.placeholder}
                        onChange={this.onIdChange}/>
                    <FormControl.Feedback />
                </Col>
            );
        }


        return (
           <FormGroup
                controlId={this.props.controlId}
                validationState={this.state.validationState}>
                    {idTypeContainer}
                    {idContainer}
                    <Col smHidden xsHidden md={2}>
                        <HelpBlock>{this.state.errMsg}</HelpBlock>
                    </Col>
            </FormGroup>
        );
    }
});

module.exports = Id;
