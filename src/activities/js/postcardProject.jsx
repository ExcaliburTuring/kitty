import React from 'react';

import Sun from '../img/sun.svg';
import Moon from '../img/moon.svg';


var App = React.createClass({
    render: function() {
        return (
            <div className="container">
                <div className="table">
                    <div className="title">
                        明信片计划<br/>
                        <img className= "icon" src={Sun}/>
                    </div>
                    <h6>"这个世界上有高高在上的规则，也有自由奔放的灵魂。"<br/><br/>
                    </h6>
                    <h5>
                        除了生活的苟且<br/>
                        心里满满是“诗与远方”<br/>
                        然而总有那么些事情不随人愿<br/>
                        或是被小伙伴无情抛弃，或是该死的老板又让加班<br/><br/>
                    </h5>
                    <h5>
                        去不了就只剩叹息和遗憾？<br/>
                        NO！<br/>
                        明信片计划，安慰每个心心念念的你<br/><br/>
                    </h5>
                    <h2>如何参与：</h2>
                    <h5>1.选择一条你喜欢的路线（或是召集小伙伴，或是想去去不了，或是觉得好美）<br/>
                        2.分享到朋友圈并加32字以上感言（为啥是32？杨坤一年都有32场演唱会呢！）<br/>
                        3.联系客服，坐等收明信片~"}<br/><br/>
                    </h5>
                    <h3>规则说明：</h3>
                    <h4>1.明信片一定会在你选择的路线上发出<br/>
                        （比如分享《大西北》，那么明信片会在嘉峪关、敦煌、茶卡盐湖等盖上邮戳，向你飞奔而来。）<br/>
                        2.收到的可能是一张，也可能是一整套！取决于感言动人程度哦！<br/>
                        3.每人每月仅限一次哦！太多了逍遥君会写到手抽筋的...<br/><br/>
                    </h4>
                    <h2>注意事项：</h2>
                    <h5>明信片寄出的时候客服会提醒滴<br/>
                        邮政到达概率很高，但不会电话通知。保证填写地址正确，以及常去学校、小区传达室看看。<br/>
                        明信片是什么样子的呢？<br/><br/>
                    </h5>
                    <div className="end">明信片是什么样子的呢？<br/>
                    </div>
                    <div className="title">
                        <img className= "icon" src={Moon}/>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = App;
