/**
 * @author xiezhenzong
 */
import React from 'react';
import Reflux from 'reflux';

import AccountBasicInfo from 'account_basic_info';

var Contacts = React.createClass({

	 mixins: [Reflux.connect(AccountBasicInfo.store, 'basicInfo')],

	render: function() {
		return (
			<div >
				<div>
					<p>这里是全部的联系人信息</p>
				</div>
            </div>
		);
	}
});

module.exports = Contacts;
