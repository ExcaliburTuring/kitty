/**
 * @author xiezhenzong
 */
import React from 'react';
import { Nav, NavItem, Image} from 'react-bootstrap';

import { defaultValue } from 'config';

var Tab = React.createClass({

    contextTypes: {
        router: React.PropTypes.object
    },

    getInitialState: function() {
        var accountid  = this.props.accountInfo.accountid;
        var name = this.props.accountInfo.name;
        var status = this.props.accountInfo.status;
        var avatarUrl = this.props.accountSetting.avatarUrl;
        var infoUrl = `/${accountid}/info`;
        var ordersUrl = `/${accountid}/orders`;
        var path = window.location.pathname.split('/')[3];
        var activeKey = 0;
        if (path == 'info') {
            activeKey = 1;
        } else if (path == 'orders') {
            activeKey = 2;
        }
        return {
            'name': name,
            'status': status,
            'avatarUrl': avatarUrl,
            'accountid': accountid,
            'infoUrl': infoUrl,
            'ordersUrl': ordersUrl,
            'activeKey': activeKey
        };
    },

    handleSelect: function(selectedKey) {
        this.setState({
            activeKey: selectedKey
        });
        if (selectedKey == 1) {
            this.context.router.push(this.state.infoUrl);
        } else if (selectedKey == 2) {
            this.context.router.push(this.state.ordersUrl);
        }
    },

    render: function() {
        var accountUrl = `${defaultValue.accountUrl}/${this.state.accountid}`;
        return (
            <div className="tab-container">
                <div className="container">
                    <div className="tab-content">
                        <div className="tab-account-info">
                            <div className="tab-avatar">
                                <a href={accountUrl}>
                                    <Image alt="头像" src={this.state.avatarUrl} circle/>
                                </a>
                            </div>
                            <div className="tab-detail">
                                <span className="tab-name">{this.state.name}</span>
                            </div>
                        </div>
                        <div className="tab-nav">
                            <Nav bsStyle = "pills" justified onSelect = {this.handleSelect} activeKey = {this.state.activeKey}>
                                <NavItem eventKey = {1}> 个人信息 </NavItem> 
                                <NavItem eventKey = {2}> 订单 </NavItem>
                            </Nav>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Tab;
