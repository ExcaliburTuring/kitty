/**
 * @author xiezhenzong 
 */
export var url = {

    'wxLogin': '/wx/login',

    'account': '/account',
    'accountInfo': '/account/info',
	'basicinfo': '/account/basicinfo',
	'contacts': '/account/contacts',
    'coupons': '/account/coupons',
    'discountCodeValidate': '/account/discountcode/validate',
    'wxShareConfig': '/account/wxshareconfig',
    'postcardJoin': '/account/postcard/join',

    'travel': '/travel',
    'travels': '/routes',
	'route': '/travel/route',
	'group': '/travel/group',

	'indexHot': '/index/hot',
    'wapIndexHot': '/index/wap/hot',

    'order': '/order',
    'orderNew': '/order/new',
    'orderOrder': '/order/order',
    'orderRefundType': '/order/refundtype',
    'orderRefund': '/order/refund',
    'orderBrief': '/order/brief',
    'orderDiscount': '/order/discount',
    'orderPayResult': '/order/payresult',
    'orderHistory': '/order/history',

    'activityList': '/activity/list',
    'activity': '/activity'
};

export var defaultValue = {
	'imgPath': './img/',
	'routeImgPath': './img/route/',
    'updateAccountMsg': '更新用户信息失败，请稍后重试',
    'updateContactsMsg': '更新常用出行人信息失败，请稍后重试',
    'deleteContactsMsg': '删除常用出行人失败，请稍候重试',
    'newOrderMsg': '创建订单失败，请稍候重试',
    'cancelOrderMsg': '取消订单失败，请稍后重试',
    'hotline': '18510248672',

    getRouteImgPath: function(routeImgPath) {
        return this.routeImgPath + routeImgPath;
    }

};

export var error = {
	'1': '邮箱已经存在'
};

export var idType = {

    IDENTIFICATION: 0,

    PASSPORT: 1,

    H_PASSER: 2,

    T_PASSER: 3,

    getDesc: function(idType) {
    	if (idType === this.IDENTIFICATION) {
    		return "身份证";
    	} else if (idType === this.PASSPORT) {
    		return "护照";
    	} else if (idType === this.H_PASSER) {
    		return "港澳通行证";
    	} else if (idType === this.T_PASSER) {
    		return "台胞证";
    	} else {
    		return null;
    	}
    }

}

export var gender = {

    UNKNOW: 0,

    MALE: 1,

    FEMALE: 2,

    getDesc: function(gender) {
        if (gender === this.MALE) {
            return '男';
        } else if (gender === this.FEMALE) {
            return '女';
        } else {
            return '未知';
        }
    }

}

export var accountStatus = {

    WAIT_COMPLETE_INFO: 0,

    OK: 1,

    DELETE: 2
}

export var orderType = {

    CURRENT: 0,

    HISTORY: 1,

    VISIBLE: 2

}

export var orderStatus = {

    NEW: 0,

    WAITING: 1,

    PAYING: 2,

    PAID: 3,

    FINISH: 4,

    REFUNDING: 5,

    REFUNDED: 6,

    CANCEL: 7,

    TIMEOUT: 8,

    CLOSED: 9,

    getDesc: function(orderStatus) {
        switch(orderStatus) {
            case this.NEW:
                return '新订单';
            case this.WAITING:
                return '等待付款';
             case this.PAYING:
                return '付款中';
            case this.PAID:
                return '付款完成';
            case this.FINISH:
                return '开始旅行了';
            case this.CANCEL:
                return '订单取消';
            case this.TIMEOUT:
                return '付款超时';
            case this.CLOSED:
                return '行程取消'; 
            case this.REFUNDING:
                return '退款中';
            case this.REFUNDED:
                return '退款完成';
        };
    }
}

export var groupStatus = {

    OPEN: 1,

    STOP: 2,

    FULL: 3,

    TRAVELLING: 4,

    FINISHED: 5,

    getDesc: function(status) {
        if(status == this.OPEN){
            return "报名中";
        } else if (status == this.STOP) {
            return "暂停";
        } else if(status == this.FULL){
            return "已报满";
        } else if(status == this.TRAVELLING) {
            return "已出发";
        } else if(status == this.FINISHED) {
            return "报名结束";
        }
    }

}

export var couponStatus = {

    CREATED: 0,

    TIMEOUT: 1,

    USED: 2,

    getDesc: function(status) {
        if(status == this.CREATED){
            return "可用";
        } else if(status == this.TIMEOUT){
            return "已过期";
        } else if (status == this.USED) {
            return "已使用"
        }
    },

    isUsable: function(status) {
        return status == this.CREATED;
    }
}

export var refundStatus = {
     /**
     * 退款产生
     */
    CREATED: 0,

    /**
     * 确认退款
     */
    CONFIRMED: 1,

    /**
     * 完成退款
     */
    REFOUNDED: 2,

    getDesc: function(status) {
        if (status == this.CREATED) {
            return "退款申请中";
        } else if (status == this.CONFIRMED) {
            return "退款已确认，等待返还";
        } else if (status == this.REFOUNDED) {
            return "退款完成";
        }
    }
}

export var refundType = {

    LONG_PCT_95: 0,

    LONG_PCT_80: 1,

    LONG_PCT_50: 2,

    LONG_PCT_20: 3,

    SHORT_PCT_100: 4,

    SHORT_PCT_80: 5,

    SHORT_PCT_50: 6,

    SHORT_PCT_20: 7,

    getDesc: function(type) {
        switch(type) {
            case this.LONG_PCT_95:
                return '出发前21天及以上退款，返还旅游费用的95%';
            case this.LONG_PCT_80:
                return '出发前20天至8天退款，返还旅游费用的80%';
             case this.LONG_PCT_50:
                return '出发前7天至1天退款，返还旅游费用的50%';
            case this.LONG_PCT_20:
                return '集合日当天退款，返还旅游费用的20%';
            case this.SHORT_PCT_100:
                return '出发前7天及以上退款，全额返还';
            case this.SHORT_PCT_80:
                return '出发前6天至3天退款，返还旅游费用的80%';
            case this.SHORT_PCT_50:
                return '出发前2天至1天退款，返还旅游费用的50%';
            case this.SHORT_PCT_20:
                return '集合日当天退款，返还旅游费用的20%'; 
        };
    }
}

export var priceUtil = {

    getPrice: function(priceStr) {
        return +priceStr.slice(1).replace(/,/g, '') * 1000;
    },

    getPriceStr: function(price) {
        if (price <= 0) {
            return '￥0'
        }
        var rawPrice = price / 1000;
        return `￥${rawPrice.toFixed(0)}`
    },

    /**
     * 获取原始价格
     */
    getOrderPrice: function(travelGroup, selectTravellers) {
        var count = selectTravellers.length; 
        return this.getPriceStr(this.getPrice(travelGroup.price) * count);
    },

    /**
     * 获取优惠价格
     */
    getOrderDiscountPrice: function(policyDiscount, coupon, studentDiscount) {
        return this.getPriceStr(
                this.getPrice(policyDiscount ? policyDiscount.value : '￥0') 
                + this.getPrice(coupon ? coupon.value : '￥0')
                + this.getPrice(studentDiscount ? studentDiscount.value : '￥0'));
    },

    /**
     * 根据订单信息获取优惠价格
     */
    getOrderDiscountPrice1: function(orderInfoData) {
        var studentDiscount = '￥0';
        if (orderInfoData.student) {
            studentDiscount = this.getPrice(orderInfoData.student.value) * orderInfoData.orderInfo.studentCount;
            studentDiscount = this.getPriceStr(studentDiscount);
        }
        return this.getOrderDiscountPrice(
                orderInfoData.policy,
                orderInfoData.coupon, 
                {'value': studentDiscount});
    },

    /**
     * 获取实际价格
     */
    getOrderActualPrice: function(orderPrice, orderDiscountPrice) {
        return this.getPriceStr(
                    this.getPrice(orderPrice)
                    - this.getPrice(orderDiscountPrice));
    }
}