/**
 * @authro xiezhenzong
 */
import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

var NotFound = React.createClass({

    render: function() {
        return (
            <div className="notfound-container">
                <Jumbotron>
                    <h2>Soooooorry</h2>
                    <p>尊敬的用户，对不起！您访问的网页并不存在。</p>
                    <p>请重新输入地址，或直接返回
                        <Button bsStyle="link" href="/" >首页</Button>
                    </p>
                </Jumbotron>
            </div>
        );
    }

});

module.exports = NotFound;
