import React from 'react';
import ReactDOM from 'react-dom';

import Navbar from 'navbar';
import Footer from 'footer';
import App from './js/app';

require('./css/application.less');

ReactDOM.render(
     <div>
        <Navbar fixedTop/>
        <App />
        <Footer />
    </div>
, document.getElementById('app'));
