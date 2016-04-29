import React from 'react';
import ReactDOM from 'react-dom';
import Body from './js/body/Body';
import Head from './js/face/Face';
import Navbar from 'navbar';
import Footer from 'footer';

require ('./css/app_scaffolding.less');

ReactDOM.render(
	<div>
		<Navbar />
		<Head/>
		<div className="body" id="body">
			<div className="maininfo">
				<Body/>
			</div>
		</div>
		<Footer />
	</div>
, document.getElementById('app'));