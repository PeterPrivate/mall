webpackJsonp([7],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(75);


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

/***/ 17:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: Administrator
	* @Date:   2017-06-09 09:46:35
	* @Last Modified by:   halfgod
	* @Last Modified time: 2017-06-12 20:58:07
	*/

	'use strict';
	__webpack_require__(18);__webpack_require__(18);
	var _mm = __webpack_require__(8);
	var template = __webpack_require__(20);
	//导航

	var navSide= {
		option : {
			name : '',
			navList : [
				{name:'user-center',desc:'个人中心',href:'./user-center.html'},
				{name:'order-list',desc:'我的订单',href:'./order-list.html'},
				{name:'user-pass-update',desc:'修改密码',href:'./user-pass-update.html'},
				{name:'about',desc:'关于MMall',href:'./about.html'}
			]
		},
		init : function(option){
			//合并选项
			$.extend(this.option,option);
			this.renderNav();

		},
		renderNav : function(){
				//击杀active数据
				for (var i = 0; i < this.option.navList.length; i++) {
					if(this.option.navList[i].name === this.option.name){
						this.option.navList[i].isActive = true;
					}
				};
				//渲染list数据
				var navHtml = _mm.renderHtml(template,{
					navList : this.option.navList
				});
				//把html放入容器
				$('.nav-side').html(navHtml);
		}

	};
	module.exports = navSide;

/***/ }),

/***/ 18:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 20:
/***/ (function(module, exports) {

	module.exports = "{{#navList}} {{#isActive}} <li class=\"nav-item active\"> {{/isActive}} {{^isActive}} </li><li class=\"nav-item\"> {{/isActive}} <a class=\"link\" href=\"{{href}}\">{{desc}}</a> </li> {{/navList}} ";

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

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: halfgod
	* @Date:   2017-06-22 16:44:32
	* @Last Modified by:   halfgod
	* @Last Modified time: 2017-06-22 21:27:06
	*/

	'use strict';
	__webpack_require__(76)
	__webpack_require__(2);
	__webpack_require__(14);
	 var navSide = __webpack_require__(17);
	var _mm = __webpack_require__(8);
	var _order = __webpack_require__(72);
	var templateIndex = __webpack_require__(78);

	var page = {
		data : {
			orderNumber : _mm.getUrlParam('orderNumber')
		},
		init :function(){
			this.onLoad();
			this.bindEvent();

		},
		bindEvent : function(){
			var _this = this;
			$(document).on('click','.order-cancel',function(){
				_order.cancelOrder(_this.data.orderNumber,function(res){
					_mm.successTips('取消订单成功');
					_this.loadDetail();
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			});
		},
		onLoad:function(){
			navSide.init({
				name: 'order-list'
			});
			this.loadDetail();
			
		},
		//加载订单详情
		loadDetail : function(){
			var orderDetailHtml = "",
				_this = this,
				$content = $('.content');
				_order.getOrderDetail(this.data.orderNumber,function(res){
					_this.dataFilter(res);
					//渲染html
					orderDetailHtml = _mm.renderHtml(templateIndex,res);
					$content.html(orderDetailHtml);
					
				},function(errMsg){
					$content.html('<p class="err-tip>'+ errMsg +'</p>"')
				});

		},
		//数据适配
		dataFilter : function(data){
			data.needPay = data.status == 10 ; 
			data.isCancelable = data.status == 10 ; 
			console.log(data.isCancelable)
		}

	};

	$(function(){
		page.init();
	});


/***/ }),

/***/ 76:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 78:
/***/ (function(module, exports) {

	module.exports = "<div class=\"panel\"> <div class=\"panel-title\">订单信息</div> <div class=\"panel-body\"> <div class=\"order-info\"> <div class=\"text-line\"> <span class=\"text\">订单号:{{orderNo}}</span> <span class=\"text\">创建时间:{{createTime}}</span> </div> <div class=\"text-line\"> <span class=\"text\">收件人: {{receiverName}} {{shippingVo.receiverProvince}} {{shippingVo.receiverCity}} {{shippingVo.receiverAddress}} {{shippingVo.receiverPhone}} </span> </div> <div class=\"text-line\"> <span class=\"text\">订单状态:{{statusDesc}}</span> </div> <div class=\"text-line\"> <span class=\"text\">支付方式:{{paymentTypeDesc}}</span> </div> <div class=\"text-line\"> {{#needPay}} <a class=\"btn\" href=\"./payment.html?orderNumber={{orderNo}}\">去支付</a> {{/needPay}} {{#isCancelable}} <a class=\"btn order-cancel\">取消订单</a> {{/isCancelable}} </div> </div> </div> </div> <div class=\"panel\"> <div class=\"panel-title\">商品清单</div> <div class=\"panel-body\"> <table class=\"product-table\"> <tr> <th class=\"cell-th cell-img\">&nbsp;</th> <th class=\"cell-th cell-info\"> 商品信息</th> <th class=\"cell-th cell-price\">单价</th> <th class=\"cell-th cell-count\">数量</th> <th class=\"cell-th cell-total\">小计</th> </tr> {{#orderItemVoList}} <tr> <td class=\"cell cell-img\"> <a href=\"./detail.html?productId={{productId}}\" target=\"_blank\"> <img class=\"p-img\" src=\"{{imageHost}}{{productImage}}\" alt=\"{{productName}}\"> </a> </td> <td class=\"cell cell-info\"> <a class=\"link\" href=\"./detail.html?productId={{productId}}\" target=\"_blank\"> {{productName}} </a> </td> <td class=\"cell cell-price\">￥{{currentUnitPrice}}</td> <td class=\"cell cell-count\">{{quantity}}</td> <td class=\"cell cell-total\">￥{{totalPrice}}</td> </tr> {{/orderItemVoList}} </table> <p class=\"total\"> <span>订单总价</span> <span class=\"total-price\">￥{{payment}}</span> </p> </div> </div> ";

/***/ })

});