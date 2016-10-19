/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Image } from 'react-bootstrap';
import { List, Button, Popup, Checkbox, Icon, InputItem, ActionSheet } from 'antd-mobile';
import { createForm } from 'rc-form';
const CheckboxItem = Checkbox.CheckboxItem;
const AgreeItem = Checkbox.AgreeItem;

import { url, gender, priceUtil, discountCodeStatus }  from 'config';
import Rabbit from 'rabbit';
import WContact from 'wcontact';

import GroupInfo from './group';
import SelectTraveller from './travellers';
import Roommate from './roommate';
import SelectEmergency from './emergency';
import Discount from './discount';
import Agreement from './agreement';
import Footer from './footer';

var AccountContacts = Rabbit.create(url.contacts);
var OrderDiscount = Rabbit.create(url.orderDiscount);
var DiscountCode = Rabbit.create(url.discountCode);

var  OrderForm = React.createClass({

    mixins: [
        Reflux.connect(AccountContacts.store, 'contactsData'),
        Reflux.listenTo(OrderDiscount.store, 'onPolicyDiscountLoaded'),
        Reflux.listenTo(DiscountCode.store, 'onAccountDiscountCodeLoaded')
    ],

     // reflux callback

    /**
     * 优惠策略加载完成
     * 人数发生变化时，需要重新请求优惠策略
     */
    onPolicyDiscountLoaded: function(discount) {
        if (discount != null) {
            var policy = this._findPolicyDiscount(discount.defaultDiscountid, discount.policy);
            if (policy != null) {
                this.setState({
                    'discountData': discount,
                    'policyDiscount': policy
                });
            } else {
                this.setState({
                    'discountData': discount
                });
            }
        }
    },

    /**
     * 账户优惠码列表加载完成
     */
    onAccountDiscountCodeLoaded: function(accountDiscountCodeData) {
        if (accountDiscountCodeData.status == 0 
            && accountDiscountCodeData.discountCodes.length > 0) {
            var maxValueCode = null, maxValue = -1;
            for (var index in accountDiscountCodeData.discountCodes) {
                var discountCode = accountDiscountCodeData.discountCodes[index];
                if (!discountCodeStatus.isUsable(discountCode.status)) {
                    continue;
                }
                var price = priceUtil.getPrice(discountCode.value);
                if (maxValue < price) {
                    maxValue = price;
                    maxValueCode = discountCode;
                }
            }
            this.setState({
                'accountDiscountCodeData': accountDiscountCodeData,
                'discountCode': maxValueCode
            });
        } else {
            this.setState({'accountDiscountCodeData': accountDiscountCodeData});
        }
    },

    // helper method

    /**
     * 创建出行人数组
     */
    _createTravellers: function() {
        var accountTraveller = this._createAccountTraveller();
        var contacts = this._copyArray(this.state.contactsData.contacts);
        if (contacts.length == 0) {
            return [accountTraveller];
        } else {
            contacts.unshift(accountTraveller);
            return contacts;
        }
    },

    /**
     * 创建账户对应的出行人
     */
    _createAccountTraveller: function() {
        var accountInfo = this.props.accountInfo;
        return {
            'accountid': accountInfo.accountid,
            'contactid': 0,
            'name': accountInfo.name || accountInfo.nickname,
            'id': accountInfo.id,
            'idType': accountInfo.idType,
            'gender': accountInfo.gender,
            'birthday': accountInfo.birthday,
            'email': accountInfo.email,
            'mobile': accountInfo.mobile
        };
    },

    /**
     * 复制数组
     */
    _copyArray: function(array) {
        if (!array) {
            return [];
        }
        var copy = [];
        for (var i = 0, n = array.length; i < n; i++) {
            copy.push(array[i]);
        }
        return copy;
    },

    /**
     * 查找优惠
     */
    _findPolicyDiscount: function(discountid, policies) {
        for (var i = policies.length - 1; i >= 0; i--) {
            if (policies[i].discountid == discountid) {
                return policies[i];
            }
        }
        return null;
    },

    // callback method

    /**
     * 出行人改变
     */
    onSelectTravellersChange: function(selectTravellers) {
        this.setState({'selectTravellers': selectTravellers});
        OrderDiscount.actions.load({
            'routeid': this.props.orderInfoData.orderInfo.routeid, 
            'groupid': this.props.orderInfoData.orderInfo.groupid,
            'count': selectTravellers.length
        });
    },

    /**
     * 编辑出行人
     */
    onTravellerEditBtnClick: function(traveller) {
        this.setState({'contact': traveller});
    },

    /**
     * 出行人编辑成功
     */
    onTravellerEditSaveSuccessful: function() {
        this.setState({'contact': null});
        AccountContacts.actions.load();
    },

    /**
     * 紧急联系人修改
     */
    onEmergencyChange: function(emergency) {
        this.setState({'emergency': emergency});
    },

    /**
     * 优惠政策修改
     */
    onPolicyDiscountChange: function(policyDiscount) {
        this.setState({'policyDiscount': policyDiscount});
    },

    /**
     * 优惠码修改
     */
    onDiscountCodeChange: function(discountCode) {
        this.setState({'discountCode': discountCode});
    },

    /**
     * 学生优惠修改
     */
    onStudentDiscountChange: function(studentDiscount) {
        this.setState({'studentDiscount': studentDiscount})
    },

    /**
     * 保存订单
     */
    onSaveOrderClick: function() {

    },

    /**
     * 支付订单
     */
    onPayOrderClick: function() {

    },

    // component specs

    getInitialState: function() {
        AccountContacts.actions.load();
        OrderDiscount.actions.load({
            'routeid': this.props.orderInfoData.orderInfo.routeid, 
            'groupid': this.props.orderInfoData.orderInfo.groupid,
            'count': 0
        });
        DiscountCode.actions.load();
        return {
            // 请求得到
            'contactsData': {
                'contacts': []
            },
            'discountData': {
                'defaultDiscountid': 0,
                'policy': [],
                'studentDiscount': {}
            },
            'accountDiscountCodeData': {
                'discountCodes': []
            },

            // 临时变量
            'selectTravellers': [this._createAccountTraveller()],
            'roommates': {},
            'emergency': {
                'size': 0
            },
            'policyDiscount': {
                'discountid': -1,
                'desc': '',
                'value':'￥0'
            },
            'discountCode': {
                'discountCode': '',
                'value': '￥0',
                'msg': ''
            },
            'studentDiscount': {
                'count': 0,
                'value': '￥0'
            },
            'isAgreed': false,

            // 出行人编辑使用
            'contact': null
        };
    },

    render: function () {
         if (this.state.contact) { // 出行人编辑
            return (
                <WContact contact={this.state.contact}
                    onSaveSuccessful={this.onTravellerEditSaveSuccessful}
                    onCancleBtnClick={()=>{this.setState({'contact': null})}}/>
            );
        } 
        var orderInfoData = this.props.orderInfoData;
        var travellers = this._createTravellers();
        var selectTravellers = this.state.selectTravellers;
        return (
            <div className="order-form-container">
                <GroupInfo travelRoute={orderInfoData.travelRoute}
                    travelGroup={orderInfoData.travelGroup}/>
                <SelectTraveller travellers={travellers}
                    selectTravellers={selectTravellers}
                    onSelectTravellersChange={this.onSelectTravellersChange}
                    onTravellerEditBtnClick={this.onTravellerEditBtnClick}/>
                <Roommate travellers={travellers} 
                    selectTravellers={selectTravellers}/>
                <SelectEmergency travellers={travellers}
                    selectTravellers={selectTravellers}
                    emergency={this.state.emergency}
                    onEmergencyChange={this.onEmergencyChange}/>
                <Discount selectTravellers={selectTravellers}
                    discountData={this.state.discountData}
                    accountDiscountCodeData={this.state.accountDiscountCodeData}
                    policyDiscount={this.state.policyDiscount}
                    discountCode={this.state.discountCode}
                    studentDiscount={this.state.studentDiscount}
                    onPolicyDiscountChange={this.onPolicyDiscountChange}
                    onDiscountCodeChange={this.onDiscountCodeChange}
                    onStudentDiscountChange={this.onStudentDiscountChange}/>
                <Agreement />
                <Footer selectTravellers={selectTravellers}
                    travelGroup={orderInfoData.travelGroup}
                    policyDiscount={this.state.policyDiscount}
                    discountCode={this.state.discountCode}
                    studentDiscount={this.state.studentDiscount}
                    onSaveOrderClick={this.onSaveOrderClick}
                    onPayOrderClick={this.onPayOrderClick}/>
            </div>
        );
    }

});

module.exports = OrderForm;
