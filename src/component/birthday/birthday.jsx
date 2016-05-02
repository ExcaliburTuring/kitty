/**
 * @author xiezhenzong
 */
import React from 'react';
import { FormGroup, ControlLabel,  HelpBlock, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import validator from 'validator';

require('react-datepicker/dist/react-datepicker.css');

var _dateFormate = 'YYYY-MM-DD';

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
        var birthday = e.format(_dateFormate);
        if (birthday == this.state.birthday) {
            return;
        }
        this.setState({
            'birthday': birthday
        });
       // this.state.onChange(birthday); 在componentDidUpdate里调用
    },

    revert: function() {
        this.setState({
            'birthday': this.props.defaultBirthday,
            'validationState': null,
            'msg': '',
        });
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
            <FormGroup
                controlId={this.props.controlId}
                validationState={this.state.validationState}>
                <Col componentClass={ControlLabel} md={2}>
                    生日
                </Col>
                <Col md={3}>
                    <DatePicker
                        selected={moment(this.state.birthday, _dateFormate)}
                        onChange={this.onChange}
                        showYearDropdown
                        disabled={this.props.readOnly}
                        placeholderText="选择您的生日"
                        dateFormat="YYYY-MM-DD"
                        dateFormatCalendar="MMMM" />
                </Col>
                <Col md={2}>
                    <HelpBlock>{this.state.msg}</HelpBlock> 
                </Col>
            </FormGroup>
        );
    }
});

module.exports = Birthday;
