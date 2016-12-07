import React from 'react';

import qrCode from '../img/new_activity_qrcode.png';

var App = React.createClass({

    render: function() {
        return (
            <div className="container newactivity">
                <p className="bg-info">请使用微信扫一扫扫描下方二维码在手机上参加活动!
                    <button type="button" className="btn btn-link" onClick={()=>{window.close()}}>我不想参加</button>
                </p>
                <img className="img-responsive" src={qrCode}/>
            </div>
        );
    }
});

module.exports = App;
