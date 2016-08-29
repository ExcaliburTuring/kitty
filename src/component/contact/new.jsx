/**
 * @author xiezhenzong
 */
import React from 'react';
import { Form, Modal, Button, Icon, message } from 'antd';
 
import { idType, gender, url, defaultValue } from 'config';
import Name from 'name';
import Id from 'id';
import Gender from 'gender';
import Birthday from 'birthday';
import Email from 'email';
import Mobile from 'mobile';
import Address from 'address';

import 'antd/lib/index.css';
import './new.less';

export var NewModal = React.createClass({

    // api method

    toggleVisiable: function() {
        this.setState({'visible': !this.state.visible});
    },

    // helper method

    _createContact: function(contact) {
        contact = contact || {};
        return {
            'contactid': contact.contactid,
            'name': contact.name || '',
            'id': contact.id || '',
            'idType': contact.idType || idType.IDENTIFICATION,
            'gender': contact.gender,
            'birthday': contact.birthday,
            'mobile': contact.mobile,
            'email': contact.email
        };
    },

    _isChange: function() {
        return this.refs.nameInput.isChange()
                || this.refs.idSelector.isChange()
                || this.refs.genderSelector.isChange()
                || this.refs.birthdaySelector.isChange()
                || this.refs.emailContainer.isChange()
                || this.refs.mobileContainer.isChange();
    },

    _revert: function() {
        this.refs.nameInput.revert();
        this.refs.idSelector.revert();
        this.refs.genderSelector.revert();
        this.refs.birthdaySelector.revert();
        this.refs.emailContainer.revert();
        this.refs.mobileContainer.revert();
    },

    // callback method

    onChange: function() {
        if (this._isChange()) {
            this.setState({'isChange': true});
        } else {
            this._revert();
        } 
    },

    onIdChange: function() {
        this.onChange();
        var idSelector = this.refs.idSelector;
        if (idSelector.getIdType() == idType.IDENTIFICATION) { // 只有身份证修改的时候，才会触发
            var birthday = idSelector.getBirthday();
            if (birthday) {
                this.refs.birthdaySelector.setValue(birthday);
            } else {
                this.refs.birthdaySelector.revert();
            }
            var gender = idSelector.getGender();
            if (gender) {
                this.refs.genderSelector.setValue(gender);
            } else {
                this.refs.genderSelector.revert();   
            }
        }
    },

    handleOk: function() {
        if (!this.state.isChange) {
            this.toggleVisiable();
            return;
        }

        if (this.refs.nameInput.validate() != 'success'
            || this.refs.idSelector.validate()!= 'success'
            || this.refs.genderSelector.validate() != 'success'
            || this.refs.birthdaySelector.validate() != 'success'
            || this.refs.emailContainer.validate() != 'success'
            || this.refs.mobileContainer.validate() != 'success') {
            return;
        }

        this.setState({
            'confirmLoading': true,
            'closable': true,
        });
        var origialContact = this._createContact(this.props.contact);
        var contact = {};
        contact['accountid'] = origialContact.accountid;
        if (origialContact.hasOwnProperty('contactid')) {
            contact['contactid'] = origialContact.contactid;
        }
        if (this.refs.nameInput.isChange()) {
            contact['name'] = this.refs.nameInput.getValue();
        }
        if (this.refs.idSelector.isChange()) {
            contact['id'] = this.refs.idSelector.getId();
            contact['idType'] = this.refs.idSelector.getIdType();
        }
        if (this.refs.genderSelector.isChange()) {
            contact['gender'] = this.refs.genderSelector.getValue();
        }
        if (this.refs.birthdaySelector.isChange()) {
            contact['birthday'] = this.refs.birthdaySelector.getValue();
        }
        if (this.refs.emailContainer.isChange()) {
            contact['email'] = this.refs.emailContainer.getValue();
        }
        if (this.refs.mobileContainer.isChange()) {
            contact['mobile'] = this.refs.mobileContainer.getValue();
        }
        var self = this;
        $.post(this.props.isAccount ? url.accountInfo : url.contacts, contact)
        .done(function(data) {
            if (data.status != 0) {
                self.setState({
                    'confirmLoading': false,
                    'closable': true,
                });
                message.error(defaultValue.updateContactsMsg);
            } else {
                self.setState({
                    'confirmLoading': false,
                    'visible': false,
                    'closable': true,
                });
                self.refs.nameInput.cleanValidate();
                self.refs.idSelector.cleanValidate();
                self.refs.genderSelector.cleanValidate();
                self.refs.birthdaySelector.cleanValidate();
                self.refs.emailContainer.cleanValidate();
                self.refs.mobileContainer.cleanValidate();
                self.props.onHandleOk();
            }
        }).fail(function() {
            self.setState({
                    'confirmLoading': false,
                    'closable': true,
                });
            message.error(defaultValue.updateContactsMsg);
        });
    },

    handleDelete: function() {
        var contact = this.props.contact;
        if (contact && contact.contactid) {
            this.setState({
                'confirmLoading': true,
                'closable': true,
            });
            var self = this;
            $.ajax({
                url: url.contacts,
                type: 'post',
                data: {'contactid': contact.contactid, '_method': 'delete'}
            }).done(function(data) {
                if (data.status != 0) {
                     message.error(defaultValue.deleteContactsMsg);
                } else {
                    self.setState({
                        'confirmLoading': false,
                        'visible': false,
                        'closable': true,
                    });
                    self.props.onHandleDelete();
                }
            }).fail(function() {
                message.error(defaultValue.deleteContactsMsg);
            });
        };
    },

    handleCancel: function() {
        if (this.state.closable) {
            this.toggleVisiable();
        }
    },

    // compoment specs

    getInitialState: function() {
        return {
            'visible': false,
            'confirmLoading': false,
            'closable': true
        }
    },

    render: function() {
        var contact = this._createContact(this.props.contact);
        var readOnly1 = this.refs.idSelector
                        ? this.refs.idSelector.getIdType() === idType.IDENTIFICATION 
                        : contact.idType === idType.IDENTIFICATION;
        var footer = null;
        if (this.props.contact && !this.props.isAccount) { 
            footer = (
                <div>
                    <Button type="ghost" size="large" onClick={this.handleCancel}>取消</Button>
                    <Button type="ghost" size="large" onClick={this.handleDelete}>删除</Button>
                    <Button type="primary" size="large"  onClick={this.handleOk}>确定</Button>
                </div>
            );
        } else { 
            footer = (
                <div>
                    <Button type="ghost" size="large" onClick={this.handleCancel}>取消</Button>
                    <Button type="primary" size="large"  onClick={this.handleOk}>确定</Button>
                </div>
            );
        }
        return (
            <Modal title={this.props.title}
                footer={footer}
                visible={this.state.visible}
                closable={false}
                onOk={this.handleOk} 
                onCancel={this.handleCancel} 
                confirmLoading={this.state.confirmLoading}>
                <Form horizontal>
                    <Name
                        ref="nameInput"
                        defaultValue={contact.name}
                        onChange={this.onChange}
                        readOnly={false}/>
                    <Id
                        ref="idSelector"
                        defaultIdType={contact.idType}
                        defaultId={contact.id}
                        readOnly={false}
                        onChange={this.onIdChange}/>
                    <Gender
                        ref="genderSelector"
                        defaultValue={contact.gender}
                        readOnly={readOnly1}
                        onChange={this.onChange}/>
                    <Birthday 
                        ref="birthdaySelector"
                        defaultValue={contact.birthday}
                        readOnly={readOnly1}
                        onChange={this.onChange}/>
                    <Mobile
                        ref="mobileContainer"
                        defaultValue={contact.mobile}
                        onChange={this.onChange}
                        readOnly={false}/>
                    <Email
                        ref="emailContainer"
                        defaultValue={contact.email}
                        onChange={this.onChange}
                        readOnly={false}/>
                </Form>
            </Modal>
        );
    }
});

export var NewBtn = React.createClass({

    render: function() {
        return (
            <div className="new-btn-container">
                <Button  type="primary" onClick={this.props.onNewBtnClick}>
                    <Icon type="plus" />
                </Button>
            </div>
        );
    }

});
