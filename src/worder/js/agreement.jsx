/**
 * @author xiezhenzong 
 */
import React from 'react';
import Reflux from 'reflux';
import { Button, Checkbox } from 'antd-mobile';
import { createForm } from 'rc-form';
const AgreeItem = Checkbox.AgreeItem;

import { url }  from 'config';
import Rabbit from 'rabbit';

var Agreement = React.createClass({

    render: function() {
        const { getFieldProps } = this.props.form;
        return (
            <div className="agreement-container">
                <Button className="am-button-fix">注意事项及合同下载</Button>
                <AgreeItem data-seed="logId"
                    {
                        ...getFieldProps('agreement', {
                            initialValue: false,
                            valuePropName: 'checked',
                        })
                    }>
                    已阅读协议
                    <a onClick={(e) => { e.preventDefault(); alert('打开协议'); }}>
                    《协议链接》
                    </a>
                </AgreeItem>
            </div>
        );
    }
});
Agreement = createForm()(Agreement);

module.exports = Agreement;
