/**
 * @author xiezhenzong
 */
import React from 'react';
import { Image } from 'react-bootstrap';
import { Icon } from 'antd';
 
import { gender } from 'config';

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
        return (
            <div className="contact-item-container">
                <div className="">
                    <div className="contact-title">
                        <span className="contact-name ellipsis">{this.props.contact.name || this.props.contact.nickname}</span>
                        <span className="contact-relationship">{this.props.contact.relationship}</span>
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
                                    <Icon type="cross" onClick={()=>{this.props.onClose(this.props.contact);}}/>
                                </div>
                                : null
                        }
                    </div>
                    <div className="contact-btm">
                        <i className="fa fa-phone fa-lg" aria-hidden="true"></i>
                        <span className="contact-mobile">手机：{this.props.contact.mobile}</span>
                    </div>
                    <div className="contact-avatar">
                        <Image href="#" alt="32x32" responsive circle
                        src="http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0" />
                    </div>
                </div>
                {
                    needCard
                        ? <div className={`contact-card ${this.props.totop ? "totop": ""}`}>
                            <div className="card-title">
                                <span className="contact-name ellipsis">{this.props.contact.name || this.props.contact.nickname}</span>
                                <span className="contact-relationship">{this.props.contact.relationship}</span>
                                <div className="edit-wrap">
                                    <Icon type="edit" onClick={()=>{this.props.onEditBtnClick(this.props.contact);}}/>
                                </div>
                            </div>
                            <div className="card-btm">
                                <i className="fa fa-phone fa-lg" aria-hidden="true"></i>
                                <span className="contact-mobile">手机：{this.props.contact.mobile}</span>
                            </div>
                            <div className="card-avatar">
                                <Image href="#" alt="32x32" responsive circle
                                src="http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0" />
                            </div>
                            <div className="card-detail">
                                <p className="contact-birthday">
                                    <span className="detail-title">生日：</span>
                                    {this.props.contact.birthday}
                                </p>
                                <p className="contact-gender">
                                    <span className="detail-title">性别：</span>
                                    {gender.getDesc(this.props.contact.gender)}
                                </p>
                                <p>
                                    <span className="detail-title">证件：</span>
                                    {this.props.contact.id}
                                </p>
                                <p>
                                    <span className="detail-title">手机：</span>
                                    {this.props.contact.mobile}
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
