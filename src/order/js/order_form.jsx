/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Grid, Row, Col } from 'react-bootstrap';
import { Modal, Input, Alert, message } from 'antd';

import AccountBasicInfo from 'account_basicinfo';
import { url, priceUtil, couponStatus, accountStatus, defaultValue } from 'config';
import validator from 'validator';
import Rabbit from 'rabbit';
import { NewModal } from 'new';
import Travellers from './travellers';
import Discount from './discount';
import Agreement from './agreement';
import Pay from './pay';
import GroupBrief from './group';

var AccountContacts = Rabbit.create(url.contacts);
var OrderDiscount = Rabbit.create(url.orderDiscount);
var Coupons = Rabbit.create(url.coupons);

var OrderForm = React.createClass({

    mixins: [
        Reflux.connect(AccountContacts.store, 'contactsData'),
        Reflux.listenTo(OrderDiscount.store, 'onPolicyDiscountLoaded'),
        Reflux.listenTo(Coupons.store, 'onCouponLoaded')
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
    onCouponLoaded: function(coupons) {
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
     * 创建订单
     */
    _createOrder: function(success) {
        var travellers = this.state.selectTravellers;
        if (travellers.length == 0) {
            message.error('请选择出行人');
            return false;
        } 
        if (!this.state.isAgreed) {
            message.error('请同意安全协议');
            return false;
        }
        if (this.props.accountInfo.status == accountStatus.WAIT_COMPLETE_INFO) {
            message.error('请先完善个人信息。可先勾选自己，然后点击小铅笔按钮进行编辑。');
            return false;
        }

        var discountData = this._getDiscount();
        if (priceUtil.getPrice(discountData.actualPrice) <= 0) {
            message.error(`出现负数价格太不科学了，请联系走之旅行${defaultValue.hotline}`);
            return false;
        }
        var self = this;
        var selectTravellers = this.state.selectTravellers;
        selectTravellers.forEach(function(selectTraveller) {
            selectTraveller['roommate'] = self.state.roommates[`${selectTraveller.accountid}-${selectTraveller.contactid}`] || null;
        });
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
            'roommate': false // xiezhenzong: 这里还需要完善
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
                    message.error(`订单创建失败，您可以联系${defaultValue.hotline}`);
                } else {
                    message.success('订单创建成功，您可以使用支付宝进行支付');
                    result = true;
                    success();
                }
            },
            'error': function() {
                message.error(`订单创建失败，您可以联系${defaultValue.hotline}`);
            }
        });
        return result;
    },

    /**
     * 获取紧急联系人，多人则分号分隔
     */
    _getEmergency: function() {
        var name = '', mobile = '',emergencyContacts = this.state.emergencyContacts;
        for (var key in emergencyContacts) {
            if (key != 'size' && emergencyContacts.hasOwnProperty(key)) {
                var emergency = emergencyContacts[key];
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
            'name': accountInfo.name,
            'nickname': accountInfo.nickname,
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

    // callback method

    /**
     * 出行人更改
     */
    onNameChange: function(e, traveller) {
        var selectTravellers = this.state.selectTravellers;
        var size = selectTravellers.length;
        var quota = this.props.orderInfoData.travelGroup.maxCount - this.props.orderInfoData.travelGroup.actualCount;
        if (e.target.checked) {
            if (size >= quota) {
                message.warn(`本团最多还可以报${quota}人`);
                return;
            } else if (size >= 5) {
                message.warn('每个订单最多可以报5人');
                return;
            } else {
                selectTravellers.push(traveller);
            }
        } else {
            for (var i = selectTravellers.length - 1; i >= 0; i--) {
                var t = selectTravellers[i];
                if (t.accountid == traveller.accountid && t.contactid == traveller.contactid) {
                    selectTravellers.splice(i, 1);
                    break;
                }
            }
        }
        this.setState({'selectTravellers': selectTravellers});
        OrderDiscount.actions.load({
            'routeid': this.props.orderInfoData.orderInfo.routeid, 
            'groupid': this.props.orderInfoData.orderInfo.groupid,
            'count': selectTravellers.length
        });
    },

    /**
     * 完善个人信息
     */
    onNewAccountEditLinkClick: function() {
        this.setState({'contact': this._createAccountTraveller(), 'title': '完善个人信息'});
        this.refs.newModal.toggleVisiable();
    },

    /**
     * 编辑联系人
     */
    onEditBtnClick: function(contact) {
        this.setState({'contact': contact, 'title': '编辑出行人'});
        this.refs.newModal.toggleVisiable();
    },

    /**
     * 添加联系人
     */
    onNewBtnClick: function() {
        this.setState({'contact': null, 'title': '添加出行人'});
        this.refs.newModal.toggleVisiable();
    },

    onRoommateChange: function(e, selectTraveller) {
        var value = e.target.value;
        var roommates = this.state.roommates;
        roommates[`${selectTraveller.accountid}-${selectTraveller.contactid}`] = value;
        this.setState({"roommates": roommates});
    },

    /**
     * 紧急联系人更改
     */
    onEmergencyNameChange: function(e, traveller) {
        var emergencyContacts = this.state.emergencyContacts;
        if (e.target.checked) {
            if (emergencyContacts.size > 3) {
                message.warn('每个订单最多可以有3个紧急联系人');
                return;
            } else {
                emergencyContacts[traveller.mobile] = { // 手机作为key，避免同一个手机
                    'name': traveller.name, 
                    'mobile': traveller.mobile, 
                    'relationship': '紧急联系人'
                };
                emergencyContacts.size = emergencyContacts.size + 1;
            }
        } else {
            delete emergencyContacts[traveller.mobile];
            emergencyContacts.size = emergencyContacts.size - 1;
        }
        this.setState({'emergencyContacts': emergencyContacts});
    },

    /**
     * 删除紧急联系人
     */
    onEmergencyClose: function(contact) {
        var emergencyContacts = this.state.emergencyContacts;
        delete emergencyContacts[contact.mobile];
        emergencyContacts.size = emergencyContacts.size - 1;
        this.setState({'emergencyContacts': emergencyContacts});
    },

    /**
     * 添加紧急联系人
     */
    onNewEmergencyBtnClick: function() {
        var self = this;
        var modalContent = (
            <div>
                <label>
                    姓名：
                    <Input id="emergency-name-input" placeholder="请输入" />
                </label>
                <label>
                    电话：
                    <Input id="emergency-mobile-input" placeholder="请输入" />
                </label>
            </div>
        );
        Modal.confirm({
            title: '添加紧急联系人',
            okText: '添加',
            content: modalContent,
            onOk: function() {
                var name = $("#emergency-name-input").val();
                var mobile = $("#emergency-mobile-input").val();
                if (name && name.length >= 1 && mobile && mobile.length > 1) {
                    var ret = validator.mobile(mobile, '手机号输入有误');
                    if (ret.state != 'success') {
                        message.error('输入的手机号有误，请重新添加!');
                        return;
                    }
                    var emergencyContacts = self.state.emergencyContacts;
                    emergencyContacts[mobile] = { // 手机作为key，避免同一个手机
                        'name': name, 
                        'mobile': mobile, 
                        'relationship': '紧急联系人'
                    };
                    emergencyContacts.size = emergencyContacts.size + 1;
                    self.setState({'emergencyContacts': emergencyContacts});

                }
            },
            onCancel: function() {}
        });
    },

    /**
     * 优惠策略更改
     */
    onPolicyDiscountChange: function(eventKey) {
        if (eventKey !== this.state.policyDiscount.discountid) { // 和当前的不一样
            var policy = null;
            if (eventKey === -1 || this.state.discountData.policy.length == 0) {
                policy = {'value': '￥0'};
            } else {
                policy = this._findPolicyDiscount(eventKey, this.state.discountData.policy);
            }
            this.setState({
                'policyDiscount': {
                    'discountid': eventKey,
                    'value': policy.value
                }
            });
        }
    },

    /**
     * 优惠码输入框正在输入
     */
    onCouponChange: function(eventKey) {
        if (eventKey !== this.state.coupon.couponid) {
            var coupon = {'value': '¥0', 'name': ''};
            if (eventKey !== -1 || this.state.coupons.count != 0) {
                for(var index in this.state.coupons.coupons) {
                    var c = this.state.coupons.coupons[index];
                    if (eventKey === c.couponid) {
                        coupon = c;
                    }
                }
            }
            this.setState({
                'coupon': {
                    'couponid': eventKey,
                    'name': coupon.name,
                    'value': coupon.value
                }
            });
        }
    },

    /**
     * 学生优惠人数更改
     */
    onStudentDiscountChange: function(e) {
        var count = e ? +e : 0;
        if (count == this.state.studentDiscount.count) {
            return;
        }
        var discountPrice = count * priceUtil.getPrice(this.state.discountData.studentDiscount.value);
        this.setState({
            'studentDiscount': {
                'discountid': this.state.discountData.studentDiscount.discountid,
                'count': count,
                'value': priceUtil.getPriceStr(discountPrice)
            }
        });
    },

    /**
     * 同意合同
     */
    onAgreementCheck: function(e) {
        this.setState({'isAgreed': e.target.checked});
    },

    /**
     * 保存订单
     */
    onCreateOrderSubmit: function() {
        this._createOrder(function() {
            setTimeout('location.reload(true);', 500);
        });
    },

    /**
     * 保存并支付订单
     */
    onOrderPaySubmit: function() {
        return this._createOrder(function() {});
    },

     /**
     * 修改信息成功
     */
    onHandleOk: function(isAccount) {
        if (isAccount) {
            message.success("成功更新您的信息");
            AccountBasicInfo.actions.load();
        } else {
            message.success("成功更新常用出行人");
            AccountContacts.actions.load();
        }
        this.setState({'contact': null, 'title': ''});
    },

    /**
     * 删除联系人
     */
    onHandleDelete: function() {
        var contact = this.state.contact;
        var selectTravellers = this.state.selectTravellers;
        var hasChange = false;
        for (var i = selectTravellers.length - 1; i >= 0; i--) {
            var t = selectTravellers[i];
            if (t.accountid == contact.accountid && t.contactid == contact.contactid) {
                selectTravellers.splice(i, 1);
                hasChange = true;
                break;
            }
        }
        if (hasChange) {
            this.setState({'contact': null, 'title': '', 'selectTravellers': selectTravellers});
            message.success("成功更新常用出行人");
            OrderDiscount.actions.load({
                'routeid': this.props.orderInfoData.orderInfo.routeid, 
                'groupid': this.props.orderInfoData.orderInfo.groupid,
                'count': selectTravellers.length
            });
        }
        AccountContacts.actions.load();
    },

    // component specs

    getInitialState: function() {
        AccountContacts.actions.load();
        OrderDiscount.actions.load({
            'routeid': this.props.orderInfoData.orderInfo.routeid, 
            'groupid': this.props.orderInfoData.orderInfo.groupid,
            'count': 1
        });
        Coupons.actions.load({'usable': true});
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
            'coupons': {
                'coupons': []
            },

            // 临时变量
            'selectTravellers': [this._createAccountTraveller()],
            'roommates': {},
            'emergencyContacts': {
                'size' : 0
            },
            'policyDiscount': {
                'discountid': -1,
                'value':'￥0'
            },
            'coupon': {
                'couponid': -1,
                'value': '￥0',
                'name': ''
            },
            'studentDiscount': {
                'discountid': -1,
                'count': 0,
                'value': '￥0'
            },
            'isAgreed': false,
            'contact': null,
            'title': ''
        };
    },

    componentWillReceiveProps: function(newProps) {
        var accountTraveller = this._createAccountTraveller();
        var selectTravellers = this.state.selectTravellers;
        var dump = [];
        for (var i = 0, n = selectTravellers.length; i < n; i++) {
            var t = selectTravellers[i];
            if (t.accountid == accountTraveller.accountid 
                && t.contactid == accountTraveller.contactid) {
                dump[i] = accountTraveller;
            } else {
                dump[i] = t;
            }
        }
        this.setState({'selectTravellers': selectTravellers});
    },

    render: function() {
        var orderInfoData = this.props.orderInfoData;
        var orderInfo = orderInfoData.orderInfo;
        var travelGroup = orderInfoData.travelGroup;
        var selectTravellers = this.state.selectTravellers;
        // 董事长说不要这个，那就不要咯。
        // if (selectTravellers.length == 0) { // 实际上也会更改state里的数组，只是不会通知页面更改
        //     selectTravellers.push(this._createAccountTraveller());
        // }
        var count = selectTravellers.length;
        var price = priceUtil.getOrderPrice(orderInfoData.travelGroup, {length: count});
        var discountPrice = priceUtil.getOrderDiscountPrice(this.state.policyDiscount, 
            this.state.coupon, this.state.studentDiscount);
        var actualPrice = priceUtil.getOrderActualPrice(price, discountPrice);
        return (
            <Grid>
                <Row>
                    <Col sm={9} md={9}>
                        <div className="order-content-container order-form-container">
                            {
                                this.props.accountInfo.status == accountStatus.WAIT_COMPLETE_INFO
                                ? <Alert message="新用户提醒信息" type="info" closable
                                    description={
                                        <div>您还是新用户，强烈建议您
                                            <a onClick={this.onNewAccountEditLinkClick}>完善个人信息</a>，方便以后下单。
                                        </div>
                                    }/>
                                : null
                            }
                            <Travellers 
                                quota={travelGroup.maxCount - travelGroup.actualCount}
                                travellers={this._createTravellers()}
                                selectTravellers={this.state.selectTravellers}
                                onNameChange={this.onNameChange}
                                onEditBtnClick={this.onEditBtnClick}
                                onNewBtnClick={this.onNewBtnClick}
                                onRoommateChange={this.onRoommateChange}
                                emergencyContacts={this.state.emergencyContacts}
                                onEmergencyNameChange={this.onEmergencyNameChange}
                                onEmergencyClose={this.onEmergencyClose}
                                onNewEmergencyBtnClick={this.onNewEmergencyBtnClick}/>
                            <Discount
                                discountData={this.state.discountData}
                                coupons={this.state.coupons}
                                policyDiscount={this.state.policyDiscount}
                                coupon={this.state.coupon}
                                studentDiscount={this.state.studentDiscount}
                                count={count}
                                price={price} 
                                actualPrice={actualPrice}
                                onPolicyDiscountChange={this.onPolicyDiscountChange}
                                onCouponChange={this.onCouponChange}
                                onStudentDiscountChange={this.onStudentDiscountChange}/>
                            <Agreement orderid={orderInfo.orderid} isAgreed={this.state.isAgreed}
                                onAgreementCheck={this.onAgreementCheck} selectTravellers={selectTravellers}
                                count={count} price={price} actualPrice={actualPrice}
                                routeid={orderInfo.routeid}/>
                            <Pay ref="pay" 
                                orderid={orderInfo.orderid}
                                onCreateOrderSubmit={this.onCreateOrderSubmit}
                                onOrderPaySubmit={this.onOrderPaySubmit}/>
                            <NewModal ref="newModal" title={this.state.title} 
                                    isAccount={this.state.contact ? this.state.contact.contactid == 0 : false}
                                    accountid={this.props.accountInfo.accountid} 
                                    contact={this.state.contact}
                                    onHandleOk={this.onHandleOk}
                                    onHandleDelete={this.onHandleDelete}/>
                        </div>
                    </Col>
                    <Col sm={3} md={3}>
                        <GroupBrief 
                            travelRoute={orderInfoData.travelRoute} 
                            travelGroup={orderInfoData.travelGroup}/>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = OrderForm;
