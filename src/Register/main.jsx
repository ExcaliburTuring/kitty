import React from 'react';
import ReactDOM from 'react-dom';

import App from './js/app';

require('./css/application.less');

ReactDOM.render(
 	<div> 
		<App/>
	</div>
, document.getElementById('app'));
