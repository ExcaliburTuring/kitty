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
    'info': '/account/info'
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