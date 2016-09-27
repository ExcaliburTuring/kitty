/**
 * @author xiezhenzong 
 */
import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Checkbox, Icon, Button, Input } from 'antd';

import Contact from 'contact';
import Title from 'title';

import 'antd/lib/index.css';

var Travellers = React.createClass({

    // helper method

    _createSelectTravellers: function() {
        var travellers = this.props.selectTravellers;
        var selectTravellers = {};
        for (var i = travellers.length - 1; i >= 0; i--) {
            var traveller = travellers[i];
            selectTravellers[`${traveller.accountid}-${traveller.contactid}`] = traveller;  
        }
        return selectTravellers;
    },

    _createNameList: function(travellers, selectTravellers) {
        var self = this, nameList = [];
        for (var i = 0, n = travellers.length; i < n; i++) {
            var traveller = travellers[i];
            var checked = selectTravellers.hasOwnProperty(`${traveller.accountid}-${traveller.contactid}`);
            nameList.push(
                <Name 
                    key={`travellers-name-list-${i}`} 
                    traveller={traveller}
                    name={traveller.name == null ? '您自己' : traveller.name} 
                    onChange={self.props.onNameChange}
                    checked={checked}/>
            );
        }
        return nameList;
    },

    _createContactsList: function(travellers, selectTravellers) {
        var self = this, contactsList = [];
        for (var i = 0, n = travellers.length; i < n; i++) {
            var traveller = travellers[i];
            var checked = selectTravellers.hasOwnProperty(`${traveller.accountid}-${traveller.contactid}`);
            if (checked) {
                contactsList.push(
                    <Col key={`select-travellers-list-${i}`} md={4}>
                        <Contact contact={traveller} onEditBtnClick={self.props.onEditBtnClick}/>
                    </Col>
                );
            }
        }
        return contactsList;
    },

    _createRoommateList: function() {
        var self = this;
        return this.props.selectTravellers.map(function(selectTraveller, index) {
            return (
                <div className="order-roommate-item" key={`order-roommate-${index}`}>
                    <p className="order-roommate-label ellipsis">{`${selectTraveller.name}:`}</p>
                    <Input className="order-roommate-input" placeholder="请输入" 
                        onChange={(e)=>{self.props.onRoommateChange(e, selectTraveller)}}/>
                </div>
            );
        });
    },

    _createEmergencyNameList: function(travellers, selectTravellers) {
        var self = this, nameList = [], emergencyContacts = this.props.emergencyContacts;
        for (var i = 0, n = travellers.length; i < n; i++) {
            var traveller = travellers[i];
            if (traveller.emergency // 这个联系人是紧急联系人，并且没有选择去旅游
                && !selectTravellers.hasOwnProperty(`${traveller.accountid}-${traveller.contactid}`)) {
                nameList.push(
                    <Name 
                        key={`travellers-name-list-${i}`} 
                        traveller={traveller}
                        name={traveller.name == null ? '您自己' : traveller.name} 
                        onChange={self.props.onEmergencyNameChange}
                        checked={emergencyContacts.hasOwnProperty(traveller.mobile)}/>
                );
            }
        }
        return nameList;
    },

    _createEmergencyContactList: function() {
        var self = this, contactsList = [], emergencyContacts = this.props.emergencyContacts;
        for (var key in emergencyContacts) {
            if (key != 'size' && emergencyContacts.hasOwnProperty(key)) {
                var emergencyContact = emergencyContacts[key];
                contactsList.push(
                    <Col key={`select-travellers-list-${key}`} md={4}>
                        <Contact contact={emergencyContact} 
                            readOnly needCard={false} closable
                            onClose={this.props.onEmergencyClose}/>
                    </Col>
                );
            }
        }
        return contactsList;
    },

    // component specs

    render: function() {
        var travellers = this.props.travellers;
        var selectTravellers = this._createSelectTravellers();
        // 出行人选择
        var nameList = this._createNameList(travellers, selectTravellers);
        var contactsList = this._createContactsList(travellers, selectTravellers);
        // 睡友
        var roommateList = this._createRoommateList();
        // 紧急联系人选择
        var emergencyNameList = this._createEmergencyNameList(travellers, selectTravellers);
        var emergencyContactList = this._createEmergencyContactList();
        return (
            <div className="order-contact-container clearfix">
                <Title title="出行人" className="order-content-title">
                    <p className="order-contact-tip">
                        本团还可报
                        <span className="order-group-quota">{this.props.quota}</span>
                        人
                    </p>
                    <p></p>
                </Title>
                <div className="order-traveller-select-container">
                    <span>请选择:</span>
                    {nameList}
                    <Button type="ghost" size="small" onClick={this.props.onNewBtnClick}>
                        <Icon type="plus"/>添加
                    </Button>
                </div>
                <div className="order-traveller-show">
                    <Row>
                        {contactsList}
                    </Row>
                </div>
                 <div className="order-roommate-contianer">
                    <span>睡友设置:</span>
                </div>
                <div className="order-roommate-show">
                    {roommateList}
                </div>
                <div className="order-emergency-contianer">
                    <span >紧急联系人:</span>
                    {emergencyNameList}
                    <Button type="ghost" size="small" onClick={this.props.onNewEmergencyBtnClick}>
                        <Icon type="plus"/>添加
                    </Button>
                </div>
                <div className="order-emergency-show">
                    <Row>
                        {emergencyContactList}
                    </Row>
                </div>
            </div>
        );
    }
});

var Name = React.createClass({

    render: function() {
        return (
            <label>
                <Checkbox
                    className="order-contact-name"
                    checked={this.props.checked}
                    defaultChecked={false}
                    disabled={false}
                    onChange={(e)=>{this.props.onChange(e, this.props.traveller);}}/>
                {this.props.name} 
            </label>
        );
    }

});

module.exports = Travellers;
