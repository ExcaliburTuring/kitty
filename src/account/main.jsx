import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory';

import App from './js/app';
import Home from './js/home';
import Info from './js/info';
import Orders from './js/orders';
import Order from './js/order';
import Setting from './js/setting';

const browserHistory = useRouterHistory(createBrowserHistory)({ 
	queryKey: false,
	basename: '/account'
});

ReactDom.render(
	<Router history={browserHistory}>
		<Route path="/:accountid" component={App}>
			<IndexRoute component={Home}/>
	    	<Route path="/:accountid/info" component={Info} />
	    	<Route path="/:accountid/orders" component={Orders}>
	    		<Route path="/:accountid/orders/:orderid" component={Order}/>
	    	</Route>
	    	<Route path="/:accountid/setting" component={Setting}/>
  		</Route>
	</Router>,
	document.getElementById('app')
);
