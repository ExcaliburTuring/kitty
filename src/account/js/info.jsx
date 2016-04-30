/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Button, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';

import AccountBasicInfo from 'account_basicinfo';
import BasicInfo from './info/basic';
import Contact from './info/contact';
import Password from './info/password';
import Contacts from './info/contacts';
import NoLogin from './nologin'; 

var Info = React.createClass({

    mixins: [Reflux.connect(AccountBasicInfo.store, 'basicInfo')],

    getInitialState: function() {
        AccountBasicInfo.actions.get();
        return {
            'activeKey': 1,
            'basicInfo': {
                'login': false
           }
        }
    },

    handleSelect: function(selectedKey) {
        this.setState({
            activeKey: selectedKey
        });
    },

    render: function() {
        var basicInfo = this.state.basicInfo;
        if (!basicInfo.login || !basicInfo.accountInfo) {
            return (<NoLogin/>);
        }

        var activeKey = this.state.activeKey;
        var content = <BasicInfo basicInfo={basicInfo}/>;
        if (activeKey == 2) {
            content = <Contact basicInfo={basicInfo}/>;
        } else if (activeKey == 3) {
            content = <Contacts basicInfo={basicInfo}/>;
        }

        return (
            <div className="info-container">
                <div className="container">
                    <Grid>
                        <Row className="show-grid">
                            <Col md={2} mdOffset={1}>
                                <div>
                                    <Nav stacked bsStyle="pills" onSelect={this.handleSelect} activeKey={this.state.activeKey}>
                                        <NavItem eventKey={1}> 基本信息 </NavItem> 
                                        <NavItem eventKey={2}> 联系信息 </NavItem>
                                        <NavItem eventKey={3}> 常用出行人 </NavItem>
                                    </Nav>
                                </div>
                            </Col>
                            <Col md={7}>
                                <div>
                                    {content}
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
});

module.exports = Info;
