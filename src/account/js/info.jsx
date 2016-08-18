/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Grid, Row } from 'react-bootstrap';
import { Alert } from 'antd';

import AccountBasicInfo from 'account_basicinfo';
import { accountStatus } from 'config';
import Title from 'title';
import FaButton from 'fabutton';
import BasicInfo from './info/basic';
import Contact from './info/contact';
import Contacts from './info/contacts';
import NoLogin from './nologin'; 

import 'antd/lib/index.css';

var Info = React.createClass({

    mixins: [Reflux.connect(AccountBasicInfo.store, 'basicInfo')],

    getInitialState: function() {
        AccountBasicInfo.actions.get();
        return {
            'basicInfo': {}
        }
    },

    render: function() {
        var accountInfo = this.state.basicInfo.accountInfo;
        if (accountInfo == null) {
            return (<NoLogin/>);
        }

        var newAccountTip = null;
        if (accountInfo.status == accountStatus.WAIT_COMPLETE_INFO) {
            newAccountTip = (
                <Alert message="新用户提醒信息"
                    description="您还是新用户，强烈建议您完善个人信息，方便以后下单。"
                    type="info"
                    closable/>
            );
        }

        return (
            <Grid>
                <div className="info-container">
                    {newAccountTip}
                    <Row>
                        <BasicInfo accountInfo={accountInfo}/>
                    </Row>
                    <Row>
                        <Contact accountInfo={accountInfo}/>
                    </Row>
                    <Row>
                        <Contacts accountInfo={accountInfo}/>
                    </Row>
                </div>
            </Grid>
        );
    }
});

module.exports = Info;
