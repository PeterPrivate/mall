webpackJsonp([9],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(83);


/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: Administrator
	* @Date:   2017-06-08 09:52:21
	* @Last Modified by:   Administrator
	* @Last Modified time: 2017-06-10 22:26:51
	*/

	'use strict';
	__webpack_require__(3);
	var _mm = __webpack_require__(8);
	var _user = __webpack_require__(12)
	var _cart = __webpack_require__(13)
	//导航

	var nav = {
		init : function(){
			this.bindEvent();
			this.loadUserInfo();
			this.loadCartCount();
			return this;

		},
		bindEvent : function(){
			//登录点击事件
			$('.js-login').click(function(){
				_mm.doLogin();
			});
			//注册点击事件
			$('.js-register').click(function(){
				window.location.href = './user-register.html';
			});
			//退出点击事件
			$('.js-logout').click(function(){
				_user.logout(function(res){
					window.location.reload();
				},function(errMsg){
					_mm.errTips(errmsg);
				});
			});


		},
		//加载用户信息
		loadUserInfo : function(){
			_user.checkLogin(function(res){
	$('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
			},function(errMsg){
				//do nothing
			});
		},
		loadCartCount : function(){
			_cart.getCartCount(function(res){
				$('.nav .cart-count').text(res || 0);
			},function(errMsg){
				$('.nav .cart-count').text(0);

			});
		}

	};
	module.exports = nav.init();

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: Administrator
	* @Date:   2017-06-08 12:40:34
	* @Last Modified by:   halfgod
	* @Last Modified time: 2017-06-12 21:19:41
	*/

	'use strict';
	var _mm = __webpack_require__(8)
	var _user = {
		//用户注册
		register : function(userInfo,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/user/register.do'),
				data	: userInfo,
				method 	: 'POST',
				success	: resolve,
				error 	: reject
	});
		},
		//用户名验证
		checkUsername : function(username,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/user/check_valid.do'),
				data	: {
					          type : 'username',
					          str  : username
					      },
				method 	: 'POST',
				success	: resolve,
				error 	: reject
	});
		},
		//用户登录
		login : function(userInfo,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/user/login.do'),
				data	: userInfo,
				method 	: 'POST',
				success	: resolve,
				error 	: reject
	});
		},
		//检查登录状态
		checkLogin : function(resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/user/get_user_info.do'),
				method 	: 'POST',
				success	: resolve,
				error 	: reject
	        });
		},
		//获取密码重置问题
		getQuestion : function(username,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/user/forget_get_question.do'),
				data	: {
					username : username
				},
				method 	: 'POST',
				success	: resolve,
				error 	: reject
	        });
		},
		//检查密码提示问题答案
		checkAnswer : function(userInfo,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/user/forget_check_answer.do'),
				data	: userInfo,
				method 	: 'POST',
				success	: resolve,
				error 	: reject
	        });
		},
		//重置密码
		resetPassword : function(userInfo,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/user/forget_reset_password.do'),
				data	: userInfo,
				method 	: 'POST',
				success	: resolve,
				error 	: reject
	        });
		},
		//获取用户信息
		getUserInfo : function(resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/user/get_information.do'),
				method 	: 'POST',
				success	: resolve,
				error 	: reject
	        });
		},
		//更新用户信息
		updateUserInfo : function(userInfo,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/user/update_information.do'),
				data    : userInfo,
				method 	: 'POST',
				success	: resolve,
				error 	: reject
	        });
		},
		// 登入状态跟新密码
		updateUserPass : function(userInfo,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/user/reset_password.do'),
				data    : userInfo,
				method 	: 'POST',
				success	: resolve,
				error 	: reject
	        });
		},
		//登出
		logout : function(resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/user/logout.do'),
				method 	: 'POST',
				success	: resolve,
				error 	: reject
	});
		},
	}

	module.exports = _user;

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: Administrator
	* @Date:   2017-06-08 12:57:28
	* @Last Modified by:   halfgod
	* @Last Modified time: 2017-06-16 09:42:59
	*/

	'use strict';
	var _mm = __webpack_require__(8)
	var _cart = {
		
		//过去购物车数量
		getCartCount : function(resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/cart/get_cart_product_count.do'),
				success	: resolve,
				error 	: reject
	});
		},
		addToCart : function(productInfo,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/cart/add.do'),
				data    : productInfo,
				success	: resolve,
				error 	: reject
	});
		},
		getCartList : function(resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/cart/list.do'),
				
				success	: resolve,
				error 	: reject
	});
		},
		selectProduct :  function(productId,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/cart/select.do'),
				data    : {
					productId : productId
				},
				success	: resolve,
				error 	: reject
	});
		},
		unselectProduct :  function(productId,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/cart/un_select.do'),
				data    : {
					productId : productId
				},
				success	: resolve,
				error 	: reject
	});
		},
		unselectAllProduct :  function(resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/cart/un_select_all.do'),
				success	: resolve,
				error 	: reject
	});
		},
		selectAllProduct :  function(resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/cart/select_all.do'),
				success	: resolve,
				error 	: reject
	});
		},
		updateProduct :  function(productInfo,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/cart/update.do'),
				data    : productInfo,
				success	: resolve,
				error 	: reject
	});
		},
		deleteProduct :  function(productIds,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/cart/delete_product.do'),
				data    : {
					productIds : productIds
				},
				success	: resolve,
				error 	: reject
	});
		},
	}
	module.exports = _cart;

/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: Administrator
	* @Date:   2017-06-09 08:28:17
	* @Last Modified by:   halfgod
	* @Last Modified time: 2017-06-14 08:43:32
	*/

	'use strict';
	__webpack_require__(15);
	var _mm     = __webpack_require__(8);

	// 通用页面头部
	var header = {
	    init : function(){
	        this.bindEvent();
	        this.onload();
	          
	    },
	    onload : function(){
	    	var keyword = _mm.getUrlParam('keyword');
	    	//keyword存在回填
	    	if (keyword) {
	    		$('#search-input').val(keyword);
	    	}
	    },
	    bindEvent : function(){
	    	var _this = this;
	    	//搜索提交
	    	$('.search-btn').click(function(){
	    		_this.searchSubmit();
	    	});
	    	//输入回车
	    	$('#search-input').keyup(function(e){
	    		if(e.keyCode === 13){
	    			_this.searchSubmit();
	    		}
	    	});  
	    },
	    searchSubmit : function(){
	    	var keyword = $.trim($('#search-input').val());
	    	//若果有keyword跳转到list页
	    	if (keyword) {
	    		window.location.href = "./list.html?keyword=" + keyword;
	    	}else{
	    		//否则返回首页
	    		_mm.goHome();
	    	}
	    }
	   
	};

	header.init();

/***/ }),

/***/ 15:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: halfgod
	* @Date:   2017-06-19 10:37:55
	* @Last Modified by:   halfgod
	* @Last Modified time: 2017-06-23 09:52:53
	*/

	'use strict';
	'use strict';
	var _mm = __webpack_require__(8)
	var _order = {
		//获取物品列表
		
		getProductList : function(resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/order/get_order_cart_product.do'),
				success	: resolve,
				error 	: reject
	});
		},
		//创建订单
		createOrderNum : function(productInfo,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/order/create.do'),
				data	: productInfo,
				success	: resolve,
				error 	: reject
	});
		},
		//获取订单列表
		getOrderList : function(listParam,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/order/list.do'),
				data	: listParam,
				success	: resolve,
				error 	: reject
	});
		},
		//获取订单详情
		getOrderDetail : function(orderNumber,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/order/detail.do'),
				data	: {
					orderNo : orderNumber
				},
				success	: resolve,
				error 	: reject
	});
		},
		//取消订单
		cancelOrder : function(orderNumber,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/order/cancel.do'),
				data	: {
					orderNo : orderNumber
				},
				success	: resolve,
				error 	: reject
	});
		},
		//获取支付信息
		getPaymentInfo : function(orderNumber,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/order/pay.do'),
				data	: {
					orderNo : orderNumber
				},
				success	: resolve,
				error 	: reject
	});
		},
		//获取支付信息状态
		getPaymentStatus : function(orderNumber,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/order/query_order_pay_status.do'),
				data	: {
					orderNo : orderNumber
				},
				success	: resolve,
				error 	: reject
	});
		},
	};

	module.exports = _order;

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: halfgod
	* @Date:   2017-06-23 09:22:04
	* @Last Modified by:   halfgod
	* @Last Modified time: 2017-06-23 09:56:32
	*/

	'use strict';
	__webpack_require__(84)
	__webpack_require__(2);
	__webpack_require__(14);
	var _mm = __webpack_require__(8);
	var _order = __webpack_require__(72);
	var templateIndex = __webpack_require__(86);

	var page = {
		data : {
			orderNumber : _mm.getUrlParam('orderNumber')
		},
		init :function(){
			this.onLoad();
		},
		
		onLoad:function(){
			this.loadPayment();

		},
		//加载订单详情
		loadPayment : function(){
			var orderDetailHtml = "",
				_this = this,
				$content = $('.page-wrap');
				_order.getPaymentInfo(this.data.orderNumber,function(res){
					//渲染html
					orderDetailHtml = _mm.renderHtml(templateIndex,res);
					$content.html(orderDetailHtml);	
					_this.listenOrderStatus();
				},function(errMsg){
					$content.html('<p class="err-tip>'+ errMsg +'</p>"')
				});

		},
		listenOrderStatus : function(){
			var _this = this;
			this.paymentTimer = window.setInterval(function(){
				_order.getPaymentStatus(_this.data.orderNumber,function(res){
					if (res == true) {
						window.location.href = './result.html?type=payment&orderNumber='+ _this.data.orderNumber;
					}
				},function(errMsg){

				});
			},5000);
		}

	};

	$(function(){
		page.init();
	});


/***/ }),

/***/ 84:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 86:
/***/ (function(module, exports) {

	module.exports = " <p class=\"payment-tips\">订单提交成功,请尽快支付!订单号:</p> <p class=\"payment-tips enhance\">请使用支付宝App扫描如下二维码进行支付:</p> <div class=\"img-con\"> <img class=\"qr-code\" src=\"{{qrUrl}}\" alt=\"支付二维码\"/> </div>";

/***/ })

});