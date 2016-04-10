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
	return '/' + accountid + url;
}

var App = React.createClass({

	contextTypes: {
		router: React.PropTypes.object
	},

	getInitialState: function() {
		var { accountid } = this.props.params;
		var ordersUrl = makeUrl(accountid, '/orders');
		var infoUrl = makeUrl(accountid, '/info');
		var path = window.location.pathname.split('/')[3];
		var activeKey = 0;
		if (path == 'orders') {
			activeKey = 1;
		} else if (path == 'info') {
			activeKey = 2;
		}
        return {
        	activeKey: activeKey,
        	accountid: accountid,
        	ordersUrl: ordersUrl,
        	infoUrl: infoUrl
        };
	},

	handleSelect: function(selectedKey) {
		this.setState({
			activeKey: selectedKey
		});
		if (selectedKey == 1) {
			this.context.router.push(this.state.infoUrl);
		} else {
			this.context.router.push(this.state.ordersUrl);
		}
	},

	render: function() {
		return (
			<div >
				<Navbar />
				<Banner accountid={this.state.accountid}/>
				<Nav bsStyle="tabs" justified onSelect={this.handleSelect} activeKey={this.state.activeKey}>
					<NavItem eventKey={1}>个人信息</NavItem>
					<NavItem eventKey={2}>订单</NavItem>
					<NavItem eventKey={3}>联系人</NavItem>
				</Nav>
                {this.props.children}
                <Footer />
            </div>
		);
	}
});

module.exports = App;
