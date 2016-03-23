import React from 'react';
import ReactDOM from 'react-dom';
import AMUIReact from 'amazeui-react';
import logo from '../../img/logo.png';
import Slider from './slider';

var Icon = AMUIReact.Icon;
var Badge = AMUIReact.Badge;
var Sticky = AMUIReact.Sticky;
var ScrollSpyNav = AMUIReact.ScrollSpyNav;
var Nav = AMUIReact.Nav;


module.exports = React.createClass({
	getInitialState: function(){
		return{
			duration: "",
			title: "",
			intro: "",
			route: "",
			limit: "",
			price: ""
		}
	},
	componentWillMount: function(){
		this.setState({
			duration: "7",
			title: "锡兰的微笑",
			intro: "从茶园到大海(Original)",
			route: "尼干布－狮子岩－丹布勒－康提－努沃勒埃利亚－哈普塔勒－乌达瓦拉国家公园－坦加勒－马特勒－加勒－科伦坡",
			limit: "16",
			price: "5980 - 6480"
		});
	},
	render: function() {
		return(
		     <div className="face" id="face">
		        <div className="brief">
		        	<div className="relative">
			            <div className="duration inline">{this.state.duration}<br/><span className="day">DAYS</span></div>
			            <h1 className="title inline">{this.state.title}</h1>
			            <h3 className="intro">{this.state.intro}</h3>
			            <h4 className="intro inline">行程  </h4>
			            <h4 className="route inline">{this.state.route}</h4>

			            <div className="bottom">
				            <div className="share"><Icon button amStyle="danger" icon="qq"/>    <Icon button amStyle="success" icon="weixin"/>    <Icon button amStyle="warning" icon="weibo"/></div>
				            <h4 className="limit">本次旅行人数上限 {this.state.limit}人</h4>
				            <h2 className="price">￥{this.state.price}</h2>
				            <button className="time">时间&价格</button>
			            </div>
		        	</div>
		        </div>
		        <Slider/>
	            <Sticky animation="stwork">
			      <ScrollSpyNav offsetTop={0}>
			        <nav className="scrollspy-nav" data-am-scrollspy-nav="{offsetTop: 45}" data-am-sticky>
			          <ul>
			            <li><a href="#app">路线简介</a></li>
			            <li><a href="#body">行程</a></li>
			            <li><a href="#arm">注意事项</a></li>
			            <li><a href="#hand">费用说明</a></li>
			            <li><a href="#foot">报名</a></li>
			          </ul>
			        </nav>
			      </ScrollSpyNav>
			    </Sticky>
		    </div>
		)
	}
});
