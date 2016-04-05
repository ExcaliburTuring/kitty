import React from 'react';
import ReactDOM from 'react-dom';
import Body from './js/body/Body';
import Head from './js/face/Face';
import Navbar from './js/navbar/Navbar';

ReactDOM.render(
	<div>
		<Navbar/>
		<Head/>
		<Body/>
	</div>
	, document.getElementById('app'));