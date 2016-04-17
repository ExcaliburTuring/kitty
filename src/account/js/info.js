/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Button, Nav, NavItem } from 'react-bootstrap';

import BasicInfo from './info/basic_info';
import Avatar from './info/avatar';
import Social from './info/social';
import Secure from './info/secure';

import AccountBasicInfo from 'account_basicinfo';

var Info = React.createClass({

    mixins: [Reflux.connect(AccountBasicInfo.store, 'basicInfo')],

    getInitialState: function() {
        return {
           'activeKey': 1,
           'basicInfo': {
                'login': false
           }
        }
    },

    componentDidMount: function() {
        AccountBasicInfo.actions.get();
    },

    handleSelect: function(selectedKey) {
    	this.setState({
            activeKey: selectedKey
        });
    },

	render: function() {
		if (!this.state.basicInfo.login) {
			return (<div></div>);
		}

		var activeKey = this.state.activeKey;
		var content = <BasicInfo basicInfo={this.state.basicInfo}/>;
		if (activeKey == 2) {
            content = <Avatar basicInfo={this.state.basicInfo}/>;
        } else if (activeKey == 3) {
            content = <Social basicInfo={this.state.basicInfo}/>;
        } else if (activeKey == 4) {
            content = <Secure basicInfo={this.state.basicInfo}/>;
        }
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-2">
						<div>
							<Nav stacked bsStyle = "pills" onSelect = {this.handleSelect} activeKey = {this.state.activeKey}>
								<NavItem eventKey = {1}> 基本信息 </NavItem> 
                                <NavItem eventKey = {2}> 我的头像 </NavItem>
                                <NavItem eventKey = {3}> 账户绑定 </NavItem>
                                <NavItem eventKey = {4}> 账户安全 </NavItem>
							</Nav>
						</div>
					</div>
					<div className="col-sm-10">
						<div>
							{content}
						</div>
					</div>
				</div>
            </div>
		);
	}
});

module.exports = Info;
