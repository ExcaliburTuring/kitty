import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';
import Navbar from 'navbar';
import Footer from 'footer';

require('./css/application.less');

ReactDOM.render(
	<div className="head" id="head">
		<Navbar />
		<Footer />
	</div>, 
	document.getElementById('app')
);