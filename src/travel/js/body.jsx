/**
 * @author zhaowei
 */
import React from 'react';
import { Nav, NavItem, Col, Table, Button } from 'react-bootstrap';
import { AutoAffix } from 'react-overlays';

import BodyNav from './body_nav';
import Days from './days';
import Notice from './notice';
import Expense from './expense';
import Groups from './groups';
import Brief from './brief';

var Body = React.createClass({

    render: function() {
        var imgtext = this.props.imgtext;
        return (
            <div>
                <BodyNav container={this}/>
                <div className="maininfo">
                    <Brief brief={imgtext.introduction}/>
                    <Days days={imgtext.days}/>
                    <Notice notice={imgtext.notice}/>
                    <Expense expense={imgtext.expense}/>
                    <Groups groups={this.props.groups}/>
                </div>
            </div>
        );
    }

});

module.exports = Body;
