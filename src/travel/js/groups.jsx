/**
 * @authro xiezhenzong
 */
import React from 'react';
import { Col, Table, Button } from 'react-bootstrap';

var Groups = React.createClass({

    render: function() {
        var groups = this.props.groups;
        var groupList;
        var btn;

        console.log(groups);
        if (groups && groups.length >= 1) {
            groupList = this.props.groups.map(function (group, index) {

                if(group.status == '接受报名'){
                    btn=(
                        <Button>{"报名"}</Button>
                    );
                }else if(group.status == '已报满'){
                    btn=(
                        <Button>{"到货通知"}</Button>
                    );
                }else {
                    btn=(
                        <Button>{"出团中"}</Button>
                    );
                }

                return (
                    <tr key={`group-${index}`}>
                        <td>{group.startDate} 到 {group.endDate}</td>
                        <td>{group.stopDate}</td>
                        <td>{group.status}</td>
                        <td>{group.price}</td>
                        <td>{btn}</td>
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
