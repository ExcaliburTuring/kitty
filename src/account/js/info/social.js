/**
 * @author xiezhenzong
 */
import React from 'react';

import Input from 'input';

var Social = React.createClass({
	render: function() {
		var accountInfo = this.props.basicInfo.accountInfo;
		var accountSetting = this.props.basicInfo.accountSetting;
		return (
			<div >
				<p>绑定</p>
				<p>{accountSetting.wxname}</p>
            </div>
		);
	}
});

module.exports = Social;