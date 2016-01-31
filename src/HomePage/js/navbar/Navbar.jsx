import React from 'react';
import ReactDOM from 'react-dom';
import AMUIReact from 'amazeui-react';
import logo from '../../img/logo.png';
var Topbar = AMUIReact.Topbar;
var CollapsibleNav = AMUIReact.CollapsibleNav;
var Nav = AMUIReact.Nav;
var NavItem = AMUIReact.NavItem;


var Navbar = React.createClass({
	render: function() {
		return(
		     <div className="navbar">
		        <div className="navbar-header">
		            <a href="/" className="navbar-logo">
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
		        </div>
		    </div>
		)
	}
});

module.exports = Navbar;