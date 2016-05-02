/**
 * @author xiezhenzong
 */
import React from 'react';
import { Panel, Form, FormGroup, FormControl, Col, ControlLabel, HelpBlock } from 'react-bootstrap';

var Address = React.createClass({

    getAddress: function() {
        return this.state.address;
    },

    isChange: function() {
        return this.state.address !== this.props.defaultMobile;
    },

    onChange: function(e) {
        var value = e.target.value;
        if (this.state.address === value) {
            return;
        }
        this.setState({
            'address': e.target.value,
        })
    },

    revert: function() {
        this.setState({
            'address': this.props.defaultAddress,
        });
    },

    getInitialState: function() {
        return {
            'address': this.props.defaultAddress,
        }
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.state.address != prevState.address) { // 有时候state 不能立即更新，所以这里要这commponenetDidupdate
            this.props.onChange(this.state.address);
        }  
    },

    render: function() {
        var content;
        if (this.props.readOnly) {
            content = (
                <Col md={3}> <p>{this.state.address}</p> </Col>
             );
        } else {
            content = (
                <Col md={3}>
                    <FormControl
                        type="input"
                        value={this.state.address}
                        onChange={this.onChange}/>
                    <FormControl.Feedback />
                </Col>
            );
        }
        return (
            <FormGroup
                controlId={this.props.controlId}>
                <Col componentClass={ControlLabel} md={2}>
                    邮箱
                </Col>
                {content}
                <Col smHidden xsHidden md={2}>
                    <HelpBlock>{""}</HelpBlock> 
                </Col>
            </FormGroup>
        );
    }

});

module.exports = Address;

