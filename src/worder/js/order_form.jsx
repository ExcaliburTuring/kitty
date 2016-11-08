/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Toast } from 'antd-mobile';

import { url, priceUtil, discountCodeStatus, defaultValue, accountStatus }  from 'config';
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
        var travellers = {}, contacts = this.state.contactsData.contacts;
        var accountTraveller = this._createAccountTraveller();
        travellers[`${accountTraveller.accountid}-0`] = accountTraveller;

        if (contacts.length != 0) {
            for (var i = contacts.length - 1; i >= 0; i--) {
                var contact = contacts[i];
                travellers[`${contact.accountid}-${contact.contactid}`] = contact;
            }
        }
        return travellers;
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
            'mobile': accountInfo.mobile,
            'area': accountInfo.area,
            'address': accountInfo.address
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
     * 删除一个出行人
     */
    _deleteOneTraveller: function(traveller) {
        var id = `${traveller.accountid}-${traveller.contactid}`;
        var selectTravellers = [];
        for (var index in this.state.selectTravellers) {
            if (id != this.state.selectTravellers[index]) {
                selectTravellers.push(this.state.selectTravellers[index]);
            }
        }
        this.setState({'contact': null, 'selectTravellers': selectTravellers});
        OrderDiscount.actions.load({
            'routeid': this.props.orderInfoData.orderInfo.routeid, 
            'groupid': this.props.orderInfoData.orderInfo.groupid,
            'count': selectTravellers.length
        });
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

    /**
     * 获取紧急联系人，多人则分号分隔
     */
    _getEmergency: function() {
        var name = '', mobile = '',emergencies = this.state.emergency;
        for (var key in emergencies) {
            if (key != 'size' && emergencies.hasOwnProperty(key)) {
                var emergency = emergencies[key];
                name = name + emergency.name + ';';
                mobile = mobile + emergency.mobile + ';';
            }
        }
        if (name.length > 1) {
            name = name.substring(0, name.length - 1);
        } else {
            return {};
        }
        if (mobile.length > 1) {
            mobile = mobile.substring(0, mobile.length - 1);
        } else {
            return {};
        }
        return {'name': name, 'mobile': mobile};
    },

    /**
     * 获取优惠
     */
    _getDiscount: function() {
        var studentDiscount = this.state.discountData.studentDiscount; 
        return {
            'actualPrice': this._getActualPrice(),
            'policyDiscountid': this.state.policyDiscount.discountid,
            'discountCode': this.state.discountCode.discountCode,
            'studentDiscountid': studentDiscount != null ? studentDiscount.discountid : null,
            'studentCount': this.state.studentDiscount.count
        };
    },

    /**
     * 获取原始价格
     */
    _getPrice: function() {
        var travelGroup = this.props.orderInfoData.travelGroup;
        var count = this.state.selectTravellers.length; 
        return priceUtil.getPrice(travelGroup.price) * count;
    },

    /**
     * 获取优惠后的实际价格
     */
    _getActualPrice: function() {
        return priceUtil.getPriceStr(
                    this._getPrice()
                    - priceUtil.getPrice(this.state.policyDiscount.value)
                    - priceUtil.getPrice(this.state.discountCode.value)
                    - priceUtil.getPrice(this.state.studentDiscount.value)
                );
    },

    /**
     * 获取roommates
     */
    _getRoommates: function() {
        return this.refs.roommate.getFieldsValue();
    },

    /**
     * 创建出出行人列表
     */
    _getSelectTravellers: function(roommates, isFollow) {
        var travellers = this._createTravellers();
        var selected = [], selectTravellers = this.state.selectTravellers;
        for (var i = selectTravellers.length - 1; i >= 0; i--) {
            var id = selectTravellers[i];
            var traveller = travellers[id];
            if (!isFollow && roommates.hasOwnProperty(id)) {
                traveller['roommate'] = roommates[id];
            } else {
                traveller['roommate'] = null;
            }
            selected.push(traveller);
        }
        return selected;
    },

    /**
     * 创建订单
     */
    _createOrder: function(success) {
        var travellers = this.state.selectTravellers;
        if (travellers.length == 0) {
            Toast.fail('请选择出行人', 1);
            return false;
        } 
        if (!this.refs.agreement.getFieldsValue().agreement) {
            Toast.fail('请同意安全协议', 1);
            return false;
        }
        if (this.props.accountInfo.status == accountStatus.WAIT_COMPLETE_INFO) {
            Toast.fail('请先完善个人信息。', 1);
            return false;
        }

        var discountData = this._getDiscount();
        if (priceUtil.getPrice(discountData.actualPrice) <= 0) {
            Toast.fail(`出现负数价格太不科学了，请联系海逍遥${defaultValue.hotline}`, 1);
            return;
        }
        var self = this;
        var roommates = this._getRoommates();
        var isFollow = roommates['isFollow'] || false;
        var selectTravellers = this._getSelectTravellers(roommates, isFollow);
        var emergency = this._getEmergency(); 
        var request = {
            'orderid': this.props.orderInfoData.orderInfo.orderid,
            'travellers': selectTravellers,
            'policyDiscountid': discountData.policyDiscountid,
            'discountCode': discountData.discountCode,
            'studentDiscountid': discountData.studentDiscountid,
            'studentCount': discountData.studentCount,
            'actualPrice': discountData.actualPrice,
            'emergencyContact': emergency.name,
            'emergencyMobile': emergency.mobile,
            'roommate': isFollow
        };
        var result = false;
        $.ajax({
            'url': url.orderOrder,
            'type': 'post',
            'async': false,
            'data': JSON.stringify(request),
            'dataType': 'json',
            'contentType': 'application/json;charset=UTF-8',
            'success': function(data) {
                if (data.status != 0) {
                    Toast.fail(`订单创建失败，您可以联系${defaultValue.hotline}`);
                } else {
                    result = true;
                    success();
                }
            },
            'error': function() {
                Toast.fail(`订单创建失败，您可以联系${defaultValue.hotline}`);
            }
        });
        return result;
    },

    // callback method

    /**
     * 新建联系人
     */
    onNewContactBtnClick: function() {
        this.setState({'contact': {}});
    },

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
     * 删除出行人
     */
    onTravellerDeleteBtnClick: function(traveller) {
        this._deleteOneTraveller(traveller);
    },

    /**
     * 出行人编辑成功
     */
    onTravellerEditSaveSuccessful: function() {
        var contact = this.state.contact;
        if (contact.accountid && contact.contactid == 0) {
            this.props.onAccountInfoChange();
        } else {
            AccountContacts.actions.load();
        }
        this.setState({'contact': null});
    },

    /**
     * 出行人删除成功
     */
    onDeleteSuccessful: function() {
        var contact = this.state.contact;
        this._deleteOneTraveller(contact);
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
        return this._createOrder(function() {
            setTimeout('location.reload(true);', 500);
        });
    },

    /**
     * 支付订单
     */
    onPayOrderClick: function() {
        return this._createOrder(function() {});
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
            'selectTravellers': [`${this.props.accountInfo.accountid}-0`], // 选中出行人的id
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
                    onDeleteSuccessful={this.onDeleteSuccessful}
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
                <div className="item-title">出行人</div>
                <SelectTraveller travellers={travellers}
                    selectTravellers={selectTravellers}
                    onNewContactBtnClick={this.onNewContactBtnClick}
                    onSelectTravellersChange={this.onSelectTravellersChange}
                    onTravellerEditBtnClick={this.onTravellerEditBtnClick}
                    onTravellerDeleteBtnClick={this.onTravellerDeleteBtnClick}/>
                <div className="item-title">睡友选择</div>
                <Roommate ref="roommate"
                    travellers={travellers} 
                    selectTravellers={selectTravellers}/>
                <div className="item-title">紧急联系人</div>
                <SelectEmergency travellers={travellers}
                    selectTravellers={selectTravellers}
                    emergency={this.state.emergency}
                    onEmergencyChange={this.onEmergencyChange}/>
                <div className="item-title">优惠政策</div>
                <Discount count={selectTravellers.length}
                    discountData={this.state.discountData}
                    accountDiscountCodeData={this.state.accountDiscountCodeData}
                    policyDiscount={this.state.policyDiscount}
                    discountCode={this.state.discountCode}
                    studentDiscount={this.state.studentDiscount}
                    onPolicyDiscountChange={this.onPolicyDiscountChange}
                    onDiscountCodeChange={this.onDiscountCodeChange}
                    onStudentDiscountChange={this.onStudentDiscountChange}/>
                <Agreement ref="agreement"/>
                <Footer ref="footer"
                    orderid={orderInfoData.orderInfo.orderid}
                    actualPrice={this._getActualPrice()}
                    onSaveOrderClick={this.onSaveOrderClick}
                    onPayOrderClick={this.onPayOrderClick}/>
            </div>
        );
    }

});

module.exports = OrderForm;
