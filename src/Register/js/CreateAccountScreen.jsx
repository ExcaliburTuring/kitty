import React from 'react';
import _ from 'underscore';
import { Button } from 'react-bootstrap';

import Input from 'input';
import Icon from 'icon';
import { url, defaultValue, error } from 'config';

var img = document.createElement('img');
img.src = require('../img/bg_city.png');
var bgStyle = {
    backgroundImage: "url(" + img.src + ")"
};

var CreateAccountScreen = React.createClass({
    getInitialState: function() {
        return {
            email: null,
            emailErrorMsg: "邮箱不能为空",
            password: null,
            confirmPassword: null,
            statesValue: null,
            forbiddenWords: ["password", "user", "username"]
        }
    },

    handlePasswordInput: function(event) {
        if (!_.isEmpty(this.state.confirmPassword)) {
            this.refs.passwordConfirm.isValid();
        }
        this.refs.passwordConfirm.hideError();
        this.setState({
            password: event.target.value
        });
    },

    handleConfirmPasswordInput: function(event) {
        this.setState({
            confirmPassword: event.target.value
        });
    },

    saveAndContinue: function(e) {
        e.preventDefault();

        var canProceed = this.validateEmail(this.state.email)
            && this.refs.password.isValid()
            && this.refs.passwordConfirm.isValid();
        if (canProceed) {
            var data = {
                email: this.state.email,
                password: this.state.password
            };

            $.post(url.register, data, function(result, status) {
                console.log(result);
                if (result.status != 0) {
                    var errors = result.errors;
                    if (result.status == 1100 && erros && errors.length > 0) {
                        for (var e in errors) {
                            if (e.code = 1) { // 邮箱已经存在
                                this.state.setState({
                                    emailErrorMsg: e.message ? e.message : error[e.code.toString()]
                                });
                            }
                        }
                    }
                } else {
                    var accountInfo = result.accountInfo;
                    var redirect = result.redirect ? result.redirect : defaultValue.accountUrl;
                    if (accountInfo && accountInfo.accountid) {
                        window.location.href = redirect + '/' + accountInfo.accountid;
                    } else {
                        // redirect error page
                    }
                }
            });
        } else {
            this.refs.email.isValid();
            this.refs.password.isValid();
            this.refs.passwordConfirm.isValid();
        }
    },

    isConfirmedPassword: function(event) {
        return (event == this.state.password)
    },

    handleEmailInput: function(event) {
        this.setState({
            email: event.target.value
        });
    },

    validateEmail: function(event) {
        // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(event);
    },

    isEmpty: function(value) {
        return !_.isEmpty(value);
    },

    updateStatesValue: function(value) {
        this.setState({
            statesValue: value
        })
    },

    render: function() {
        return (
            <div className="create_account_screen" style={bgStyle}>
                <div className="create_account_form">
                    <h1>新建一个账户</h1>
                    <form action="/account/login" method="post" onSubmit={this.saveAndContinue}>
                        <Input 
                            text="邮箱" 
                            ref="email"
                            type="text"
                            defaultValue={this.state.email} 
                            validate={this.validateEmail}
                            value={this.state.email}
                            onChange={this.handleEmailInput}
                            errorMessage={this.state.emailErrorMsg}
                            emptyMessage="邮箱不能为空"
                            errorVisible={this.state.showEmailError}/>
                        <Input 
                            text="密码" 
                            type="password"
                            ref="password"
                            validator="true"
                            minCharacters="8"
                            requireCapitals="1"
                            requireNumbers="1"
                            forbiddenWords={this.state.forbiddenWords}
                            value={this.state.passsword}
                            emptyMessage="密码不可用"
                            onChange={this.handlePasswordInput}/> 
                        <Input 
                            text="确认密码" 
                            ref="passwordConfirm"
                            type="password"
                            validate={this.isConfirmedPassword}
                            value={this.state.confirmPassword}
                            onChange={this.handleConfirmPasswordInput} 
                            emptyMessage="请确认您的密码"
                            errorMessage="密码不匹配"/>
                        <Button bsStyle="primary" bsSize="large" block type="submit">完  成</Button>
                    </form>
                </div>
            </div>
        );
    }

});

module.exports = CreateAccountScreen;
