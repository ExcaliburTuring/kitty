/**
 * @author xiezhenzong
 */
import React from 'react';
import { Image } from 'react-bootstrap';
import { Icon } from 'antd';
 
import { gender } from 'config';
import maleImg from 'male.svg';
import femaleImg from 'female.svg';
import genderUnknownImg from 'gender_unknown.svg';

import 'antd/lib/index.css';
import './contact.less';

var Contact = React.createClass({

    _getOrDefaultValue: function(value, defaultValue) {
        return value === undefined ? defaultValue : value;
    },

    render: function() {
        var closable = this._getOrDefaultValue(this.props.closable, false);
        var readOnly = this._getOrDefaultValue(this.props.readOnly, false);
        var needCard = this._getOrDefaultValue(this.props.needCard, true);
        var contact = this.props.contact;
        var isMale = contact.gender == gender.MALE;
        var isFemale = contact.gender == gender.FEMALE;
        var avatarUrl = null;
        if (isMale) {
            avatarUrl = maleImg;
        } else if (isFemale) {
            avatarUrl = femaleImg;
        } else {
            avatarUrl = genderUnknownImg;
        }
        return (
            <div className="contact-item-container">
                <div className="">
                    <div className="contact-title">
                        <span className="contact-name ellipsis">{contact.name || contact.nickname}</span>
                        <span className="contact-relationship">{contact.relationship}</span>
                        {
                            readOnly 
                                ? null
                                : <div className="edit-wrap">
                                    <Icon type="edit"/>
                                </div>
                        }
                        {
                            readOnly 
                                ? <div className="edit-wrap">
                                    <Icon type="cross" onClick={()=>{this.props.onClose(contact);}}/>
                                </div>
                                : null
                        }
                    </div>
                    <div className="contact-btm">
                        <i className="fa fa-phone fa-lg" aria-hidden="true"></i>
                        <span className="contact-mobile">手机：{contact.mobile}</span>
                    </div>
                    <div className="contact-avatar">
                        <Image href="#" alt="48x48" responsive circle src={avatarUrl} />
                    </div>
                </div>
                {
                    needCard
                        ? <div className={`contact-card ${this.props.totop ? "totop": ""}`}>
                            <div className="card-title">
                                <span className="contact-name ellipsis">{contact.name || contact.nickname}</span>
                                <span className="contact-relationship">{contact.relationship}</span>
                                <div className="edit-wrap">
                                    <Icon type="edit" onClick={()=>{this.props.onEditBtnClick(contact);}}/>
                                </div>
                            </div>
                            <div className="card-btm">
                                <i className="fa fa-phone fa-lg" aria-hidden="true"></i>
                                <span className="contact-mobile">手机：{contact.mobile}</span>
                            </div>
                            <div className="card-avatar">
                                <Image href="#" alt="48x48" responsive circle src={avatarUrl} />
                            </div>
                            <div className="card-detail">
                                <p className="contact-birthday">
                                    <span className="detail-title">生日：</span>
                                    {contact.birthday}
                                </p>
                                <p className="contact-gender">
                                    <span className="detail-title">性别：</span>
                                    {gender.getDesc(contact.gender)}
                                </p>
                                <p>
                                    <span className="detail-title">证件：</span>
                                    {contact.id}
                                </p>
                                <p>
                                    <span className="detail-title">手机：</span>
                                    {contact.mobile}
                                </p>
                            </div>
                        </div>
                    : null
                }
            </div>
        );
    }
});

module.exports = Contact;
