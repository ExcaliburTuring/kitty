/**
 * @author xiezhenzong 
 */
export var url = {

    'wxLogin': '/wx/login',

    'account': '/account',
    'accountInfo': '/account/info',
	'basicinfo': '/account/basicinfo',
	'contacts': '/account/contacts',

    'travel': '/travel',
	'route': '/travel/route',
	'group': '/travel/group',

	'indexHot': '/index/hot',

    'order': '/order',
    'orderNew': '/order/new',
    'orderOrder': '/order/order',
    'orderRefund': '/order/refund',
    'orderBrief': '/order/brief',
    'orderDiscount': '/order/discount',
    'orderDiscountCode': '/order/discountcode'
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
	 /**
     * 身份证
     */
    IDENTIFICATION: 0,

    /**
     * 护照
     */
    PASSPORT: 1,

    /**
     * 港澳通行证
     */
    H_PASSER: 2,

    /**
     * 台胞证
     */
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

    /**
     * 未知
     */
    UNKNOW: 0,

    /**
     * 男
     */
    MALE: 1,

    /**
     * 女
     */
    FEMALE: 2,

    getDesc: function(gender) {
        if (gender === this.UNKNOW) {
            return '未知';
        } else if (gender === this.MALE) {
            return '男';
        } else if (gender === this.FEMALE) {
            return '女';
        } else {
            return null;
        }
    }

}

export var accountStatus = {
     /**
     * 刚注册
     */
    WAIT_COMPLETE_INFO: 0,

    /**
     * 账户正常
     */
    OK: 1,

    /**
     * 账户注销
     */
    DELETE: 2
}

export var orderType = {

    /**
     * current
     */
    CURRENT: 0,

    /**
     * history
     */
    HISTORY: 1,

    /**
     * visible
     */
    VISIBLE: 2

}

export var orderStatus = {

    /**
     * 新订单
     */
    NEW: 0,

    /**
     * 选择优惠, 前端使用的临时状态
     */
    DISCOUNT_SELECT: 'DISCOUNT_SELECT',

    /**
     * 生成等待付款
     */
    WAITING: 1,

     /**
     * 付款中
     */
    PAYING: 2,

    /**
     * 付款到账
     */
    PAID: 3,

    /**
     * 开始旅行
     */
    FINISH: 4,

    /**
     * 取消
     */
    CANCEL: 5,

    /**
     * 超时
     */
    TIMEOUT: 6,

    /**
     * 行程取消
     */
    CLOSED: 7,

    /**
     * 退款中
     */
    REFUNDING: 8,

    /**
     * 退款
     */
    REFUNDED: 9,

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
                return '付款超时，请重新下订单';
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

    FULL: 3,

    TRAVELLING: 4,

    FINISH: 5,

    getDesc: function(status) {
        if(status == this.OPEN){
            return "报名中";
        } else if(status == this.FULL){
            return "已报满";
        } else if(status == this.TRAVELLING) {
            return "已出发";
        } else if(status == this.FINISHED) {
            return "报名结束";
        }
    }

}

export var priceUtil = {

    getPrice: function(priceStr) {
        return +priceStr.slice(1).replace(/,/g, '') * 1000;
    },

    getPriceStr: function(price) {
        var rawPrice = price / 1000;
        return `￥${rawPrice.toFixed(0)}`
    }

}