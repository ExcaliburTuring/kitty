/**
 * @author xiezhenzong 
 */
import React from 'react';
import { List, InputItem } from 'antd-mobile';
import { createForm } from 'rc-form';

var Roommate = React.createClass({

    // api method

    getRoommate: function() {
        var fieldsValue = this.props.form.getFieldsValue();
        console.log(fieldsValue);
    },

    render: function() {
        const { getFieldProps } = this.props.form;
        var self = this;
        var travellerList = this.props.selectTravellers.map(function(traveller, index) {
            var id = `${traveller.accountid}-${traveller.contactid}`
            return (
                 <InputItem key={index} clear
                    {
                        ...getFieldProps(id, {
                            initialValue: '',
                        })
                    }
                    placeholder="输入睡友姓名">
                    {traveller.name}
                </InputItem>
            );
        })
        return (
            <div className="roommate-container">
                <h3>睡友选择</h3>
                <div className="roommate-selector">
                    <List>
                        {travellerList}
                    </List>
                </div>
                <div className="roommate-show"></div>
                <p>如果不输入睡友姓名，海逍遥将会自动为您选择同性拼房</p>
            </div>
        );
    }
});
Roommate = createForm()(Roommate);

module.exports = Roommate;
