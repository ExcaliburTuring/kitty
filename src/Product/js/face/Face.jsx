/**
 * @author zhaowei
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Slider from './slider';
import { Col,Navbar } from 'react-bootstrap';

var Face = React.createClass({
	getInitialState: function() {
		return{
			duration: "",
			title: "",
			intro: "",
			route: "",
			limit: "",
			price: ""
		}
	},
	componentWillMount: function() {
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
		        <Col xs={6} md={3}>
		        	<div className="relative">
			            <div className="duration inline">{this.state.duration}<br/><span className="day">DAYS</span></div>
			            <h1 className="title inline">{this.state.title}</h1>
			            <h3 className="intro">{this.state.intro}</h3>
			            <h4 className="intro inline">行程  </h4>
			            <h4 className="route inline">{this.state.route}</h4>

			            <div className="bottom">
				            <div className="share"></div>
				            <h4 className="limit">本次旅行人数上限 {this.state.limit}人</h4>
				            <h2 className="price">￥{this.state.price}</h2>
				            <button className="time">时间&价格</button>
			            </div>
		        	</div>
		        </Col>
		        <Col xs={6} md={9}>
		        	<Slider/>
			    </Col>
			</div>
		)
	}
});

 module.exports=Face;
