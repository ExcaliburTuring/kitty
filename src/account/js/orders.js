/**
 * @author xiezhenzong
 */
import React from 'react';

var Orders = React.createClass({
	render() {
		return (
			<div >
				<div>
					<p>这里是全部的订单信息</p>
				</div>
				{this.props.children}
            </div>
		);
	}
});

module.exports = Orders;