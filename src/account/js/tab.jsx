/**
 * @author xiezhenzong
 */
import React from 'react';
import { Grid, Row, Col, Nav, NavItem, Image} from 'react-bootstrap';

import { url } from 'config';

var Tab = React.createClass({

    contextTypes: {
        router: React.PropTypes.object
    },

    getInitialState: function() {
        var accountid  = this.props.accountInfo.accountid;
        var name = this.props.accountInfo.name;
        var indexUrl = `/${accountid}`;
        var infoUrl = `/${accountid}/info`;
        var ordersUrl = `/${accountid}/orders`;
        var path = window.location.pathname.split('/')[3];
        var activeKey = 1;
        if (path == 'info') {
            activeKey = 2;
        } else if (path == 'orders') {
            activeKey = 3;
        }
        return {
            'accountid': accountid,
            'name': name,
            'avatarUrl': this.props.accountSetting.avatarUrl,
            'indexUrl': indexUrl,
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
            this.context.router.push(this.state.indexUrl);
        } else if (selectedKey == 2) {
            this.context.router.push(this.state.infoUrl);
        } else if (selectedKey == 3) {
            this.context.router.push(this.state.ordersUrl);
        }
    },

    render: function() {
        return (
            <div className="tab-container">
                <Grid>
                    <Row className="tab-content">
                        <Col sm={3} md={3}>
                            <div className="tab-account-info">
                                <div className="tab-avatar">
                                    <a href={`${url.account}${this.state.indexUrl}`}>
                                        <Image alt="头像" src={this.state.avatarUrl} circle responsive/>
                                    </a>
                                </div>
                            </div>
                        </Col>
                        <Col sm={9} md={9}>
                            <div className="tab-nav">
                                <Nav bsStyle = "pills" justified onSelect = {this.handleSelect} activeKey = {this.state.activeKey}>
                                    <NavItem eventKey = {1}> 我的窝 </NavItem> 
                                    <NavItem eventKey = {2}> 我的信息 </NavItem> 
                                    <NavItem eventKey = {3}> 我的订单 </NavItem>
                                </Nav>
                            </div>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
});

module.exports = Tab;
