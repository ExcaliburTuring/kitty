/**
 * @authro xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Col, Table, Button } from 'react-bootstrap';
import { message } from 'antd';
import 'antd/lib/index.css';

import { url, defaultValue } from 'config';
import AccountBasicInfo from 'account_basicinfo';

var Groups = React.createClass({

    mixins: [Reflux.connect(AccountBasicInfo.store, 'basicInfo')],

    getInitialState: function() {
        AccountBasicInfo.actions.get();
        return {
            'basicInfo': {}
        }
    },

    onClick: function(group) {
        if (this.state.basicInfo.accountInfo == null) {
            window.location.pathname = url.wxLogin;
            return;
        }

        $.post(url.orderNew, {'routeid': group.routeid, 'groupid': group.groupid})
        .done(function(data) {
            if (data.status != 0) {
                message.error(defaultValue.newOrderMsg);
            } else {
                window.location.pathname = `${url.order}/${data.orderid}`;
            }
        })
        .fail(function() {
            message.error(defaultValue.newOrderMsg);
        });
    },

    render: function() {
        var groups = this.props.groups;
        if (groups.length == 0) {
            return (
                <div className="teaminfo">
                    <h2>报名</h2>
                    <p>这条路线暂时没有成团，如果您感兴趣，可以联系我们，15001028030</p>
                </div>
            );
        }
        var self = this;
        var groupList = this.props.groups.map(function (group, index) {
            var btn;
            var status;
            var startDate = group.startDate;
            var endDate = group.endDate;
            if(group.status == 'OPEN'){
                status="报名中";
                btn=(
                    <Button className="able" onClick={()=>{self.onClick(group)}}>报名</Button>
                );
            }else if(group.status == 'FULL'){
                status="已报满";
                btn=(
                    <Button className="enable" disabled>已报满</Button>
                );
            }else if(group.status == 'TRAVELLING') {
                status="已出发";
                btn=(
                    <Button className="enable" disabled>出团中</Button>
                );
            }else if(group.status == 'FINISHED') {
                status="报名结束";
                btn=(
                    <Button className="enable" disabled>已结束</Button>
            )}
            return (
                <tr key={`group-${index}`}>
                    <td>{startDate} 到 {endDate}</td>
                    <td className="left">{group.title}</td>
                    <td>{status}</td>
                    <td>{group.price}</td>
                    <td>{btn}</td>
                </tr>   
            );                                    
        });
        return (
            <div className="teaminfo">
                <h2>报名</h2>
                <Table responsive condensed hover>
                    <thead>
                        <tr>
                            <th>日期</th>
                            <th> </th>
                            <th>状态</th>
                            <th>价格</th>
                            <th>报名</th>
                        </tr>
                    </thead>
                    <tbody>{groupList}</tbody>
                </Table>
            </div>
        );
    }

});

module.exports = Groups;
