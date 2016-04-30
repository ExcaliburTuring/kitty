/**
 * @authro xiezhenzong
 */
import React from 'react';
import { Col, Table, Button } from 'react-bootstrap';

var Groups = React.createClass({

    render: function() {
        var groups = this.props.groups;
        var groupList;
        if (groups && groups.length >= 1) {
            groupList = this.props.groups.map(function (group, index) {
                return (
                    <tr key={`group-${index}`}>
                        <td>{group.startDate}</td>
                        <td>{group.endDate}</td>
                        <td>{group.vacation}</td>
                        <td>{group.status}</td>
                        <td>{group.price}</td>
                        <td><Button>{"报名"}</Button></td>
                    </tr>   
                );                                    
            });
        }
        return (
            <div className="teaminfo">
                <Col xs={12} md={12} >
                    <Table responsive condensed hover>
                        <thead>
                            <tr>
                                <th>日期</th>
                                <th>截止报名</th>
                                <th>假期</th>
                                <th>状态</th>
                                <th>价格</th>
                                <th>报名</th>
                            </tr>
                        </thead>
                        <tbody>{groupList}</tbody>
                    </Table>
                </Col>
            </div>
        );
    }

});

module.exports = Groups;
