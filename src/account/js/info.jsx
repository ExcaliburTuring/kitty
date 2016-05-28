/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Grid, Row, Panel } from 'react-bootstrap';
import { QueueAnim } from 'antd';

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
            'basicInfo': {},
            'newAccountTipShow': true
        }
    },

    render: function() {
        var basicInfo = this.state.basicInfo;
        if (basicInfo.accountInfo == null) {
            return (<NoLogin/>);
        }

        var newAccountTip = null;
        if (basicInfo.accountInfo.status == accountStatus.WAIT_COMPLETE_INFO && this.state.newAccountTipShow) {
            var title = (
                <Title title="新用户提醒信息" className="info-title">
                    <FaButton faClass="fa fa-times" onClick={()=>{this.setState({'newAccountTipShow': false})}}/>
                </Title>
            )
            newAccountTip = (
                <Panel header={title} bsStyle="info">
                    您还是新用户，可以完善信息，方便以后下单。
                </Panel>
            );
        }

        return (
            <Grid>
                <div className="info-container">
                    <QueueAnim>
                        {newAccountTip}
                    </QueueAnim>
                    <Row>
                        <BasicInfo accountInfo={basicInfo.accountInfo} accountSetting={basicInfo.accountSetting}/>
                    </Row>
                    <Row>
                        <Contact accountInfo={basicInfo.accountInfo} accountSetting={basicInfo.accountSetting}/>
                    </Row>
                    <Row>
                        <Contacts accountInfo={basicInfo.accountInfo} accountSetting={basicInfo.accountSetting}/>
                    </Row>
                </div>
            </Grid>
        );
    }
});

module.exports = Info;
