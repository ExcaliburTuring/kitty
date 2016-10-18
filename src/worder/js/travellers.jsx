/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Image } from 'react-bootstrap';
import { List, Button, Popup, Checkbox, Icon } from 'antd-mobile';
import { createForm } from 'rc-form';
const CheckboxItem = Checkbox.CheckboxItem;

import { url, gender, priceUtil }  from 'config';
import Rabbit from 'rabbit';

var SelectTraveller = React.createClass({

    onTraverllerSelectorClick: function() {
        var self = this;
        var onSelectTravellersChange = function(selectTravellers) {
            Popup.hide();
            self.props.onSelectTravellersChange(selectTravellers);
        };
        Popup.show(
            <TravellerSelector 
                travellers={this.props.travellers}
                selectTravellers={this.props.selectTravellers}
                onSelectTravellersChange={onSelectTravellersChange}/>, 
            { animationType: 'slide-up' }
        );
    },

    render: function() {
        var self = this;
        var travellerList = this.props.selectTravellers.map(function(traveller, index) {
            return (
                <Traveller traveller={traveller} key={index} 
                    onTravellerEditBtnClick={self.props.onTravellerEditBtnClick}/>
            );
        });
        return (
            <div className="travellers-container">
                <h3>出行人</h3>
                <div className="traveller-selector">
                    <Button size="small" onClick={this.onTraverllerSelectorClick}> 选择出行人 </Button>
                </div>
                <div className="traveller-show">
                    {travellerList}
                </div>
                <div className="new-contact">
                    <Button size="small" onClick={this.props.onNewContactBtnClick}>新建联系人</Button>
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
                selectTravellers.push(traveller);
            }
        }
        this.props.onSelectTravellersChange(selectTravellers);
    },

    render: function() {
        const { getFieldProps } = this.props.form;
        var travellers = this.props.travellers;
        var selectTravellers = this.props.selectTravellers;
        var checkBoxItemList = travellers.map(function(traveller, index) {
            var id = `${traveller.accountid}-${traveller.contactid}`, checked = false;
            for (var i = 0, n = selectTravellers.length; i < n; i++) {
                var selectTraveller = selectTravellers[i];
                checked |= (id == `${selectTraveller.accountid}-${selectTraveller.contactid}`);
            }
            return (
                <CheckboxItem key={index}
                    {
                        ...getFieldProps(id, {
                            initialValue: checked,
                            valuePropName: 'checked',
                        })
                    }>
                    {traveller.name}
                </CheckboxItem>
            );
        });
        return (
            <div className="travellers-selector-container">
                <List renderHeader={() => '选择出行人'}>
                    {checkBoxItemList}
                </List>
                <Button onClick={this.onTraverllerSelectorConfirmClick}>确定</Button>
            </div>
        );
    }
});
TravellerSelector = createForm()(TravellerSelector);

var Traveller = React.createClass({

    render: function () {
        var traveller = this.props.traveller;
        var isAccount = traveller.contactid == 0;
        var isMale = traveller.gender == gender.MALE;
        var avatarUrl = traveller.avatarUrl ? traveller.avatarUrl 
                            : isMale 
                                ? 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=850188828,2295753763&fm=58'
                                : 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=481252135,1456887421&fm=58';
        return (
            <div className="traveller-container">
                <div className="traveller-body clearfix">
                     <div className="traveller-avatar pull-left">
                        <Image alt="头像" responsive src={avatarUrl}/>
                    </div>
                    <div className="traveller-detail pull-left">
                        <div className="clearfix">
                            <p className="pull-left">{`${traveller.name}`}</p>
                            <p className="pull-right">{`${traveller.mobile}`}</p>
                        </div>
                        <div className="clearfix">
                            <p className="pull-left">{`${traveller.id}`}</p>
                            <p className="pull-right">{`${traveller.birthday}`}</p>
                        </div>
                        <p>{`${traveller.email}`}</p>
                    </div>
                </div>
                <div className="traveller-edit-container clearfix">
                    <div className="pull-right">
                        <Button inline size="small" onClick={()=>{this.props.onTravellerEditBtnClick(traveller)}}>
                            <Icon type="edit"/>编辑
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SelectTraveller;
