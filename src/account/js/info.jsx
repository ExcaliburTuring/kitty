/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Button, Nav, NavItem, Grid, Row, Col } from 'react-bootstrap';

import AccountBasicInfo from 'account_basicinfo';
import BasicInfo from './info/basic';
import Contact from './info/contact';
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
                                <div>
                                    <BasicInfo basicInfo={basicInfo}/>
                                    <Contact basicInfo={basicInfo}/>
                                    <Contacts basicInfo={basicInfo}/>
                                </div>
                        </Row>
                    </Grid>
                </div>
            </div>
        );
    }
});

module.exports = Info;
