/**
 * @author xiezhenzong
 */
import React from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import cx from 'classnames';

require('./input.less');

var Input = React.createClass({

    getInitialState: function() {
        return {
            'value': this.props.value ? this.props.value : '',
            'state': null,
            'msg': ''
        };
    },

    handleChange: function(e) {
        var value = e.target.value;
        var state = {value: value};
        var validator = this.props.validator;
        if (validator) {
            var ret = validator(value);
            if (!ret || typeof(ret) === 'string') {
                state['state'] = ret;
                state['msg'] = '';
            } else {
                state['state'] = ret.state;
                state['msg'] = ret.state !== 'success' ? ret.msg: '';
            }
        }
        this.setState(state);
    },

    render: function() {
        var inputClass = cx({
            'form-inline': this.props.inline
        });
        var readOnly = this.props.readOnly;
        var type = this.props.type || 'text';
        var placeholder = this.props.placeholder || '请输入';
        var controlLabel;
        if (this.props.label) {
            controlLabel = (<ControlLabel>{this.props.label}</ControlLabel>);
        }
        return (
            <div className={inputClass}>
                <FormGroup
                    controlId={this.props.controlId}
                    validationState={this.state.state}>
                    {controlLabel}
                    <FormControl
                        type={type}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        value={this.state.value}
                        onChange={this.handleChange} />
                    <FormControl.Feedback />
                    <HelpBlock>{this.state.msg}</HelpBlock>
                </FormGroup>
            </div>
        );
    }
});

module.exports = Input;
