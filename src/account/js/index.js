/**
 * @author xiezhenzong
 */
import React from 'react';

import { defaultValue } from 'config';

function makeUrl(accountid, url) {
    return ;
}

var Index = React.createClass({
    render() {
        var { accountid } = this.props.params;
        var ordersUrl = `${defaultValue.registerSuccessRedirect}/${accountid}/orders`;
        var infoUrl = `${defaultValue.registerSuccessRedirect}/${accountid}/info`;
        return (
            <div >
				<div>
					<p>这里是简短的订单信息，全部请查看
                        <a href={ordersUrl} activeClassName="active">这里</a>
                    </p>
				</div>
				<div>
					<p>这里是简短的个人信息，全部请查看
                        <a href={infoUrl} activeClassName="active">这里</a>
                    </p>
				</div>
            </div>
        );
    }
});

module.exports = Index;
