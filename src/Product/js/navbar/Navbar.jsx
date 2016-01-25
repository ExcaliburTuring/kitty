import React from 'react';
import ReactDOM from 'react-dom';
import AMUIReact from 'amazeui-react';
import logo from '../../img/logo.png';
var Icon = AMUIReact.Icon;
var Image = AMUIReact.Image;
var Input = AMUIReact.Input;

import avatar from '../../img/avatar.png';


var Navbar = React.createClass({
	getInitialState: function(){
		return{
			avatar: "",
			userName: ""
		}
	},
	componentWillMount: function(){
		this.setState({
			avatar: {avatar},
			userName: "DuDuBird"
		});
	},
	render: function() {
		return(
		     <div className="hair" id="hair">
		        <div className="navbar">
		            <a href="/HomePage" className="navbar-logo">
		            	<img src={logo}/>
		            </a>
		        	<div className="navbar-desc">
		        		<a href="/" className="navbar-navi">
		            		目的地
		            </a>
		            <a href="/" className="navbar-navi">
		            		锦囊
		            </a>
		            <a href="/" className="navbar-navi">
		            		行程助手
		            </a>
		            <a href="/" className="navbar-navi">
		            		社区
		            </a>
		            <a href="/" className="navbar-navi">
		            		最世界·自由行
		            </a>
		            <a href="/" className="navbar-navi">
		            		酒店
		            </a>
		            <a href="/" className="navbar-navi">
		            		预定
		            </a>
		            <a href="/" className="navbar-navi">
		            		手机穷游
		            </a>
		        	</div>
		        	<div className="profile">
		        		<div className="searchLocation"><Input placeholder="  线路/目的地" icon="search" round/></div>
		        		<div className="avatar"><Image src={avatar}  width="33" height="33" circle/></div>
		        		<div className="userName">{this.state.userName} <Icon icon="caret-down" /></div>
		        	</div>
		        </div>
		    </div>
		)
	}
});

module.exports = Navbar;