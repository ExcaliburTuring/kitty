import React from 'react';
import ReactDOM from 'react-dom';
import { Col } from 'react-bootstrap';
import { AutoAffix } from 'react-overlays';

import home from './img/home.png';
import user from './img/user.png';
import shopping from './img/shopping.png';

import App from './js/app';

require('./css/application.less');

var Footer = React.createClass({

    render: function() {
        return (
            <div className="footer">
                <AutoAffix onAffixBottom={0} container={this.props.container}>
                    <Col sm={4} md={4}>
                        <div className="mylabel">
                            <i className="icon"><img src={home}/>
                            </i>
                            <p>优惠券</p>
                        </div>
                    </Col>
                    <Col sm={4} md={4}>
                        <div className="mylabel">
                            <i className="icon"><img src={user}/>
                            </i>
                            <p>优惠券</p>
                        </div>
                    </Col>
                    <Col sm={4} md={4}>
                        <div className="mylabel">
                            <i className="icon"><img src={shopping}/>
                            </i>
                            <p>优惠券</p>
                        </div>
                    </Col>
                </AutoAffix>
            </div>
        )
    }
})

ReactDOM.render(
    <div>
    	<App/>
        <Footer container={this}/>
    </div>
, document.getElementById('app'));
