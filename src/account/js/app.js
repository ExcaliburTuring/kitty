/**
 * @author xiezhenzong
 */
import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';

import Navbar from 'navbar';
import Footer from 'footer';
import Banner from './banner';
import {defaultValue} from 'config';

function makeUrl(accountid, url) {
	return defaultValue.registerSuccessRedirect + '/' + accountid + url;
}

var App = React.createClass({
	render() {
		var { accountid } = this.props.params;
		var infoUrl = makeUrl(accountid, '/info');
		var ordersUrl = makeUrl(accountid, '/orders');
		var settingUrl = makeUrl(accountid, '/setting');
		return (
			<div >
				<Navbar />
				<Banner />
				<Nav bsStyle="tabs" justified activeKey={1}>
					<NavItem eventKey={1} href={infoUrl}>个人信息</NavItem>
					<NavItem eventKey={2} href={ordersUrl}>订单</NavItem>
					<NavItem eventKey={3} href={settingUrl}>信息设置</NavItem>
				</Nav>
                {this.props.children}
                <Footer />
            </div>
		);
	}
});

module.exports = App;
