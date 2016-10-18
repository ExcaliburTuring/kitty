/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Image } from 'react-bootstrap';
import { List, Button, Popup, Checkbox, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';
const CheckboxItem = Checkbox.CheckboxItem;

var SelectEmergency = React.createClass({

    onEmergencySelectorClick: function() {
        var self = this;
        var onEmergencyChange = function(emergency) {
            Popup.hide();
            self.props.onEmergencyChange(emergency);
        };
        Popup.show(
            <EmergencySelector 
                travellers={this.props.travellers}
                selectTravellers={this.props.selectTravellers}
                emergency={this.props.emergency}
                onEmergencyChange={onEmergencyChange}/>, 
            { animationType: 'slide-up' }
        );
    },

    render: function() {
        var emergencyList = [], emergencies = this.props.emergency;
        for(var mobile in emergencies) {
            if (mobile != 'size') {
                emergencyList.push(
                    <List.Item key={mobile}>{emergencies[mobile].name}-{mobile}</List.Item>
                );
            }
        }
        return (
            <div className="emergency-container">
                <h3>紧急联系人</h3>
                <div className="emergency-selector">
                    <Button size="small" onClick={this.onEmergencySelectorClick}> 选择紧急联系人 </Button>
                </div>
                <div className="emergency-show">
                    <List>
                        {emergencyList}
                    </List>
                </div>
                <Button size="small">新建紧急联系人</Button>
            </div>
        );
    }
});

var EmergencySelector = React.createClass({

    onEmergencyChange: function() {
        var fieldsValue = this.props.form.getFieldsValue();
        var emergency = {}, size = 0;

        for(var index in this.props.travellers) {
            var traveller = this.props.travellers[index];
            if (fieldsValue.hasOwnProperty(traveller.mobile) && fieldsValue[traveller.mobile]) {
                emergency[traveller.mobile] = { // 手机作为key，避免同一个手机
                    'name': traveller.name, 
                    'mobile': traveller.mobile
                };
                size ++;
            }
        }
        emergency['size'] = size;
        this.props.onEmergencyChange(emergency);
    },

    render: function() {
        const { getFieldProps } = this.props.form;
        var travellers = this.props.travellers;
        var selectTravellers = this.props.selectTravellers;
        var emergency = this.props.emergency;
        var checkBoxItemList = travellers.map(function(traveller, index) {
            var id = `${traveller.accountid}-${traveller.contactid}`;
            if (selectTravellers.hasOwnProperty(id)) { // 已经选作出行人，不能作为紧急联系人了
                return null;
            }
            return (
                <CheckboxItem key={index}
                    {
                        ...getFieldProps(traveller.mobile, {
                            initialValue: emergency.hasOwnProperty(traveller.mobile),
                            valuePropName: 'checked',
                        })
                    }>
                    {traveller.name}
                </CheckboxItem>
            );
        });
        return (
            <div className="emergency-selector-container">
                <List renderHeader={() => '选择紧急联系人'}>
                    {checkBoxItemList}
                </List>
                <Button onClick={this.onEmergencyChange}>确定</Button>
            </div>
        );
    }
});
EmergencySelector = createForm()(EmergencySelector);

module.exports = SelectEmergency;
