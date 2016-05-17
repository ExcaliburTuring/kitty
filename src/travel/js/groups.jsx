/**
 * @authro xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Col } from 'react-bootstrap';
import { message, Table, Button } from 'antd';
import 'antd/lib/index.css';

import { url, defaultValue, groupStatus } from 'config';
import AccountBasicInfo from 'account_basicinfo';

var Groups = React.createClass({

    mixins: [Reflux.connect(AccountBasicInfo.store, 'basicInfo')],

    getTableColumn: function() {
        var self = this;
        return [{
            title: '日期',
            dataIndex: 'date',
            colSpan: 2
        }, {
            title: '',
            dataIndex: 'title',
            colSpan: 0
        }, {
            title: '状态',
            dataIndex: 'status',
        }, {
            title: '价格',
            dataIndex: 'price',
        }, {
            title: '报名',
            dataIndex: 'newOrder',
            render: function(group) {
                if (group.status == groupStatus.OPEN) {
                    return (
                        <Button size="large" type="primary" onClick={() => {self.onClick(group)}}>
                            报名
                        </Button>
                    );
                } else {
                    return (
                        <Button size="large" type="primary" disabled>
                            报名
                        </Button>
                    );
                }
            }
        }];
    },

    getTableData: function() {
        return this.props.groups.map(function(group, index) {
            return {
                'key': `travel-new-order-${index}`, 
                'date': `${group.startDate}到${group.endDate}`,
                'title': group.title,
                'status': groupStatus.getDesc(group.status),
                'price': `${group.price}元`,
                'newOrder': group 
            };
        });
    },

    onClick: function(group) {
        if (this.state.basicInfo.accountInfo == null) {
            window.location.pathname = url.wxLogin;
            return;
        }

        if (group.status != groupStatus.OPEN) {
            message.error('本团可不可报名');
            return ;
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

    getInitialState: function() {
        AccountBasicInfo.actions.get();
        return {
            'basicInfo': {}
        }
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
        return (
            <div className="teaminfo">
                <Col xs={12} md={12}>
                    <h2>报名</h2>
                    <Table 
                        columns={this.getTableColumn()} 
                        dataSource={this.getTableData()} 
                        bordered 
                        pagination={false} />
                </Col>
                
            </div>
        );
    }

});

module.exports = Groups;
