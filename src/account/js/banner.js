/**
 * @author xiezhenzong
 */
import React from 'react';

import { defaultValue } from 'config';

function makeUrl(accountid) {
    return defaultValue.registerSuccessRedirect + '/' + accountid;
}

var Banner = React.createClass({
    render() {
        var url = makeUrl(this.props.accountid);
        return (
            <div className="jumbotron">
				<h1>Hello, world!</h1>
				<p>...</p>
				<p><a className="btn btn-primary btn-lg" href={url} role="button">Learn more</a></p>
			</div>
        );
    }
});
module.exports = Banner;
