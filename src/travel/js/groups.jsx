/**
 * @authro xiezhenzong
 */
import React from 'react';
import { Col, Table, Button } from 'react-bootstrap';

var Groups = React.createClass({

    onClick: function() {

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
        var groupList = this.props.groups.map(function (group, index) {
            var btn;
            var status;
            var startDate = new Date(parseInt(group.startDate)).toLocaleString().replace(/\//g, "-").replace(/日/g, " ").substr(0,9);  
            var endDate = new Date(parseInt(group.endDate)).toLocaleString().replace(/\//g, "-").replace(/日/g, " ").substr(0,9); 
            if(group.status == 'OPEN'){
                status="报名中";
                btn=(
                    <Button className="able">报名</Button>
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
