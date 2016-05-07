/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Grid } from 'react-bootstrap';

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
            'basicInfo': {}
        }
    },

    render: function() {
        var basicInfo = this.state.basicInfo;
        if (basicInfo.accountInfo == null) {
            return (<NoLogin/>);
        }

        return (
            <div className="info-container">
                <Grid>
                    <BasicInfo basicInfo={basicInfo}/>
                    <Contact basicInfo={basicInfo}/>
                    <Contacts basicInfo={basicInfo}/>
                </Grid>
            </div>
        );
    }
});

module.exports = Info;
