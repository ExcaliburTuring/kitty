/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { List, Button, Popup, Checkbox, InputItem, WingBlank } from 'antd-mobile';
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
                    <List.Item key={mobile}
                        extra={mobile}>{emergencies[mobile].name}
                    </List.Item>
                );
            }
        }
        return (
            <div className="emergency-container">
                <WingBlank>
                    <h3>紧急联系人</h3>
                    <div className="emergency-show">
                        {
                            emergencyList.length == 0
                            ? null
                            : <List>
                                {emergencyList}
                            </List>
                        }
                    </div>
                    <div className="emergency-selector-trigger">
                        <Button className="am-button-fix" 
                            onClick={this.onEmergencySelectorClick}>选择紧急联系人</Button>
                    </div>
                </WingBlank>
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
        var checkBoxItemList = [];
        for(var id in travellers) {
            var traveller = travellers[id], isSelect = false;
            for (var i = 0, n = selectTravellers.length; i < n; i++) {
                if (id == selectTravellers[i]) { // 已经选作出行人，不能作为紧急联系人了
                    isSelect = true;
                    break;
                }
            }
            if (isSelect) {
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
        return (
            <div className="emergency-selector-container">
                <List renderHeader={() => '选择紧急联系人'}>
                    {checkBoxItemList}
                </List>
                <Button className="am-button-fix" 
                    onClick={this.onEmergencyChange}>确定</Button>
            </div>
        );
    }
});
EmergencySelector = createForm()(EmergencySelector);

module.exports = SelectEmergency;
