/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Toast, List, InputItem, Button } from 'antd-mobile';
import { createForm } from 'rc-form';

import { url, priceUtil, couponStatus, defaultValue, accountStatus }  from 'config';
import Rabbit from 'rabbit';
import WContact from 'wcontact';
import validator from 'validator';

import GroupInfo from './group';
import SelectTraveller from './travellers';
import Roommate from './roommate';
import SelectEmergency from './emergency';
import Discount from './discount';
import Agreement from './agreement';
import Footer from './footer';

var AccountContacts = Rabbit.create(url.contacts);
var OrderDiscount = Rabbit.create(url.orderDiscount);
var Coupons = Rabbit.create(url.coupons);

var  OrderForm = React.createClass({

    mixins: [
        Reflux.connect(AccountContacts.store, 'contactsData'),
        Reflux.listenTo(OrderDiscount.store, 'onPolicyDiscountLoaded'),
        Reflux.listenTo(Coupons.store, 'onCouponsLoaded')
    ],

     // reflux callback

    /**
     * 优惠策略加载完成
     * 人数发生变化时，需要重新请求优惠策略
     */
    onPolicyDiscountLoaded: function(discount) {
        if (discount != null) {
            var maxValuePolicy = null, maxValue = -1;
            for (var index in discount.policy) {
                var policy = discount.policy[index];
                var price = priceUtil.getPrice(policy.value);
                if (maxValue < price) {
                    maxValue = price;
                    maxValuePolicy = policy;
                }
            }
            if (maxValuePolicy != null) {
                this.setState({
                    'discountData': discount,
                    'policyDiscount': maxValuePolicy
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
    onCouponsLoaded: function(coupons) {
        if (coupons.status == 0 && coupons.coupons.length > 0) {
            var maxValueCoupon = null, maxValue = -1, result = [], now = new Date().getTime();
            for (var index in coupons.coupons) {
                var coupon = coupons.coupons[index];
                if (couponStatus.isUsable(coupon.status) 
                    && Date.parse(coupon.startTime) <= now 
                    && now <= Date.parse(coupon.endTime)) {
                    result.push(coupon);
                    var price = priceUtil.getPrice(coupon.value);
                    if (maxValue < price) {
                        maxValue = price;
                        maxValueCoupon = coupon;
                    }
                }
            }
            if (maxValueCoupon == null) {
                this.setState({'coupons': {'coupons': result}});
            } else {
                this.setState({
                    'coupons': {'coupons': result},
                    'coupon': maxValueCoupon
                });
            }
        } else {
            this.setState({'coupons': coupons});
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
            'status': accountInfo.status,
            'name': accountInfo.name,
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
     * 获取紧急联系人，多人则分号分隔
     */
    _getEmergency: function() {
        var name = '', mobile = '',emergencies = this.state.emergency;
        for (var key in emergencies) {
            if (emergencies.hasOwnProperty(key)) {
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
        var policyDiscount = this.state.policyDiscount;
        var coupon = this.state.coupon;
        var studentDiscount = this.state.studentDiscount;
        var price = priceUtil.getOrderPrice(this.props.orderInfoData.travelGroup, this.state.selectTravellers);
        var discountPrice = priceUtil.getOrderDiscountPrice(policyDiscount, coupon, studentDiscount);
        var actualPrice = priceUtil.getOrderActualPrice(price, discountPrice);
        return {
            'actualPrice': actualPrice,
            'policyDiscountid': policyDiscount.discountid,
            'couponid': coupon.couponid,
            'studentDiscountid': studentDiscount.discountid,
            'studentCount': studentDiscount.count
        };
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
            Toast.fail(`出现负数价格太不科学了，请联系走之旅行${defaultValue.hotline}`, 1);
            return;
        }
        var self = this;
        var roommates = this._getRoommates();
        var isFollow = roommates['isFollow'];
        var selectTravellers = this._getSelectTravellers(roommates, isFollow);
        var emergency = this._getEmergency();
        var request = {
            'orderid': this.props.orderInfoData.orderInfo.orderid,
            'travellers': selectTravellers,
            'policyDiscountid': discountData.policyDiscountid,
            'couponid': discountData.couponid,
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
     * 新建紧急联系人
     */
    onNewEmergencyBtnClick: function() {
        this.setState({'newEmergencyContainer': true});
    },

    /**
     * 成功添加紧急联系人
     */
    onNewEmergencySaveBtnClick: function(newEmergency) {
        var emergency = this.state.emergency, tmp = this.state.newEmergency;
        if (!emergency.hasOwnProperty(newEmergency.mobile)) {
            emergency[newEmergency.mobile] = newEmergency;
            if (!tmp.hasOwnProperty(newEmergency.mobile)) { // 新添加的紧急联系人和之前的手机号一样，就不加进去
                tmp[newEmergency.mobile] = newEmergency;
            }
            this.setState({
                'emergency': emergency, 
                'newEmergencyContainer': false,
                'newEmergency': tmp
            });
        }
    },

    /**
     * 取消添加紧急联系人
     */
    onNewEmergencyCancelBtnClick: function() {
        this.setState({'newEmergencyContainer': false});
    },

    /**
     * 优惠政策修改
     */
    onPolicyDiscountChange: function(policyDiscount) {
        this.setState({'policyDiscount': policyDiscount});
    },

    /**
     * 优惠券修改
     */
    onCouponChange: function(coupon) {
        this.setState({'coupon': coupon});
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
            'count': 1 // 初识会默认选中用户
        });
        Coupons.actions.load({'usable': true});
        return {
            // 请求得到
            'contactsData': {
                'contacts': []
            },
            'discountData': {
                'policy': [],
                'studentDiscount': {}
            },
            'coupons': {
                'coupons': []
            },

            // 临时变量
            'selectTravellers': [`${this.props.accountInfo.accountid}-0`], // 选中出行人的id
            'emergency': {},
            'policyDiscount': {
                'discountid': -1,
                'name': '',
                'value':'￥0'
            },
            'coupon': {
                'couponid': '',
                'value': '￥0',
                'msg': ''
            },
            'studentDiscount': {
                'discountid': -1,
                'count': 0,
                'value': '￥0'
            },
            'isAgreed': false,

            // 出行人编辑使用
            'contact': null,

            // 新建联系人使用
            'newEmergencyContainer': false,
            'newEmergency': {}
        };
    },

    render: function () {
        if (this.props.accountInfo.status == accountStatus.WAIT_COMPLETE_INFO) { // 完善个人信息
            return (
                <WContact contact={this._createAccountTraveller()}
                    onSaveSuccessful={this.props.onAccountInfoChange}
                    onCancleBtnClick={()=>{history.back()}}/>
            );
        }
        if (this.state.contact) { // 出行人编辑
            return (
                <WContact contact={this.state.contact}
                    onSaveSuccessful={this.onTravellerEditSaveSuccessful}
                    onDeleteSuccessful={this.onDeleteSuccessful}
                    onCancleBtnClick={()=>{this.setState({'contact': null})}}/>
            );
        }
        if (this.state.newEmergencyContainer) {
            return (<NewEmergency onNewEmergencySaveBtnClick={this.onNewEmergencySaveBtnClick}
                        onNewEmergencyCancelBtnClick={this.onNewEmergencyCancelBtnClick}/>);
        }
        var orderInfoData = this.props.orderInfoData;
        var travellers = this._createTravellers();
        var selectTravellers = this.state.selectTravellers;
        var price = priceUtil.getOrderPrice(orderInfoData.travelGroup, selectTravellers);
        var discountPrice = priceUtil.getOrderDiscountPrice(this.state.policyDiscount, 
            this.state.coupon, this.state.studentDiscount);
        var actualPrice = priceUtil.getOrderActualPrice(price, discountPrice);
        return (
            <div className="order-form-container">
                <GroupInfo travelRoute={orderInfoData.travelRoute}
                    travelGroup={orderInfoData.travelGroup}/>
                <div className="item-title">出行人</div>
                <SelectTraveller accountInfo={this.props.accountInfo}
                    travellers={travellers}
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
                    newEmergency={this.state.newEmergency}
                    onEmergencyChange={this.onEmergencyChange}
                    onNewEmergencyBtnClick={this.onNewEmergencyBtnClick}/>
                <div className="item-title">优惠政策</div>
                <Discount count={selectTravellers.length}
                    discountData={this.state.discountData}
                    coupons={this.state.coupons}
                    policyDiscount={this.state.policyDiscount}
                    coupon={this.state.coupon}
                    studentDiscount={this.state.studentDiscount}
                    discountPrice={discountPrice}
                    onPolicyDiscountChange={this.onPolicyDiscountChange}
                    onCouponChange={this.onCouponChange}
                    onStudentDiscountChange={this.onStudentDiscountChange}/>
                <Agreement ref="agreement"
                    orderid={orderInfoData.orderInfo.orderid}
                    travellers={travellers}
                    selectTravellers={selectTravellers}
                    price={price}
                    actualPrice={actualPrice}
                    routeid={orderInfoData.orderInfo.routeid}/>
                <Footer ref="footer"
                    orderid={orderInfoData.orderInfo.orderid}
                    actualPrice={actualPrice}
                    orderInfo={orderInfoData.orderInfo}
                    onSaveOrderClick={this.onSaveOrderClick}
                    onPayOrderClick={this.onPayOrderClick}/>
            </div>
        );
    }

});

var NewEmergency = React.createClass({

    onNewEmergencySaveBtnClick: function() {
        const { getFieldProps, validateFields } = this.props.form;
        var ret = true;
        validateFields(function(error, value) {
            if (error) {
                Toast.fail('信息未完全正确', 1);
                ret = false;
            }
        });
        if (!ret) {
            return;
        }
        var name = getFieldProps('name').value;
        var mobile = getFieldProps('mobile').value.replace(/ /g, '');
        this.props.onNewEmergencySaveBtnClick({'name': name, 'mobile': mobile});
    },

    render: function() {
        const { getFieldProps } = this.props.form;
        return (
            <div className="new-emergency-container">
                <List>
                    <InputItem
                        autoFocus clear
                        {
                            ...getFieldProps('name', {
                                rules: [{
                                    'required': true
                                }]
                            })
                        }
                        placeholder="请输入姓名"
                      >姓名</InputItem>
                    <InputItem
                        clear type="phone"
                        {
                            ...getFieldProps('mobile', {
                                rules: [{
                                    'required': true,
                                    'pattern': validator._mobileRe,
                                    'transform': function(value) {
                                        return value ? value.replace(/ /g, '') : value;
                                    }
                                }],
                            })
                        }
                        placeholder="电话作为紧急联系人的标识"
                      >电话</InputItem>
                </List>
                <div className="new-emergency-btn">
                    <Button className="save-btn" onClick={this.onNewEmergencySaveBtnClick}>保存</Button>
                    <Button onClick={this.props.onNewEmergencyCancelBtnClick}>取消</Button>
                </div>
            </div>
        );
    }
});
NewEmergency =  createForm()(NewEmergency);

module.exports = OrderForm;
