/**
 * @authro xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';
import { Table, Button } from 'react-bootstrap';

import { url } from 'config';
import Rabbit from 'rabbit';

var GroupInfo = Rabbit.create(url.group); 

var Groups = React.createClass({

    mixins: [Reflux.connect(GroupInfo.store, 'team')],

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
         GroupInfo.actions.load({'routeid':`${this.props.routeid}`});
    },

    render: function() {
        var groups = this.state.team.groups;
        var groupList;
        var status;
        var startDate;
        var endDate;
        var self = this;

        if (groups && groups.length >= 1) {
            groupList = groups.map(function (group, index) {
                
                startDate=new Date(parseInt(group.startDate)).toLocaleString().replace(/\//g, "-").replace(/日/g, " ").substr(0,9);  
                endDate=new Date(parseInt(group.endDate)).toLocaleString().replace(/\//g, "-").replace(/日/g, " ").substr(0,9); 

                return (
                    <tr key={`group-${index}`}>
                        <td>{startDate} 到 {endDate}</td>
                        <td className="left">{group.title}</td>
                        <td>{status}</td>
                        <td>{group.price}</td>
                        <td><Button className="able" onClick={self.onClick}>{"详情"}</Button></td>
                    </tr>   
                );                                    
            });
        }
        return (
            <div className="teaminfo" key="this.props.routeid">
                <Table responsive condensed hover>
                    <thead>
                        <tr>
                            <th>日期</th>
                            <th> </th>
                            <th>状态</th>
                            <th>价格</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>{groupList}</tbody>
                </Table>
            </div>
        );
    }

});

module.exports = Groups;
