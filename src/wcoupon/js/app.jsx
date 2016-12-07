/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Tabs, WingBlank, WhiteSpace, Button, Toast } from 'antd-mobile';
const TabPane = Tabs.TabPane;

import AccountBasicInfo from 'account_basicinfo';
import Rabbit from 'rabbit';
import { url, couponStatus } from 'config';

var Coupons = Rabbit.create(url.coupons);
var App = React.createClass({

    mixins: [
        Reflux.connect(AccountBasicInfo.store, 'basicInfo'),
        Reflux.connect(Coupons.store, 'coupons')
    ],

    onCouponValidateClick: function() {
        var discountCode = this.refs.discountCodeInput.value;
        if (!discountCode) {
            return;
        }
        var self = this;
        $.get(url.discountCodeValidate, {'code': discountCode})
        .done(function(data) {
            if (data.status == 0 ){
                self.refs.discountCodeInput.value = '';
                Toast.success('优惠码兑换成成功', 1);
                Coupons.actions.load();
            } else if (data.status == 1100) {
                Toast.fail(data.errors[0].message, 1);
            } else {
                Toast.fail(`优惠码校验失败，请联系${defaultValue.hotline}`, 1);
            }
        })
        .fail(function() {
            Toast.fail(`优惠码校验失败，请联系${defaultValue.hotline}`, 1);
        });
    },

    getInitialState: function() {
        AccountBasicInfo.actions.load();
        Coupons.actions.load();
        return {
            'basicInfo': {
                'accountInfo': {
                    'name': '',
                    'avatarUrl': ''
                }
            },
            'coupons': {
                'coupons': []
            },
        };
    },

    render: function() {
        var usableCouponList = [], unusableCouponList = [];
        for(var index in this.state.coupons.coupons) {
            var coupon = this.state.coupons.coupons[index];
            if (couponStatus.isUsable(coupon.status)) {
                usableCouponList.push(<CouponItem key={`${index}`} coupon={coupon}/>);
            } else {
                unusableCouponList.push(<CouponItem key={`${index}`} coupon={coupon}/>)
            }
        }
        if (usableCouponList.length == 0) {
            usableCouponList =  (
                <div className="no-result">
                    <p>暂无任何优惠券</p>
                </div>
            );
        }
        if (unusableCouponList.length == 0) {
            unusableCouponList = (
                <div className="no-result">
                    <p>暂无任何优惠券</p>
                </div>
            );
        }
        return (
            <div>
                <div className="discountcode-validate-container">
                    <input ref="discountCodeInput" type="text" placeholder="请输入优惠码"/>
                    <Button inline size="small" onClick={this.onCouponValidateClick}>点击兑换</Button>
                </div>
                <Tabs defaultActiveKey="usable">
                    <TabPane tab="可用优惠券" key="usable">
                        <div>
                            <WhiteSpace size="lg"/>
                            <WingBlank className="coupons-list">
                                {usableCouponList}
                            </WingBlank>
                        </div>
                    </TabPane>
                    <TabPane tab="不可用优惠券" key="unusable">
                        <div>
                            <WhiteSpace size="lg"/>
                            <WingBlank className="coupons-list">
                                {unusableCouponList}
                            </WingBlank>
                        </div>
                    </TabPane>
                </Tabs>
                <WhiteSpace size="lg"/>
            </div>
        );
    }
});

var CouponItem = React.createClass({

    unusableClass: {
        1: 'timeout',
        2: 'used'
    },

    render: function() {
        var coupon = this.props.coupon;
        var desc = coupon.desc.map(function(d, index) {
            return (<li key={index}>{d}</li>);
        });
        return (
            <div className={`coupon-container ${this.unusableClass[coupon.status]}`}>
                <div className="coupon-body clearfix">
                    <div className="pull-left coupon-price-container">
                        <p>¥
                            <span className="coupon-price">{coupon.value.replace("￥", "")}</span>
                        </p>
                    </div>
                    <div className="pull-left coupon-rule-container">
                        <p className="coupon-name">{coupon.name}</p>
                        <ul className="coupon-rule">
                            <li>只限当前帐号下单使用</li>
                            {desc}
                            <li>{`${coupon.startTime}  ~  ${coupon.endTime}`}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = App;
