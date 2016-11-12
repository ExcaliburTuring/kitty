/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { List, Button, Popup, Checkbox, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
const CheckboxItem = Checkbox.CheckboxItem;

import { url, gender, priceUtil }  from 'config';
import Rabbit from 'rabbit';
import Traveller from './traveller';

var SelectTraveller = React.createClass({

    onTraverllerSelectorClick: function() {
        var self = this;
        var onSelectTravellersChange = function(selectTravellers) {
            Popup.hide();
            self.props.onSelectTravellersChange(selectTravellers);
        };
        var onNewContactBtnClick = function() {
            Popup.hide();
            self.props.onNewContactBtnClick();
        }
        Popup.show(
            <TravellerSelector 
                travellers={this.props.travellers}
                selectTravellers={this.props.selectTravellers}
                onSelectTravellersChange={onSelectTravellersChange}
                onNewContactBtnClick={onNewContactBtnClick}/>, 
            { animationType: 'slide-up' }
        );
    },

    render: function() {
        var self = this, travellers = this.props.travellers;
        var travellerList = this.props.selectTravellers.map(function(id, index) {
            return (
                <Traveller traveller={travellers[id]} key={index} 
                    onTravellerEditBtnClick={self.props.onTravellerEditBtnClick}
                    onTravellerDeleteBtnClick={self.props.onTravellerDeleteBtnClick}/>
            );
        });
        return (
            <div className="travellers-container">
                {
                    travellerList.length
                    ? <div className="traveller-show">
                        {travellerList}
                    </div>
                    : null
                }
                <div className="traveller-selector-trigger">
                    <Button className="am-button-fix" 
                        onClick={this.onTraverllerSelectorClick}>
                        <Icon type="plus-circle-o" />选择出行人
                    </Button>
                </div> 
            </div>
        );
    }
});

var TravellerSelector = React.createClass({

    onTraverllerSelectorConfirmClick: function() {
        var filedsValue = this.props.form.getFieldsValue();
        var selectTravellers = [];
        for(var index in this.props.travellers) {
            var traveller = this.props.travellers[index];
            var id = `${traveller.accountid}-${traveller.contactid}`;
            if (filedsValue.hasOwnProperty(id) && filedsValue[id]) {
                selectTravellers.push(id);
            }
        }
        this.props.onSelectTravellersChange(selectTravellers);
    },

    render: function() {
        const { getFieldProps } = this.props.form;
        var travellers = this.props.travellers;
        var selectTravellers = this.props.selectTravellers;
        var checkBoxItemList = [];
        for(var id in travellers) {
            var checked = false;
            for (var i = 0, n = selectTravellers.length; i < n; i++) {
                checked |= (id == selectTravellers[i]);
            }
            checkBoxItemList.push(
                <CheckboxItem key={id}
                    {
                        ...getFieldProps(id, {
                            initialValue: checked,
                            valuePropName: 'checked',
                        })
                    }>
                    {travellers[id].name}
                </CheckboxItem>
            );
        }
        return (
            <div className="travellers-selector-container">
                <List renderHeader={() => '选择出行人'}>
                    {checkBoxItemList}
                    <List.Item arrow="horizontal"
                        thumb="https://zos.alipayobjects.com/rmsportal/zotStpFiYpNtZNl.png"
                        onClick={this.props.onNewContactBtnClick}>
                        新建出行人
                    </List.Item>
                </List>
                <Button className="am-button-fix" 
                    onClick={this.onTraverllerSelectorConfirmClick}>确定</Button>
            </div>
        );
    }
});
TravellerSelector = createForm()(TravellerSelector);

module.exports = SelectTraveller;
