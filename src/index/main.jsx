import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';
import Navbar from '../component/narbar/navbar';
import Icon from 'icon';

require('./css/application.less');

ReactDOM.render(
	<div className="head" id="head">
		<Navbar/>
		<Icon type="circle_error"/>
		<Icon type="circle_tick"/>
		<Icon type="circle_tick_filled"/>
		<Icon type="guthub"/>
	</div>, 
	document.getElementById('app')
);