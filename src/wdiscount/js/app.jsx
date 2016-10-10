/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Image } from 'react-bootstrap';

import AccountBasicInfo from 'account_basicinfo';
import Rabbit from 'rabbit';
import { url, discountCodeStatus } from 'config';

var DiscountCode = Rabbit.create(url.discountCode);
var App = React.createClass({

    mixins: [
        Reflux.connect(AccountBasicInfo.store, 'basicInfo'),
        Reflux.connect(DiscountCode.store, 'discountCode')
    ],

    getInitialState: function() {
        AccountBasicInfo.actions.load();
        DiscountCode.actions.load();
        return {
            'basicInfo': {
                'accountInfo': {
                    'name': '',
                    'avatarUrl': ''
                }
            },
            'discountCode': {
                'discountCodes': []
            },
        };
    },

    render: function() {
        var discountCodeList = this.state.discountCode.discountCodes.map(function (discountCode, index) {
            return (
                <DiscountCodeItem key={`${index}`} discountCode={discountCode}/>
            ); 
        });
        return (
            <div className="discountcode-list">
                {discountCodeList}  
            </div>
        );
    }
});

var DiscountCodeItem = React.createClass({

    render: function() {
        var discountCode = this.props.discountCode;
        var usable = discountCodeStatus.isUsable(discountCode.status);
        return (
            <div className="discountcode-container">
                <div className="discountcode-header">
                    <Image href="#" alt="优惠券的图片而已" responsive
                        src={"https://c3-q.mafengwo.net/s9/M00/C7/A1/wKgBs1fDSCmAH_MLAA25B6q9eNw96.jpeg?imageMogr2%2Fthumbnail%2F%21450x180r%2Fgravity%2FCenter%2Fcrop%2F%21450x180%2Fquality%2F90"} />
                </div>
                <div className="discountcode-body clearfix">
                    <div className="pull-left">
                        <p>{`优惠码：${discountCode.discountCode}`}</p>
                        <p>{`金额：${discountCode.value}`}</p>
                        <p>{`状态：${discountCodeStatus.getDesc(discountCode.status)}`}</p>
                    </div>
                    <div className="pull-right">
                        <p>{`开始日期: ${discountCode.startTime}`}</p>
                        <p>{`截止日期: ${usable ?  discountCode.endTime : discountCodeStatus.getDesc(discountCode.status)}`}</p>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = App;
