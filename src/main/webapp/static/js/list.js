webpackJsonp([5],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(57);


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

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: halfgod
	* @Date:   2017-06-14 08:35:01
	* @Last Modified by:   halfgod
	* @Last Modified time: 2017-06-14 14:44:10
	*/

	'use strict';
	__webpack_require__(58)
	__webpack_require__(2);
	__webpack_require__(14);
	 var navSide = __webpack_require__(17);
	var _mm = __webpack_require__(8);
	var _product = __webpack_require__(42);
	var Pagination = __webpack_require__(60);
	var templateIndex = __webpack_require__(64);

	var page = {
		data : {
			listParam : {
				keyword         : _mm.getUrlParam('keyword')    || '',
	            categoryId      : _mm.getUrlParam('categoryId') || '',
	            orderBy         : _mm.getUrlParam('orderBy')    || 'default',
	            pageNum         : _mm.getUrlParam('pageNum')    || 1,
	            pageSize        : _mm.getUrlParam('pageSize')   || 20
			}
		},
		init : function(){
			this.onLoad();
			this.bindEvent();
		},
		onLoad : function(){
			this.loadList();
		},
		bindEvent : function(){
			var _this = this;
			$('.sort-item').click(function(){
				var $this = $(this);
				_this.data.listParam.pageNum=1;
				//點擊默認排序
				if($this.data('type') === 'default'){
					if ($this.hasClass('active')) {
						return;
					}else{
						$this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
						_this.data.listParam.orderBy = 'default';
					}
				}
				else if($this.data('type') === 'price'){
					$this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
					//升序,降序的处理
					if (!$this.hasClass('asc')) {
						$this.addClass('asc').removeClass('desc');
						_this.data.listParam.orderBy = 'price_asc';
					}else{
						$this.addClass('desc').removeClass('asc');
						_this.data.listParam.orderBy = 'price_desc';
					}
				}
				_this.loadList();
			});
		},
		loadList : function(){
			var listHtml = '',
			       _this = this;
			var listParam = this.data.listParam;
		    var $pListCon = $('.p-list-con');
		    $pListCon.html('<div class="loading"></div>');
			//删除参数不必要字段
			listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);
			//请求借口
			_product.getProductList(listParam,function(res){
				listHtml = _mm.renderHtml(templateIndex,{
					list : res.list
				});
				$('.p-list-con').html(listHtml);
				_this.loadPaginamtion({
					hasPreviousPage : res.hasPreviousPage,
					prePage : res.prePage,
					hasNextPage : res.hasNextPage,
					nextPage : res.nextPage,
					pageNum : res.pageNum,
					pages : res.pages,
				});
			},function(errMsg){
				_mm.errorTips(errMsg);

			});
		},
		loadPaginamtion : function(pageInfo){
			var _this = this;
			this.pagination ? '' : (this.pagination = new Pagination());
			this.pagination.render($.extend({},pageInfo,{
				container : $('.pagination'),
				onSelectPage : function(pageNum){
					_this.data.listParam.pageNum = pageNum;
					_this.loadList();
				}
			}));
		}

		

	};
		
		
		
		
		

	$(function(){
		page.init();
	});

/***/ }),

/***/ 58:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: halfgod
	* @Date:   2017-06-14 12:56:15
	* @Last Modified by:   halfgod
	* @Last Modified time: 2017-06-14 14:32:08
	*/

	'use strict';
	__webpack_require__(61);
	var templatePagination = __webpack_require__(63);
	var _mm = __webpack_require__(8);

	var Pagination = function(){
		var _this = this;

		this.defaultOption = {
			container : null,
			pageNum  : 1,
			pageRange : 3,
			onSelectPage : null
		};
		//事件的处理
		$(document).on('click','.pg-item',function(){
			var $this = $(this);
			if($this.hasClass('active') || $this.hasClass('disabled')){
				return;
			}
			typeof _this.option.onSelectPage ==='function' 
			? _this.option.onSelectPage($this.data('value')) : null;

		});
	};
	Pagination.prototype.render = function(userOption){
		this.option = $.extend({},this.defaultOption,userOption);
		//判断容器是否为合法的jquery对线
		if(!(this.option.container instanceof jQuery)){
			return;

		}
		//判断是否挚友一夜
		if(this.option.pages <= 1){
			return;

		}
		//渲染
		this.option.container.html(this.getPaginationHtml());

	};
	//获取分页html
	Pagination.prototype.getPaginationHtml = function(){

		//|上一页| 1 2 3 4 5 6 |下一页| 5/6
		var html = '',
		    option = this.option,
		    pageArray = [],
		    start       = option.pageNum - option.pageRange > 0 
	            ? option.pageNum - option.pageRange : 1,
	        end         = option.pageNum + option.pageRange < option.pages
	            ? option.pageNum + option.pageRange : option.pages;
		    //上一页按钮
		    pageArray.push({
		    	name : '上一页',
		    	value : this.option.prePage,
		    	//active : (i ===option.pageNum),
		    	disabled : !this.option.hasPreviousPage
		    });
		    //数字按钮
		    for (var i = start; i <= end; i++) {
		    	pageArray.push({
		    	name : i,
		    	value : i,
		    	active : (i ===option.pageNum),
		    	});
		    };
		    //下一页按钮
		    pageArray.push({
		    	name : '下一页',
		    	value : this.option.nextPage,
		    	//active : (i ===option.pageNum),
		    	disabled : !this.option.hasNextPage
		    });
		    html = _mm.renderHtml(templatePagination,{
		    	pageArray : pageArray,
		    	pageNum : option.pageNum,
		    	pages : option.pages

		    });
		    return html;

	};
	module.exports = Pagination;

/***/ }),

/***/ 61:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 63:
/***/ (function(module, exports) {

	module.exports = "<div class=\"pg-content\"> {{#pageArray}} {{#disabled}} <span class=\"pg-item disabled\" data-value=\"{{value}}\">{{name}}</span> {{/disabled}} {{^disabled}} {{#active}} <span class=\"pg-item active\" data-value=\"{{value}}\">{{name}}</span> {{/active}} {{^active}} <span class=\"pg-item\" data-value=\"{{value}}\">{{name}}</span> {{/active}} {{/disabled}} {{/pageArray}} <span class=\"pg-total\"> 第{{pageNum}}页 / 共{{pages}}页</span> </div>";

/***/ }),

/***/ 64:
/***/ (function(module, exports) {

	module.exports = "{{#list}} <li class=\"p-item\"> <div class=\"p-img-con\"> <a class=\"link\" href=\"./detail.html?productId={{id}}\" target=\"_blank\"> <img class=\"p-img\" src=\"{{imageHost}}{{mainImage}}\" alt=\"{{name}}\"> </a> </div> <div class=\"p-price-con\"> <span class=\"p-price\">￥{{price}}</span> </div> <div class=\"p-name-con\"> <a class=\"p-name\" href=\"./detail.html?productId={{id}}\" target=\"_blank\">{{name}}</a> </div> </li> {{/list}} {{^list}} <p class=\"err-tip\">很抱歉,实在找不到您要的商品</p> {{/list}}";

/***/ })

});