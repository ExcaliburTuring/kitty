/**
 * @author xiezhenzong
 */
import React from 'react';
import { Button } from 'react-bootstrap';

import Input from 'input';
import Icon from 'icon';
import { url, defaultValue, error } from 'config';

var Email = React.createClass({

    getInitialState: function() {
        return {
            email: null,
            emailErrorMsg: "邮箱不能为空",
            showEmailError: true,
            password: null,
            confirmPassword: null,
            statesValue: null,
            forbiddenWords: ["password", "user", "username"]
        }
    },

    validateEmail: function(event) {
        // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(event);
    },

    handleEmailInput: function(event) {
        this.setState({
            email: event.target.value
        });
    },

    handlePasswordInput: function(event) {
        this.setState({
            password: event.target.value
        });
    },


    login: function() {
        console.log('login');
    },
    
    render: function() {
        return (
             <div>
                <div>
                    <form action="/account/login" method="post" onSubmit={this.login}>
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
                         <label className="checkbox-inline">
                            <input type="checkbox" defaultChecked/>记住登录状态
                        </label>
                        <div>
                            <Button bsStyle="primary" type="submit">登录</Button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = Email;