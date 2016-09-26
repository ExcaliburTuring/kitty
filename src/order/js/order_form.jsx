/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Grid, Row, Col } from 'react-bootstrap';
import { Modal, Input, Alert, message } from 'antd';

import AccountBasicInfo from 'account_basicinfo';
import { url, priceUtil, discountCodeStatus, accountStatus, defaultValue } from 'config';
import validator from 'validator';
import Rabbit from 'rabbit';
import { NewModal } from 'new';
import Travellers from './travellers';
import Discount from './discount';
import Agreement from './agreement';
import Pay from './pay';
import GroupBrief from './group';

import 'antd/lib/index.css';

var AccountContacts = Rabbit.create(url.contacts);
var OrderDiscount = Rabbit.create(url.orderDiscount);
var DiscountCode = Rabbit.create(url.discountCode);

var OrderForm = React.createClass({

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
     * 创建订单
     */
    _createOrder: function(async, success) {
        var travellers = this.state.selectTravellers;
        if (travellers.length == 0) {
            message.error('请选择出行人');
            this.refs.pay.enableBtn();
            return;
        } 
        if (!this.state.isAgreed) {
            message.error('请同意安全协议');
            this.refs.pay.enableBtn();
            return;
        }
        if (this.props.accountInfo.status == accountStatus.WAIT_COMPLETE_INFO) {
            message.error('请先完善个人信息。可先勾选自己，然后点击小铅笔按钮进行编辑。');
            this.refs.pay.enableBtn();
            return;
        }

        var discountData = this._getDiscount();
        if (priceUtil.getPrice(discountData.actualPrice) <= 0) {
            message.error(`出现负数价格太不科学了，请联系海逍遥${defaultValue.hotline}`);
            this.refs.pay.enableBtn();
            return;
        }
        var emergency = this._getEmergency();
        var self = this;
        var request = {
            'orderid': this.props.orderInfoData.orderInfo.orderid,
            'travellers': this.state.selectTravellers,
            'policyDiscountid': discountData.policyDiscountid,
            'discountCode': discountData.discountCode,
            'studentDiscountid': discountData.studentDiscountid,
            'studentCount': discountData.studentCount,
            'actualPrice': discountData.actualPrice,
            'emergencyContact': emergency.name,
            'emergencyMobile': emergency.mobile
        };
        $.ajax({
            'url': url.orderOrder,
            'type': 'post',
            'async': async,
            'data': JSON.stringify(request),
            'dataType': 'json',
            'contentType': 'application/json;charset=UTF-8',
            'success': function(data) {
                if (data.status != 0) {
                    self.refs.step2.enableBtn();
                    message.error(`订单创建失败，您可以联系${defaultValue.hotline}`);
                } else {
                    message.success('订单创建成功，您可以使用支付宝进行支付');
                    success();
                }
            },
            'error': function() {
                self.refs.step2.enableBtn();
                message.error(`订单创建失败，您可以联系${defaultValue.hotline}`);
            }
        });
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
            if (eventKey === -1) {
                policy = {value: '￥0'};
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
     * 优惠码表格里的使用按钮被点击
     */
    onDiscoutCodeTableAddBtnClick: function(code) {
        this.setState({
            'discountCode': {
                'discountCode': code.discountCode,
                'value': code.value
            }
        });
    },

    /**
     * 优惠码输入框正在输入
     */
    onDiscountCodeChange: function(e) {
        var discountCode = e.target.value;
        if (discountCode == this.state.discountCode.code) {
            return;
        }
        this.setState({
            'discountCode': {
                'discountCode': discountCode,
                'value': '￥0' // 输入的时候，设置为0
            }
        });
    },

     /**
     * 优惠码输入事件
     */
    onDiscountCodeInput: function(e) {
        var discountCode = e.target.value;
        if (discountCode == '') {
            return;
        }
        var self = this;
        $.get(url.orderDiscountCode, {'code': discountCode})
        .done(function(data) {
            if (data.status == 0 ){
                self.setState({
                    'discountCode': {
                        'discountCode': discountCode,
                        'value': data.value,
                        'validateStatus': 'success',
                        'msg': '此优惠码可以使用'
                    }
                });
            } else if (data.status == 1100) {
                self.setState({
                    'discountCode': {
                        'discountCode': '',
                        'value': '￥0',
                        'validateStatus': 'error',
                        'msg': data.errors[0].message
                    }
                });
            } else {
                self.setState({
                    'discountCode': {
                        'discountCode': '',
                        'value': '￥0',
                        'validateStatus': 'error',
                        'msg': `优惠码校验失败，请联系${defaultValue.hotline}`
                    }
                });
            }
        })
        .fail(function() {
            self.setState({
                'discountCode': {
                    'discountCode': '',
                    'value': '￥0',
                    'validateStatus': 'error',
                    'msg': `优惠码校验失败，请联系${defaultValue.hotline}`
                }
            });
        });
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
        this._createOrder(true, function() {
            setTimeout('location.reload(true);', 500);
        });
    },

    /**
     * 保存并支付订单
     */
    onOrderPaySubmit: function() {
        this._createOrder(false, function() {});
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
            'emergencyContacts': {
                'size' : 0
            },
            'policyDiscount': {
                'discountid': -1,
                'value':'￥0'
            },
            'discountCode': {
                'discountCode': '',
                'value': '￥0',
                'validateStatus': null,
                'msg': ''
            },
            'studentDiscount': {
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
        var price = priceUtil.getPriceStr(this._getPrice());
        var actualPrice = this._getActualPrice();
        return (
            <Grid>
                <Row>
                    <Col sm={9} md={9}>
                        <div className="order-content-container order-form-container">
                            {
                                this.props.accountInfo.status == accountStatus.WAIT_COMPLETE_INFO
                                ? <Alert message="新用户提醒信息" type="info" closable
                                    description="您还是新用户，强烈建议您完善个人信息，方便以后下单。"/>
                                : null
                            }
                            <Travellers 
                                quota={travelGroup.maxCount - travelGroup.actualCount}
                                travellers={this._createTravellers()}
                                selectTravellers={this.state.selectTravellers}
                                onNameChange={this.onNameChange}
                                onEditBtnClick={this.onEditBtnClick}
                                onNewBtnClick={this.onNewBtnClick}
                                emergencyContacts={this.state.emergencyContacts}
                                onEmergencyNameChange={this.onEmergencyNameChange}
                                onEmergencyClose={this.onEmergencyClose}
                                onNewEmergencyBtnClick={this.onNewEmergencyBtnClick}/>
                            <Discount
                                discountData={this.state.discountData}
                                accountDiscountCodeData={this.state.accountDiscountCodeData}
                                policyDiscount={this.state.policyDiscount}
                                discountCode={this.state.discountCode}
                                studentDiscount={this.state.studentDiscount}
                                count={count}
                                price={price} 
                                actualPrice={actualPrice}
                                onPolicyDiscountChange={this.onPolicyDiscountChange}
                                onDiscountCodeChange={this.onDiscountCodeChange}
                                onDiscountCodeInput={this.onDiscountCodeInput}
                                onDiscoutCodeTableAddBtnClick={this.onDiscoutCodeTableAddBtnClick}
                                onStudentDiscountChange={this.onStudentDiscountChange}/>
                            <Agreement orderid={orderInfo.orderid} isAgreed={this.state.isAgreed}
                                onAgreementCheck={this.onAgreementCheck} selectTravellers={selectTravellers}
                                count={count} price={price} actualPrice={actualPrice}/>
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
