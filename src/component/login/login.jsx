/**
 * @author xiezhenzong 
 */
import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

import './login.less';

var Login = React.createClass({

    render: function() {
        return (
            <div className="login-container">
                <Jumbotron>
                    <h2>Soooooorry</h2>
                    <p>尊敬的用户，对不起！由于您尚未登陆，故无法访问当前网页。</p>
                    <p>如您需继续访问，请先
                        <Button bsStyle="link" href="/wx/login" target="_blank">登陆</Button>
                        <span className="login-addon-text">（海逍遥使用微信直接登陆，安全可靠！）</span>
                    </p>
                </Jumbotron>
            </div>
        );
    }
});

module.exports = Login;
