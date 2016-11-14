/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { WingBlank, WhiteSpace } from 'antd-mobile';

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
            <div>
                <WhiteSpace size="lg"/>
                <WingBlank className="discountcode-list">
                    {discountCodeList}
                </WingBlank>
                <WhiteSpace size="lg"/>
            </div>
        );
    }
});

var DiscountCodeItem = React.createClass({

    render: function() {
        var discountCode = this.props.discountCode;
        var usable = discountCodeStatus.isUsable(discountCode.status);
        return (
            <div className={`discountcode-container ${usable ? '' : 'discountcode-unusable'}`}>
                <div className="discountcode-body clearfix">
                    <div className="pull-left discountcode-price-container">
                        <p>¥
                            <span className="discountcode-price">{discountCode.value.replace("￥", "")}</span>
                        </p>
                    </div>
                    <div className="pull-left discountcode-rule-container">
                        <p className="discountcode">优惠码：
                            <span className="discountcode-text">{discountCode.discountCode}</span>
                        </p>
                        <ul className="discountcode-rule">
                            <li>{`状态：${discountCodeStatus.getDesc(discountCode.status)}`}</li>
                            <li>只限当前帐号下单使用</li>
                            <li>{`${discountCode.startTime}  ~  ${discountCode.endTime}`}</li>
                        </ul>
                    </div>
                    {
                        usable
                        ? null
                        : (
                            <div className="discountcode-unusable-overlay">
                                
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }

});

module.exports = App;
