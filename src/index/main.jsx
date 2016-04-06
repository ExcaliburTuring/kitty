import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';
<<<<<<< HEAD
import Navbar from './js/navbar/Navbar';
import AMUIReact from 'amazeui-react';
var Sticky = AMUIReact.Sticky;
var ScrollSpyNav = AMUIReact.ScrollSpyNav;
var nav = AMUIReact.nav;
var Panel = AMUIReact.Panel;


require('./css/application.less');

ReactDOM.render(<div className="head" id="head"><Navbar/><App/></div>, document.getElementById('app'));
=======
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
>>>>>>> refs/remotes/buterfleoge/master
