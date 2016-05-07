/**
 * @author xiezhenzong
 */
import React from 'react'; 
import Reflux from 'reflux';
import { Col } from 'react-bootstrap';

import Rabbit from 'rabbit';
import { defaultValue, url } from 'config';
import GroupList from './index/groups';
import UnpayedList from './index/unpayeds';

var AccountInfo = Rabbit.create(url.info); 

var Index = React.createClass({

    mixins: [Reflux.connect(AccountInfo.store, 'info')],

    getInitialState: function() {
        AccountInfo.actions.load();
        return {
            'info': {
                'status': 0,
                'login': false,
                'accountInfo': [],
                'accountSetting': [],
                'orderInfo': [],
                'groupInfo': [],
                'unPayed': []
            }
        };
    },

    render: function() {
        var info = this.state.info;
        var { accountid } = this.props.params;
        var ordersUrl = `${defaultValue.accountUrl}/${accountid}/orders`;
        var infoUrl = `${defaultValue.accountUrl}/${accountid}/info`;
       

        return (
            <div className="my-container">
                <div className="container">
                    <Col md={3}>
                        <div className="profiles">
                            <div className="">
                                <p><i className="fa fa-male"/>{info.accountInfo.name}</p>
                                <p><i className="fa fa-mobile"/>{info.accountInfo.mobile}</p>
                                <p><i className="fa fa-birthday-cake"/>{info.accountSetting.birthday}</p>
                            </div>
                            <a href={infoUrl} activeClassName="active">编辑资料</a>
                        </div>
                    </Col>
                    <Col md={9}>
                        <div className="title">
                            <Col md={5}>
                                <div className="welcome">
                                    欢迎回来，{info.accountInfo.name}
                                </div>
                            </Col>
                            <div className="messages">
                                <Col md={3}>
                                    <span className="bar">未完成订单：</span>
                                    <span className="unfinished">{info.orderInfo.unfinished}</span>
                                </Col>
                                <Col md={3}>
                                    <span className="bar">历史订单：</span>
                                    <span className="histories">{info.orderInfo.histories}</span>
                                </Col>
                            </div>
                        </div>
                        <div className="unfinisheds">
                            <UnpayedList unPayed={info.unPayed}/>
                            <GroupList groupInfo={info.groupInfo}/>
                        </div>
                    </Col>
                </div>
            </div>
        );
    }
});

module.exports = Index;
