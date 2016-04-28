/**
 * @author xiezhenzong
 */
import React from 'react';
import { Button, FormGroup, Checkbox } from 'react-bootstrap';
import _ from 'underscore';

import Input from 'input';
import validator from 'validator';
import { url, defaultValue, error } from 'config';

var Email = React.createClass({

    getInitialState: function() {
        return {
            email: null,
            password: null,
            confirmPassword: null,
        }
    },
    
    render: function() {
        return (
             <div className="email-register">
                <form action="/account/register" method="post" onSubmit={this.login}>
                    <Input
                        type="text"
                        placeholder="邮箱"
                        value={this.state.email}
                        validator={validator.email}/>
                    <Input
                        type="password"
                        placeholder="密码"
                        value={this.state.password}
                        validator={validator.password}/>
                    <FormGroup>
                        <Checkbox inline>同意海逍遥用户协议</Checkbox>
                        <Button bsStyle="primary" type="submit" className="pull-right email-reigster-btn">组册</Button>
                    </FormGroup>
                </form>
            </div>
        );
    }
});

module.exports = Email;
