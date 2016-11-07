/**
 * @author xiezhenzong 
 */
import React from 'react';
import { List, InputItem, Checkbox, WingBlank } from 'antd-mobile';
import { createForm } from 'rc-form';
const CheckboxItem = Checkbox.CheckboxItem;

var Roommate = React.createClass({

    onIsFollowChange: function(e) {
        this.setState({'isFollow': e.target.checked});
    },

    getInitialState: function() {
        return {
            'isFollow': true // 是否尊从组织安排
        }
    },

    render: function() {
        const { getFieldProps } = this.props.form;
        var travellerList = null, travellers = this.props.travellers;
        if (!this.state.isFollow) {
            travellerList = this.props.selectTravellers.map(function(id, index) {
                return (
                     <InputItem key={index} clear
                        {
                            ...getFieldProps(id, {
                                initialValue: '',
                            })
                        }
                        placeholder="输入睡友姓名">
                        {travellers[id].name}
                    </InputItem>
                );
            });
        }
        return (
            <div className="roommate-container">
                <div className="roommate-selector">
                    <List>
                        <CheckboxItem
                            checked={this.state.isFollow}
                            {
                                ...getFieldProps('isFollow', {
                                    initialValue: this.state.isFollow,
                                    valuePropName: 'checked',
                                })
                            }
                            onChange={this.onIsFollowChange}>
                            随机同性拼房
                        </CheckboxItem>
                        {
                            this.state.isFollow
                            ? null
                            : travellerList
                        }
                        {
                            this.state.isFollow
                            ? null
                            : <List.Item wrap
                                thumb="https://zos.alipayobjects.com/rmsportal/zotStpFiYpNtZNl.png">
                                如果不设置，海逍遥将为您随机同性拼房
                            </List.Item>
                        }
                    </List>
                </div>
            </div>
        );
    }
});
Roommate = createForm()(Roommate);

module.exports = Roommate;
