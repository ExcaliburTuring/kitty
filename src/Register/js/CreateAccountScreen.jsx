import React from 'react';
import Input from './components/Input';
import _ from 'underscore';
import Icon from './components/Icon';

var CreateAccountScreen = React.createClass({
  getInitialState: function () {
    return {
      email: null,
      companyName: null,
      password: null,
      confirmPassword: null,
      statesValue: null,
      forbiddenWords: ["password", "user", "username"]
    }
  },

  handlePasswordInput: function (event) {
    if(!_.isEmpty(this.state.confirmPassword)){
      this.refs.passwordConfirm.isValid();
    }
    this.refs.passwordConfirm.hideError();
    this.setState({
      password: event.target.value
    });
  },

  handleConfirmPasswordInput: function (event) {
    this.setState({
      confirmPassword: event.target.value
    });
  },

  saveAndContinue: function (e) {
    e.preventDefault();

    var canProceed = this.validateEmail(this.state.email) 
    && this.refs.password.isValid()
    && this.refs.passwordConfirm.isValid();

    if(canProceed) {
      var data = {
        email: this.state.email,
        companyName: this.state.companyName,
        password: this.state.password
      }
      this.props.onSubmit(data);
    } else {
      this.refs.email.isValid();
      this.refs.companyName.isValid();
      this.refs.password.isValid();
      this.refs.passwordConfirm.isValid();
    }
  },

  isConfirmedPassword: function (event) {
    return (event == this.state.password)
  },

  handleCompanyInput: function(event) {
    this.setState({
      companyName: event.target.value
    })
  },

  handleEmailInput: function(event){
    this.setState({
      email: event.target.value
    });
  },

  validateEmail: function (event) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(event);
  },

  testEmail: function (event) {
    $.post('',event, function (e) {
      this.items = JSON.parse(e);
      alert(this.items);
    }.bind(this));
    return re.test(event);
  },

  isEmpty: function (value) {
    return !_.isEmpty(value);
  },

  updateStatesValue: function (value) {
    this.setState({
      statesValue: value
    })
  },

  render: function() {
    return (
      <div className="create_account_screen">

      <div className="create_account_form">
      <h1>Creat A New Account</h1>
      <p>海逍遥，专注于年轻人的旅行</p>
      <form onSubmit={this.saveAndContinue}>

      <Input 
      text="邮箱" 
      ref="email"
      type="text"
      defaultValue={this.state.email} 
      validate={this.validateEmail}
      value={this.state.email}
      onChange={this.handleEmailInput}
      testEmail={this.testEmail}
      errorMessage="邮箱不可用"
      emptyMessage="邮箱不能为空"
      errorVisible={this.state.showEmailError}
      />

      <Input 
      text="昵称" 
      ref="companyName"
      validate={this.isEmpty}
      value={this.state.companyName}
      onChange={this.handleCompanyInput} 
      emptyMessage="昵称不能为空"
      /> 

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
      onChange={this.handlePasswordInput} 
      /> 

      <Input 
      text="确认密码" 
      ref="passwordConfirm"
      type="password"
      validate={this.isConfirmedPassword}
      value={this.state.confirmPassword}
      onChange={this.handleConfirmPasswordInput} 
      emptyMessage="请确认您的密码"
      errorMessage="密码不匹配"
      /> 

      <button 
      type="submit" 
      className="button button_wide">
      CREATE ACCOUNT
      </button>

      </form>
      </div>

      </div>
      );
}

});

module.exports = CreateAccountScreen;