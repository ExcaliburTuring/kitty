/**
 * @author xiezhenzong 
 */
export var url = {
	'basicinfo': '/account/basicinfo',
	'validateEmail': '/account/validateEmail',
	'validateTell': '/account/validateTell',
	'login': '/account/login',
	'register': '/account/register',
	'contacts': '/account/contacts',
	'accountOrders': '/account/orders',
	'travel': '/travel',
	'route': '/travel/route',
	'group': '/travel/group',
	'indexHot': '/index/hot',
    'info': '/account/info',
    'groupinfo': '/order/groupinfo',
    'orderBrief': '/order/brief'
};

export var defaultValue = {
	'accountUrl': '/account',
	'imgPath': './img/',
	'routeImgPath': './img/route/'
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
