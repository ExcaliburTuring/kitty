/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { List, Button, Popup, Checkbox, InputItem, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
const CheckboxItem = Checkbox.CheckboxItem;

var SelectEmergency = React.createClass({

    onEmergencySelectorClick: function() {
        var self = this;
        var onEmergencyChange = function(emergency) {
            Popup.hide();
            self.props.onEmergencyChange(emergency);
        };
        var onNewEmergencyBtnClick = function() {
            Popup.hide();
            self.props.onNewEmergencyBtnClick();
        };
        Popup.show(
            <EmergencySelector
                travellers={this.props.travellers}
                selectTravellers={this.props.selectTravellers}
                emergency={this.props.emergency}
                newEmergency={this.props.newEmergency}
                onEmergencyChange={onEmergencyChange}
                onNewEmergencyBtnClick={onNewEmergencyBtnClick}/>, 
            { animationType: 'slide-up' }
        );
    },

    render: function() {
        var emergencyList = [], emergencies = this.props.emergency;
        for(var mobile in emergencies) {
            emergencyList.push(
                <List.Item key={mobile}
                    extra={mobile}>{emergencies[mobile].name}
                </List.Item>
            );
        }
        return (
            <div className="emergency-container">
                {
                    emergencyList.length
                    ? <div className="emergency-show">
                        <List>
                            {emergencyList}
                        </List>
                    </div>
                    : null
                }
                <div className="emergency-selector-trigger">
                    <Button className="am-button-fix" 
                        onClick={this.onEmergencySelectorClick}><Icon type="plus-circle-o"/>选择紧急联系人</Button>
                </div>
            </div>
        );
    }
});

var EmergencySelector = React.createClass({

    onEmergencyChange: function() {
        var fieldsValue = this.props.form.getFieldsValue(), newEmergency = this.props.newEmergency, emergency = {};
        for(var index in this.props.travellers) {
            var traveller = this.props.travellers[index];
            if (fieldsValue.hasOwnProperty(traveller.mobile) && fieldsValue[traveller.mobile]) {
                emergency[traveller.mobile] = { // 手机作为key，避免同一个手机
                    'name': traveller.name, 
                    'mobile': traveller.mobile
                };
            }
        }
        for(var mobile in newEmergency) {
            if (newEmergency.hasOwnProperty(mobile) && fieldsValue[mobile]) {
                emergency[mobile] = { // 手机作为key，避免同一个手机
                    'name': newEmergency[mobile].name, 
                    'mobile': mobile
                };
            }
        }
        this.props.onEmergencyChange(emergency);
    },

    render: function() {
        const { getFieldProps } = this.props.form;
        var travellers = this.props.travellers;
        var selectTravellers = this.props.selectTravellers;
        var emergency = this.props.emergency;
        var newEmergency = this.props.newEmergency;
        var checkBoxItemList = [];
        for(var id in travellers) {
            var traveller = travellers[id], isSelect = false;
            for (var i = 0, n = selectTravellers.length; i < n; i++) {
                if (id == selectTravellers[i]) { // 已经选作出行人，不能作为紧急联系人了
                    isSelect = true;
                    break;
                }
            }
            if (isSelect || !traveller.emergency) {
                continue;
            }
            checkBoxItemList.push(
                <CheckboxItem key={id}
                    {
                        ...getFieldProps(traveller.mobile, {
                            initialValue: emergency.hasOwnProperty(traveller.mobile),
                            valuePropName: 'checked',
                        })
                    }>
                    {traveller.name}
                </CheckboxItem>
            );
        }
        var index = 0;
        for(var mobile in newEmergency) { // 新建的紧急联系人
            if (newEmergency.hasOwnProperty(mobile)) {
                checkBoxItemList.push(
                    <CheckboxItem key={`new-emergency-${index++}`}
                        {
                            ...getFieldProps(mobile, {
                                initialValue: emergency.hasOwnProperty(mobile),
                                valuePropName: 'checked',
                            })
                        }>
                        {newEmergency[mobile].name}
                    </CheckboxItem>
                );
            }
        }
        return (
            <div className="emergency-selector-container">
                <List renderHeader={() => '选择紧急联系人'}>
                    {checkBoxItemList}
                    <List.Item arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/zotStpFiYpNtZNl.png"
                        onClick={this.props.onNewEmergencyBtnClick}>
                        新建紧急联系人
                    </List.Item>
                </List>
                <Button className="am-button-fix" 
                    onClick={this.onEmergencyChange}>确定</Button>
            </div>
        );
    }
});
EmergencySelector = createForm()(EmergencySelector);

module.exports = SelectEmergency;
