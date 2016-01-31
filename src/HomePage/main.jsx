import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';
import Navbar from './js/navbar/Navbar';

require('./css/application.less');



ReactDOM.render(<div className="head" id="head"><Navbar/><App/></div>, document.getElementById('app'));