webpackJsonp([10],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(87);


/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: Administrator
	* @Date:   2017-06-09 10:52:11
	* @Last Modified by:   halfgod
	* @Last Modified time: 2017-06-23 10:21:34
	*/

	'use strict';
	__webpack_require__(88);
	__webpack_require__(90);
	var _mm = __webpack_require__(8);

	$(function(){
		var type = _mm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success').show();
		
		if(type === 'payment'){
			var $orderNumber = $element.find('.order-number');
			$orderNumber.attr('href' , $orderNumber.attr('href')+_mm.getUrlParam('orderNumber'));
		}
	});

/***/ }),

/***/ 88:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: Rosen
	* @Date:   2017-05-17 11:26:25
	* @Last Modified by:   Rosen
	* @Last Modified time: 2017-05-17 11:26:46
	*/

	'use strict';
	__webpack_require__(91);

/***/ }),

/***/ 91:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});