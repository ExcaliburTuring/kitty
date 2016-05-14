/**
 * @author xiezhenzong 
 */
export var url = {
	'basicinfo': '/account/basicinfo',
	'contacts': '/account/contacts',

	'route': '/travel/route',
	'group': '/travel/group',

	'indexHot': '/index/hot',

    'order': '/order/info',
    'groupinfo': '/order/groupinfo',
    'orderBrief': '/order/brief',

    'routeList': '/routes/info'
};

export var defaultValue = {
	'accountUrl': '/account',
	'imgPath': './img/',
	'routeImgPath': './img/route/',
    'updateAccountMsg': '更新用户信息失败，请稍后重试',
    'updateContactsMsg': '更新常用出行人信息失败，请稍后重试',
    'deleteContactsMsg': '删除常用出行人失败，请稍候重试'
};

export var error = {
	'1': '邮箱已经存在'
};

export var idType = {
	 /**
     * 身份证
     */
    IDENTIFICATION: 'IDENTIFICATION',

    /**
     * 护照
     */
    PASSPORT: 'PASSPORT',

    /**
     * 港澳通行证
     */
    H_PASSER: 'H_PASSER',

    /**
     * 台胞证
     */
    T_PASSER: 'T_PASSER',

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
    UNKNOW: 'UNKNOW',

    /**
     * 男
     */
    MALE: 'MALE',

    /**
     * 女
     */
    FEMALE: 'FEMALE',

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
    WAIT_COMPLETE_INFO: 'WAIT_COMPLETE_INFO',

    /**
     * 账户正常
     */
    OK: 'OK',

    /**
     * 账户注销
     */
    DELETE: 'DELETE'
}

export var orderStatus = {

    /**
     * 新订单
     */
    NEW: 'NEW',

    /**
     * 生成等待付款
     */
    WAITING: 'WAITING',

    /**
     * 取消
     */
    CANCEl: 'CANCEl',

    /**
     * 超时
     */
    TIMEOUT: 'TIMEOUT',

    /**
     * 取消支付
     */
    CANCELPAYMENT: 'CANCELPAYMENT',

    /**
     * 已退款
     */
    REFOUNDED: 'REFOUNDED',

    /**
     * 付款中
     */
    PAYING: 'PAYING',

    /**
     * 付款到账
     */
    PAID: 'PAID',

    /**
     * 退款中
     */
    REFOUNDING: 'REFOUNDING',

    /**
     * 开始旅行
     */
    FINISH: 'FINISH',

    /**
     * 行程取消
     */
    CLOSED: 'CLOSED'
}

