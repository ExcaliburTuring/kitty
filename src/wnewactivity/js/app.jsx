import React from 'react';
import Reflux from 'reflux';
import { Modal } from 'antd-mobile';
const alert = Modal.alert;

import Rabbit from 'rabbit';
import { url, accountStatus, defaultValue } from 'config';
import WContact from 'wcontact';

import Headimg from '../img/activity1.png';

var Coupons = Rabbit.create(url.coupons);

var App = React.createClass({

    mixins: [
        Reflux.listenTo(Coupons.store, 'onCouponsLoaded'),
    ],

    onCouponsLoaded: function(coupons) {
        var self = this;
        this.setState({'coupons': coupons});
        if (this.state.basicInfo.accountInfo.status == accountStatus.WAIT_COMPLETE_INFO
            && coupons.coupons.length && coupons.coupons[0].status == 0 
            && coupons.coupons[0].updateCount == 0) {
            alert('优惠券提示', `${coupons.coupons[0].value}元新人优惠券已经放到您的账户中，完善个人信息可继续升级优惠券！`, [
                {text: '不感兴趣', onPress: () => window.location.href = self.state.origin},
                {text: '查看活动', onPress: () => {}}
            ]);
        }
    },

    /**
     * 创建账户对应的出行人
     */
    _createAccountContact: function() {
        var accountInfo = this.state.basicInfo.accountInfo;
        return {
            'accountid': accountInfo.accountid,
            'contactid': 0,
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

    _getQueryString: function (name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        return r != null ? unescape(r[2]): null; 
    },

    onAccountEditClick: function() {
        this.setState({
            'contact': this._createAccountContact()
        });
    },

    onSaveSuccessful: function() {
        var self = this;
        this.setState({'contact': null});
        alert('升级成功', '新人优惠券已经升级成功了', [
            {text: '继续', onPress: () => window.location.href = self.state.origin},
        ]);
    },

    getInitialState: function() {
        var origin = this._getQueryString('origin');
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
            'contact': null,
            'origin': origin ? origin : '/'
        };
    },

    componentDidMount: function() {
        var self = this;
        $.getJSON(url.basicinfo)
        .done(function(data) {
            if (data.status != 0) {
                message.error(`加载信息失败，您可以联系${defaultValue.hotline}`);
            } else {
                self.setState({'basicInfo': data.accountBasicInfo});
                Coupons.actions.load({'type': 0}); // 获取新人优惠券
            }
        })
        .fail(function(jqxhr, textStatus, error) {
             message.error(`加载信息失败，您可以联系${defaultValue.hotline}`);
        });
    },

    render: function() {
        if (this.state.contact) {
            return (
                <WContact contact={this.state.contact}
                    onSaveSuccessful={this.onSaveSuccessful}
                    onCancleBtnClick={()=>{this.setState({'contact': null})}}/>
            );
        }
        var noNewAccountTip = null, newCouponUsedTip = null, alreadyJoin = null; 
        if (this.state.basicInfo.accountInfo.status != accountStatus.WAIT_COMPLETE_INFO) {
            noNewAccountTip = (<div className="content">您不符合活动范围</div>);
        }
        var coupons = this.state.coupons.coupons;
        if (coupons.length && coupons[0].status != 0) {
            newCouponUsedTip = (<div className="content">您的新人优惠券已经使用</div>);
        }
        if (coupons.length && coupons[0].updateCount != 0) {
            alreadyJoin = (<div className="content">您已经升级了优惠券</div>);
        }
        return (
            <div className="activity">
                <img src={Headimg} className="img-responsive"/>
                <div className="title">新人优惠!</div>
                <div className="second-title">优惠规则：</div>
                <div className="content">1、用户初次登录即送50元新人优惠券；</div>
                <div className="content">2、完善个人资料此优惠券升级为100元！</div>
                <div className="second-title">注意事项：</div>
                <div className="content">此优惠券与多人优惠不可共用；</div>
                {
                    noNewAccountTip || newCouponUsedTip
                    ? <div className="second-title">业务提醒：</div>
                    : null
                }
                {
                    noNewAccountTip
                    ? noNewAccountTip
                    : null
                }
                {
                    newCouponUsedTip
                    ? newCouponUsedTip
                    : null
                }
                {
                    !newCouponUsedTip && alreadyJoin
                    ? alreadyJoin
                    : null
                }
                {
                    noNewAccountTip || newCouponUsedTip || alreadyJoin
                    ? null
                    : <div className="button-container" onClick={this.onAccountEditClick}>
                        <span className="button">点此去完善</span>
                    </div>
                }
            </div>
        );
    }
});

module.exports = App;
