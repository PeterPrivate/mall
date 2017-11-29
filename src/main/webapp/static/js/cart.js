webpackJsonp([1],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(21);


/***/ }),
/* 1 */,
/* 2 */
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
/* 3 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
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
/* 13 */
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
/* 14 */
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
/* 15 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: halfgod
	* @Date:   2017-06-15 14:10:34
	* @Last Modified by:   halfgod
	* @Last Modified time: 2017-06-19 10:19:03
	*/

	'use strict';
	__webpack_require__(22)
	var nav = __webpack_require__(2);
	__webpack_require__(14);

	var _mm = __webpack_require__(8);
	var _cart = __webpack_require__(13);
	var templateIndex = __webpack_require__(24);
	var page = {
		data : {
			
		},
		init : function(){
			this.onLoad();
			this.bindEvent();
		},
		onLoad : function(){
			
			this.loadCart();
		},
		bindEvent : function(){
			var _this = this;
			//商品的选择和取消
			$(document).on('click','.cart-select',function(){
				var $this = $(this),
				productId = $this.parents('.cart-table').data('product-id');
				//console.log(productId);
				//切换选中状态
				if($this.is(':checked')){
							_cart.selectProduct(productId,function(res){
				    		_this.renderCart(res);
							},function(errMsg){
							_this.showCartError();	
						});
					}else{
						_cart.unselectProduct(productId,function(res){
				    		_this.renderCart(res);
							},function(errMsg){
							_this.showCartError();	
						});
				}
			});
			//商品的全部选择和取消
			$(document).on('click','.cart-select-all',function(){
				var $this = $(this);
				
				//切换选中状态
				if($this.is(':checked')){
							_cart.selectAllProduct(function(res){
				    		_this.renderCart(res);
							},function(errMsg){
							_this.showCartError();	
						});
					}else{
						_cart.unselectAllProduct(function(res){
				    		_this.renderCart(res);
							},function(errMsg){
							_this.showCartError();	
						});
				}
			});
			//商品数量
			$(document).on('click','.count-btn',function(){

				var $this = $(this),
				    $pCount = $this.siblings('.count-input'),
				    type = $this.hasClass('plus') ? 'plus' : 'minus',
				    productId = $this.parents('.cart-table').data('product-id'),
				    currCount = parseInt($pCount.val()),
				    minCount = 1,
				    maxCount = parseInt($pCount.data('stock')),
				    newCount = 0;
				    if (type === 'plus') {
				    	if (currCount >= maxCount) {
				    		_mm.errorTips("该商品库存不足,当前最多可买"+maxCount+"件该商品");
				    		return;
				    	}
				    	newCount = currCount +1 ;
				    }else if(type === 'minus'){
				    	if (currCount<=minCount) {
				    		return;
				    	}
				    	newCount = currCount-1;
				    }
				    //跟新购物车商品数量
				    _cart.updateProduct({
				    	productId : productId,
				    	count : newCount
				    },function(res){
				    		_this.renderCart(res);
							},function(errMsg){
							_this.showCartError();	
						});
			});
			//删除单个商品
			$(document).on('click','.cart-delete',function(){
				if(window.confirm("确认要删除该商品吗")){
					var productId = $(this).parents('.cart-table').data('product-id');
					_this.deleteCartProduct(productId);
				}	
			});
			//删除选中商品
			$(document).on('click','.delete-select',function(){
				if(window.confirm("确认要删除选中商品吗")){
					var arrProductIds = [],
						$selectdItem = $('.cart-select:checked');
						//循环查找
						for(var i = 0,iLength = $selectdItem.length;i<iLength;i++){
							arrProductIds.push($($selectdItem[i]).parents('.cart-table').data('product-id'));		
						}
						if(arrProductIds.length){
							_this.deleteCartProduct(arrProductIds.join(','));
						}
						else{
							_mm.errorTips('您还没有选中要删除的商品');
						}
					
				}	
			});
			$(document).on('click','.btn-submit',function(){
				//总价>0
				if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0){
					window.location.href = './order-confirm.html';
				}else{
					_mm.errorTips('请选择商品后再结算')
				}
			});
			
		},
		//加载商品详情
		loadCart : function(){
			var _this = this;
			//loading
			$('.page-wrap').html('<div class="loading"></div>');
			//请求cart信息
			_cart.getCartList(function(res){
				_this.renderCart(res);
			},function(errMsg){
				$('.page-wrap').html('<p class="err-tip">哪里不对了</p>');
			});
			
		},
		renderCart : function(data){
			this.filter(data);
			//huan存购物车
			this.data.cartInfo = data;
			var cartHtml = _mm.renderHtml(templateIndex,data);
			$('.page-wrap').html(cartHtml);
			//通知导航的购物车
			nav.loadCartCount();
		},
		//删除指定商品,支持批量productid,逗号分隔
		deleteCartProduct : function(productIds){
			var _this = this;
			_cart.deleteProduct(productIds,function(res){
				    		_this.renderCart(res);
							},function(errMsg){
							_this.showCartError();	
						});
		},
		filter : function(data){
			data.notEmpty = !!data.cartProductVoList.length;	
		},
		showCartError : function(){
			$('.page-wrap').html('<p class="err-tip">哪里不对了</p>');
		}

		

	};
		
		
		
		
		

	$(function(){
		page.init();
	});


/***/ }),
/* 22 */
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */,
/* 24 */
/***/ (function(module, exports) {

	module.exports = " {{#notEmpty}} <div class=\"cart-header\"> <table class=\"cart-table\"> <tr> <th class=\"cart-cell cell-check\"> <label class=\"cart-label\"> {{#allChecked}} <input type=\"checkbox\" class=\"cart-select-all\" checked=\"ture\"/> {{/allChecked}} {{^allChecked}} <input type=\"checkbox\" class=\"cart-select-all\"/> {{/allChecked}} <span>全选</span> </label> </th> <th class=\"cart-cell cell-info\">商品信息</th> <th class=\"cart-cell cell-price\">单价</th> <th class=\"cart-cell cell-count\">数量</th> <th class=\"cart-cell cell-total\">合计</th> <th class=\"cart-cell cell-opera\">操作</th> </tr> </table> </div> <div class=\"cart-list\"> {{#cartProductVoList}} <table class=\"cart-table\" data-product-id=\"{{productId}}\"> <tr> <td class=\"cart-cell cell-check\"> <label class=\"cart-label\"> {{#productChecked}} <input type=\"checkbox\" class=\"cart-select\" checked=\"true\"/> {{/productChecked}} {{^productChecked}} <input type=\"checkbox\" class=\"cart-select\"/> {{/productChecked}} </label> </td> <td class=\"cart-cell cell-img\"> <img class=\"p-img\" src=\"{{imageHost}}{{productMainImage}}\"> </td> <td class=\"cart-cell cell-finfo\"> <a class=\"link\" href=\"./detail.html?productId={{productId}}\">{{productName}}{{productSubtitle}}</a> </td> <td class=\"cart-cell cell-price\">￥{{productPrice}}</td> <td class=\"cart-cell cell-count\"> <span class=\"count-btn minus\">-</span> <input class=\"count-input\" value=\"{{quantity}}\" data-stock=\"{{productStock}}\" readonly=\"\"> <span class=\"count-btn plus\">+</span> </td> <td class=\"cart-cell cell-total\">￥{{productTotalPrice}}</td> <td class=\"cart-cell cell-opera\"> <span class=\"link cart-delete\">删除</span> </td> </tr> </table> {{/cartProductVoList}} </div> <div class=\"cart-footer\"> <div class=\"select-con\"> <label> {{#allChecked}} <input type=\"checkbox\" class=\"cart-select-all\" checked=\"true\"/> {{/allChecked}} {{^allChecked}} <input type=\"checkbox\" class=\"cart-select-all\"/> {{/allChecked}} <span>全选</span> </label> </div> <div class=\"delete-con\"> <span class=\"link delete-select\"> <i class=\"fa fa-trash-o\"></i> <span>删除选中</span> </span> </div> <div class=\"submit-con\"> <span>总价:</span> <span class=\"submit-total\">￥{{cartTotalPrice}}</span> <span class=\"btn btn-submit\">去结算</span> </div> {{/notEmpty}} {{^notEmpty}} <p class=\"err-tip\"> <span>您的购物车空空如也</span> <a href=\"./index.html\">立即去购物</a> </p> </div> {{/notEmpty}} ";

/***/ })
]);