/**
 * @author xiezhenzong
 */
import React from 'react';
import { Form, DatePicker } from 'antd';
const FormItem = Form.Item;

import validator from 'validator';

import 'antd/lib/index.css';
import './birthday.less';

var Birthday = React.createClass({

    getBirthday: function() {
        return  this.state.birthday;
    },

    setBirthday: function(b) {
        this.setState({
            'birthday': b
        });
    },

    isChange: function() {
        return this.state.birthday !== this.props.defaultBirthday;
    },

    onChange: function( e) {
        var birthday = e;
        if (birthday == this.state.birthday) {
            return;
        }
        this.setState({
            'birthday': birthday
        });
    },

    revert: function() {
        this.setState(this.getInitialState());
    },

    getInitialState: function() {
        return {
            'birthday': this.props.defaultBirthday,
            'validationState': null,
            'msg': '',
        };
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.birthday != prevState.birthday) { // 有时候state 不能立即更新，所以这里要这commponenetDidupdate
            this.props.onChange(this.state.birthday);
        }  
    },

    render: function() {
        return (
            <FormItem
                className="birthday-select-container"
                label="生日："
                required={this.props.required}
                validateStatus={this.state.validationState}
                help={this.state.msg}
                hasFeedback
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 16 }}>
                <DatePicker
                    value={this.state.birthday}
                    defaultValue={this.props.defaultBirthday}
                    onChange={this.onChange}
                    disabled={this.props.readOnly} />
            </FormItem>
        );
    }
});

module.exports = Birthday;
