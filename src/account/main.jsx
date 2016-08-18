import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';

import App from './js/app';
import Index from './js/index';
import Info from './js/info';
import Orders from './js/orders';

require('./css/application.less');

const browserHistory = useRouterHistory(createBrowserHistory)({ 
	queryKey: false,
	basename: '/account'
});

ReactDom.render(
	<Router history={browserHistory}>
		<Route path="/:accountid" component={App}>
			<IndexRoute component={Index}/>
			<Route path="info" component={Info} />
	    	<Route path="orders" component={Orders} />
  		</Route>
	</Router>,
	document.getElementById('app')
);
