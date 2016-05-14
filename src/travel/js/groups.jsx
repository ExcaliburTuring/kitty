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
        var status;
        var startDate;
        var endDate;

        if (groups && groups.length >= 1) {
            groupList = this.props.groups.map(function (group, index) {
                
                startDate=new Date(parseInt(group.startDate)).toLocaleString().replace(/\//g, "-").replace(/日/g, " ").substr(0,9);  
                endDate=new Date(parseInt(group.endDate)).toLocaleString().replace(/\//g, "-").replace(/日/g, " ").substr(0,9); 

                if(group.status == 'OPEN'){
                    status="报名中";
                    btn=(
                        <Button className="able">{"报名"}</Button>
                    );
                }else if(group.status == 'FULL'){
                    status="已报满";
                    btn=(
                        <Button className="able">{"到货通知"}</Button>
                    );
                }else if(group.status == 'TRAVELLING') {
                    status="已出发";
                    btn=(
                        <Button className="enable">{"出团中"}</Button>
                    );
                }else if(group.status == 'FINISHED') {
                    status="报名结束";
                    btn=(
                        <Button className="enable">{"已结束"}</Button>
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
        }
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
