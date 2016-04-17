module.exports = {
	'status': 0,
	'orders': [{
		'orderid': 1,
		'accountid': 1,
		'groupid': 1,
		'status': 0,
		'count': 1,
		'price': 10000,
		'actualPrice': 9000,
		'isArgeementOk': false
	}, {
		'orderid': 2,
		'accountid': 1,
		'groupid': 2,
		'status': 1,
		'count': 2,
		'price': 10000,
		'actualPrice': 7000,
		'isArgeementOk': true
	}],
	'travellers': {
		1: [{
			'travellerid': 1,
			'orderid': 1,
			'accountid': 1,
			'contactid': 0,
			'status': 0,
			'roommate': null,
			'refound': 0
		}],
		2: [{
			'travellerid': 2,
			'orderid': 2,
			'accountid': 1,
			'contactid': 0,
			'status': 0,
			'roommate': "xiezhenzong_1",
			'refound': 0
		}, {
			'travellerid': 3,
			'orderid': 2,
			'accountid': 1,
			'contactid': 1,
			'status': 4,
			'roommate': 'xiezhenzong',
			'refound': 8000
		}]
	},
	'discounts': {
		1: [],
		2: [{
			'discountid': 1,
			'orderid': 2,
			'type': 1,
			'discountCode': 111,
			'discountPrice': 2000
		}, {
			'discountid': 2,
			'orderid': 2,
			'type': 2,
			'discountCode': 222,
			'discountPrice': 1000
		}]
	}
};