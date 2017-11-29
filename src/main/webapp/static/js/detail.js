webpackJsonp([3],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(39);


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

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: halfgod
	* @Date:   2017-06-14 20:10:05
	* @Last Modified by:   halfgod
	* @Last Modified time: 2017-06-15 11:39:44
	*/

	'use strict';
	__webpack_require__(40)
	__webpack_require__(2);
	__webpack_require__(14);

	var _mm = __webpack_require__(8);
	var _product = __webpack_require__(42);
	var _cart = __webpack_require__(13);
	var templateIndex = __webpack_require__(43);
	var page = {
		data : {
			productId         : _mm.getUrlParam('productId')    || '',
		},
		init : function(){
			this.onLoad();
			this.bindEvent();
		},
		onLoad : function(){
			//如果没有productid自动跳回首页
			if(!this.data.productId){
				_mm.goHome();
			}
			this.loadDetail();
		},
		bindEvent : function(){
			var _this = this;
			//图片预览
			$(document).on('mouseenter','.p-img-item',function(){
				var imageUrl = $(this).find('img').attr('src');
				$('.main-img').attr('src',imageUrl);
			});
			$(document).on('click','.p-count-btn',function(){
				    var type = $(this).hasClass('plus') ? 'plus' : 'minus',
				    $pCount = $('.p-count'),
				    currCount = parseInt($pCount.val()),
				    minCount = 1,
				    maxCount = _this.data.detailInfo.stock || 1;
				    if (type === 'plus') {
				    	$pCount.val(currCount < maxCount ? currCount+1 : maxCount);
				    }else if (type === 'minus') {
				    	$pCount.val(currCount > minCount ? currCount-1 : minCount);
				    }
			});
			$(document).on('click','.cart-add',function(){
				var productInfo = {
					productId : _this.data.productId,
					count: $('.p-count').val()
				};
				console.log(productInfo)
				_cart.addToCart(productInfo,function(){
					window.location.href = './result.html?type=cart-add';
				},function(errMsg){
					_mm.errorTips(errMsg)
				});
			});
			
		},
		//加载商品详情
		loadDetail : function(){
			var html = '',
			    _this = this,
			$pageWrap = $('.page-wrap');
			//loading
			$pageWrap.html('<div class="loading"></div>');
			//请求detail信息
			_product.getProductDetail(this.data.productId,function(res){
				_this.filter(res);
				_this.data.detailInfo = res;
				html = _mm.renderHtml(templateIndex,res);
				$pageWrap.html(html);
			},function(errMsg){
				$pageWrap.html('<p class="err-tip">此商品太淘气,找不到了</p>');
			});
		},

		filter : function(data){
			data.subImages = data.subImages.split(',');
		}

		

	};
		
		
		
		
		

	$(function(){
		page.init();
	});


/***/ }),

/***/ 40:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: Administrator
	* @Date:   2017-06-08 12:40:34
	* @Last Modified by:   halfgod
	* @Last Modified time: 2017-06-14 22:04:26
	*/

	'use strict';
	var _mm = __webpack_require__(8)
	var _product = {
		//用户注册
		getProductList : function(listParam,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/product/list.do'),
				data	: listParam,
				success	: resolve,
				error 	: reject
	});
		},
		getProductDetail : function(productId,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/product/detail.do'),
				data	: {
					productId : productId
				},
				success	: resolve,
				error 	: reject
	});
		},
		
	}

	module.exports = _product;

/***/ }),

/***/ 43:
/***/ (function(module, exports) {

	module.exports = "<div class=\"intro-wrap\"> <div class=\"p-img-con\"> <div class=\"main-img-con\"> <img class=\"main-img\" src=\"{{imageHost}}{{mainImage}}\" alt=\"{{name}}\"> </div> <ul class=\"p-img-list\"> {{#subImages}} <li class=\"p-img-item\"><img class=\"p-img\" src=\"{{imageHost}}{{.}}\" alt=\"{{name}}\"></li> {{/subImages}} </ul> </div> <div class=\"p-info-con\"> <h1 class=\"p-name\">{{name}}</h1> <p class=\"p-subtitle\">{{subtitle}}</p> <div class=\"p-info-item p-price-con\"> <span class=\"label\">价格:</span> <span class=\"info\">￥{{price}}</span> </div> <div class=\"p-info-item\"> <span class=\"label\">库存:</span> <span class=\"info\">{{stock}}</span> </div> <div class=\"p-info-item p-count-con\"> <span class=\"label\">数量:</span> <input class=\"p-count\" value=\"1\" readonly=\"\"> <span class=\"p-count-btn plus\">+</span> <span class=\"p-count-btn minus\">-</span> </div> <div class=\"p-info-item\"> <a class=\"btn cart-add\">加入购物车</a> </div> </div> </div> <div class=\"detail-wrap\"> <div class=\"detail-tab-con\"> <ul class=\"tab-list\"> <li class=\"tab-item active\">详细描述</li> </ul> </div> <div class=\"detail-con\"> {{{detail}}} </div> </div>";

/***/ })

});