/**
 * @author xiezhenzong
 */
import React from 'react';
import { Link } from 'react-router';

import {defaultValue} from 'config';

function makeUrl(accountid, url) {
	return defaultValue.registerSuccessRedirect + '/' + accountid + url;
}

var Home = React.createClass({
	render() {
		var { accountid } = this.props.params;
		var infoUrl = makeUrl(accountid, '/info');
		var ordersUrl = makeUrl(accountid, '/orders');
		return (
			<div >
				<div>
					<p>这里是简短的个人信息</p>
					<Link to={infoUrl} activeClassName="active"/>
				</div>
				<div>
					<p>这里是简短的订单信息, 全部请查看</p>
					<Link to={ordersUrl} activeClassName="active"/>
				</div>
            </div>
		);
	}
});

module.exports = Home;
