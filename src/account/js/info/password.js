/**
 * @author xiezhenzong
 */
import React from 'react';
import { Panel } from 'react-bootstrap';

import Input from 'input';

const _title = (
    <h3>修改密码</h3>
);

var Password = React.createClass({

    render: function() {
        var accountInfo = this.props.basicInfo.accountInfo;
        return (
            <div className="contact-container info-section">
                <Panel header={_title}>
                    <Input
                        type="password"
                        label="原始密码:"
                        value={accountInfo.password}/>
                    <Input
                        type="passowrd"
                        label="新密码："/>
                    <Input
                        type="text"
                        label="确定新密码："/>
                </Panel>
            </div>
        );
    }
});

module.exports = Password;
