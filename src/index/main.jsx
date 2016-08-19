import React from 'react';
import ReactDOM from 'react-dom';

import App from './js/app';
import Navbar from 'navbar';
import Footer from 'footer';

require('./css/application.less');

ReactDOM.render(
    <div>
    	<Navbar name="index" fixedTop/>
    	<App />
        <Footer />
    </div>,
    document.getElementById('app')
);
