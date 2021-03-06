/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Grid } from 'react-bootstrap';
import { Alert } from 'antd';

import { accountStatus } from 'config';
import BasicInfo from './info/basic';
import Contacts from './info/contacts';

import 'antd/lib/index.css';

var Info = React.createClass({

    getInitialState: function() {
        return {
            'basicInfo': {}
        }
    },

    render: function() {
        var accountInfo = this.props.accountInfo;
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
            <div className="info-container">
                <Grid>
                    {newAccountTip}
                    <BasicInfo accountInfo={accountInfo}/>
                    <Contacts accountInfo={accountInfo}/>
                </Grid>
            </div>
        );
    }
});

module.exports = Info;
