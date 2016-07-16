/**
 * @authro xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Button } from 'react-bootstrap';
import { Table } from 'antd';
import 'antd/lib/index.css';

import { url, orderStatus, defaultValue } from 'config';
import Rabbit from 'rabbit';

var Groups = React.createClass({

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
        }];
    },

    getTableData: function(groups) {
        return groups.map(function(group, index) {
            return {
                'key': `travel-group-${index}`, 
                'date': `${group.startDate} 到 ${group.endDate}`,
                'title': group.title,
                'status': groupStatus.getDesc(group.status),
                'price': `${group.price}`
            };
        });
    },

    getInitialState: function() {
        return {
            'team': {
                'status': 0,
                'groups': []
            }
        };
    },

    onClick: function() {
        var routeid = this.props.routeid;
        window.location.pathname= `${url.travel}/${routeid}`;
    },

    componentDidMount: function() {
        var GroupInfo = this.props.groupInfo;
        this.unsubscribe = GroupInfo.store.listen(this.onStatusChange);
        GroupInfo.actions.load({'routeid':`${this.props.routeid}`});
    },

    componentWillUnmount: function() {
        this.unsubscribe();
    },

    onStatusChange: function(team) {
        this.setState({'team': team});
    },

    render: function() {
        var groups = this.state.team.groups;
        if (!groups || groups.length == 0) {
            return (
                <div className="teaminfo">
                    <p>这条路线暂时没有成团，如果您感兴趣，可以联系我们，{defaultValue.hotline}</p>
                </div>
            );
        }
        return (
            <div className="teaminfo">
                <Table 
                    columns={this.getTableColumn()} 
                    dataSource={this.getTableData(groups)} 
                    bordered 
                    pagination={false} />
            </div>
        );
    }

});

module.exports = Groups;
