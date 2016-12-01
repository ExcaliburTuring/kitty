import React from 'react';
import Reflux from 'reflux';
import { Modal } from 'antd-mobile';
const alert = Modal.alert;

import Rabbit from 'rabbit';
import AccountBasicInfo from 'account_basicinfo';
import { url, accountStatus } from 'config';
import WContact from 'wcontact';

import Headimg from '../img/activity1.png';

var Coupons = Rabbit.create(url.coupons);

var App = React.createClass({

    mixins: [
        Reflux.connect(AccountBasicInfo.store, 'basicInfo'),
        Reflux.connect(Coupons.store, 'coupons'),
    ],

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
        alert('更新成功', '新人优惠券已经升级成功了', [
            { text: '查看', onPress: () => window.location.href = '/account/wcoupon' },
            { text: '继续', onPress: () => window.location.href = self.state.origin },
        ]);
    },

    getInitialState: function() {
        AccountBasicInfo.actions.load();
        Coupons.actions.load({'type': 0}); // 获取新人优惠券
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

    render: function() {
        if (this.state.contact) {
            return (
                <WContact contact={this.state.contact}
                    onSaveSuccessful={this.onSaveSuccessful}
                    onCancleBtnClick={()=>{this.setState({'contact': null})}}/>
            );
        }
        var noNewAccountTip = null, newCouponUsedTip = null; 
        if (this.state.basicInfo.accountInfo.status != accountStatus.WAIT_COMPLETE_INFO) {
            noNewAccountTip = (<div className="content">您不符合活动范围</div>);
        }
        var coupons = this.state.coupons.coupons;
        if (coupons.length && coupons[0].status != 0) {
            newCouponUsedTip = (<div className="content">您已经使用过新人优惠券</div>);
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
                    noNewAccountTip || newCouponUsedTip
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
