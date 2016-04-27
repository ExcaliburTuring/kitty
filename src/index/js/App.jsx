import React from 'react';

import Banner from './banner';
import activity1 from '../img/Leader.jpg';
import activity2 from '../img/Postcard.jpg';
import p11 from "../img/p11.jpg";
import p21 from "../img/p21.jpg";
import p31 from "../img/p31.jpg";
import p41 from "../img/p41.jpg";
import p12 from "../img/p12.png";
import p22 from "../img/p22.png";
import p13 from '../img/p13.png';
import p23 from '../img/p23.png';
import worldmap from "../img/worldmap.png";

var App = React.createClass({
    render: function() {
        var world = {backgroundImage: "url(" + worldmap + ")"};
        return (
        	<div className="content">
            	<Banner />
            	<div className="Separator">
            		<div className="leftline" />
            		<div className="rightline" />
            		<div className="middle"><a>海逍遥旅行工作室</a></div>
                    <div className="middle"><br/><i className="fa fa-angle-double-down"/></div>

            	</div>
        		<div className="products">
        			<div className="line1">
        				<div className="route-left">
        					<img src={p11} />
                            <div className="opacity"><img src={p12} /></div>
                            <div className="days"><img src={p13} /></div>
                            <div className="product-intro"><a>七天：畅游大西北</a></div>
        				</div>
        				<div className="route-right">
        					<img src={p21} />
                            <div className="opacity"><img src={p22} /></div>
                            <div className="days"><img src={p23} /></div>
                            <div className="product-intro"><a>七天：大草原上的金色童话</a></div>
        				</div>
        			</div>
                    <div className="line1">
                        <div className="route-left">
                            <img src={p31} />
                            <div className="opacity"><img src={p12} /></div>
                            <div className="days"><img src={p13} /></div>
                            <div className="product-intro"><a>三天：带你去看油菜花</a></div>
                        </div>
                        <div className="route-right">
                            <img src={p41} />
                            <div className="opacity"><img src={p22} /></div>
                            <div className="days"><img src={p23} /></div>
                            <div className="product-intro"><a>三天：蓬莱-青岛</a></div>
                        </div>
                    </div>
        		</div>
                <div className="activities">
                    <div className="activity-container">
                        <div className="left-a">
                            <img src={activity1} />
                        </div>
                        <div className="right-a">
                            <img src={activity2} />
                        </div>
                    </div>
                </div>
                <div className="others" style={world}>
                    <div className="Separator">
                        <div className="leftline" />
                        <div className="rightline" />
                        <div className="middle"><a>关于我们</a></div>
                    </div>
                    <div className="aboutus">
                        <a>我们坚信，在我们的星球有着很多淳朴真实的奇妙地方
                        <br/>我们要做的不仅是发现这些地方,同时希望更多的人走出去，体验这样真实的旅行
                        <br/>只要你愿意敞开心扉，带着接纳这个世界的心,旅行就会带给你未所期待的东西
                        <br/>未来的某一天,我们希望和你一起徒步在仙乃日神山的朝圣之路,在拉萨街头的茶馆里喝着甜茶,或是在内蒙古草原上一同仰望星空
                        <br/>这一切的一切，都在于旅行
                        <br/>只有旅行才能让我们充满光和热。</a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = App;