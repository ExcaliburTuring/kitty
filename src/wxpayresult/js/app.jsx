/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Result } from 'antd-mobile';

import { url } from 'config';
import Rabbit from 'rabbit';

var OrderPayResult = Rabbit.create(url.orderPayResult);

var App = React.createClass({

    mixins: [
        Reflux.connect(OrderPayResult.store, 'data')
    ],

    _getQueryString: function (name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        return r != null ? unescape(r[2]): null; 
    },

    // compoment specs

    getInitialState: function() {
        var orderid = this._getQueryString('orderid');
        OrderPayResult.actions.load({'orderid': orderid});
        return {
            'basicInfo': {},
            'data': {
                'status': 1,
                'result': 2,
                'price': '¥0',
                'actualPrice': '¥0'
            }
        }
    },

    render: function() {
        var orderInfo = this.state.data.orderInfo;
        return (
            <div className="payresult-container">
                <Result
                    imgUrl="https://zos.alipayobjects.com/rmsportal/yRUDxcBPvzZTDHK.png"
                    title="支付成功"
                    message={
                        <div>
                            <div>{orderInfo.actualPrice}</div><del>{orderInfo.price}</del>
                        </div>
                    }/>
            </div>
        );
    }
});

module.exports = App;
