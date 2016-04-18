/**
 * @author xiezhenzong
 */
import React from 'react'; 

import Info from './info';
import Orders from './orders';
import { defaultValue } from 'config';

var Index = React.createClass({
    render: function() {
        var { accountid } = this.props.params;
        var ordersUrl = `${defaultValue.accountUrl}/${accountid}/orders`;
        var infoUrl = `${defaultValue.accountUrl}/${accountid}/info`;
        return (
            <div >
                <div>
                    <p>这里是简短的个人信息，全部请查看
                        <a href={infoUrl} activeClassName="active">这里</a>
                    </p>
                    <Info/>
                </div>
                <div>
                    <p>这里是简短的订单信息，全部请查看
                        <a href={ordersUrl} activeClassName="active">这里</a>
                    </p>
                    <Orders/>
                </div>
            </div>
        );
    }
});

module.exports = Index;
