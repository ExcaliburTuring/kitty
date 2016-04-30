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

var Body = React.createClass({

    render: function() {
        var imgtext = this.props.imgtext;
        return (
            <div>
                <BodyNav container={this}/>
                <Days days={imgtext.days}/>
                <Notice notice={imgtext.notice}/>
                <Expense expense={imgtext.expense}/>
                <Groups groups={this.props.groups}/>
            </div>
        );
    }

});

module.exports = Body;
