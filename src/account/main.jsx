/**
 * @author xiezhenzong
 */
import React from 'react';
import ReactDom from 'react-dom';

import Navbar from 'navbar';
import Footer from 'footer';
import App from './js/app';

require('./css/application.less');

ReactDom.render(
	<div>
        <Navbar fixedTop/>
        <App/>
        <Footer/>
    </div>,
	document.getElementById('app')
);
