/**
 * @author xiezhenzong
 */
import React from 'react';

import Input from 'input';

var Avatar = React.createClass({
	render: function() {
		var accountInfo = this.props.basicInfo.accountInfo;
		var accountSetting = this.props.basicInfo.accountSetting;
		return (
			<div >
				<div>
					<img width="120" height="120" alt="头像" src={accountSetting.avatarUrl}/>
				</div>
            </div>
		);
	}
});

module.exports = Avatar;