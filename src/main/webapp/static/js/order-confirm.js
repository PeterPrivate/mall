webpackJsonp([6],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(65);


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

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: halfgod
	* @Date:   2017-06-19 10:19:32
	* @Last Modified by:   halfgod
	* @Last Modified time: 2017-06-21 16:18:25
	*/

	'use strict';
	__webpack_require__(66)
	__webpack_require__(2);
	__webpack_require__(14);
	var addressModal = __webpack_require__(68);
	var _mm = __webpack_require__(8);
	var _order = __webpack_require__(72);
	var _address = __webpack_require__(69);
	var templateIndex1 = __webpack_require__(73);
	var templateIndex2 = __webpack_require__(74);
	var page = {
		data : {
			selectedAddressId : null
		},
		init : function(){
			this.onLoad();
			this.bindEvent();
		},
		onLoad : function(){
			
			this.loadAddress();
			this.loadProductList();
		},
		bindEvent : function(){
			var _this = this;
			//收获地址的选中
			$(document).on('click','.address-item',function(){
				var $this = $(this);
				$this.addClass('active').siblings('.address-item').removeClass('active'); 
				_this.data.selectedAddressId = $this.data('id');
		});
			//订单提交
			$(document).on('click','.order-submit',function(){
				
				if(_this.data.selectedAddressId){
					_order.createOrderNum({
						shippingId	: _this.data.selectedAddressId
					},function(res){
						window.location.href = './payment.html?orderNumber=' + res.orderNo;
					},function(errMsg){
						_mm.errorTips(errMsg);
					});
				}else{
					_mm.errorTips('请选择收获地址');
				}
				
		});
			//地址的添加
			$(document).on('click','.address-add',function(){
				addressModal.show({
					isUpdate : false,
					onSuccess : function(){
						_this.loadAddress();
					},
				});		
		});
			//地址的编辑
			$(document).on('click','.address-update',function(e){
				e.stopPropagation();
				var shippingId = $(this).parents('.address-item').data('id');
				_address.getAddress(shippingId,function(res){
					addressModal.show({
					isUpdate : true,
					data : res,
					onSuccess : function(){
						_this.loadAddress();
					},
				});		
				},function(errMsg){
					_mm.errorTips(errMsg);
				})
				addressModal.show({
					isUpdate : false,
					onSuccess : function(){
						_this.loadAddress();
					},
				});		
		});
			//地址的删除
			$(document).on('click','.address-delete',function(e){
				e.stopPropagation();
				var id = $(this).parents('.address-item').data('id');
				 if(window.confirm('确认要删除该地址?')){
				 	_address.deleteAddress(id,function(res){
				 		_this.loadAddress();
				 	},function(errMsg){
				 		_mm.errorTips(errMsg);
				 	})
				 }
		});
	},
		//加载地址详情
		loadAddress : function(){
			var _this = this;
			//请求cart信息
			_address.getLoadAddress(function(res){
				_this.addressFilter(res);
				var addressListHtml = _mm.renderHtml(templateIndex1,res);
				$('.address-con').html(addressListHtml);
			},function(errMsg){
				$('.address-con').html('<p class="err-tip">地址加载失败,刷新后重试</p>');
			});
			
		},
		addressFilter : function(data){
			if(this.data.selectedAddressId){
				var selectedAddressIdFlag = false;
				for (var i = 0,length=data.list.length; i < length; i++) {
					if (data.list[i].id === this.data.selectedAddressId) {
						data.list[i].isActive =true;
						selectedAddressIdFlag = true
					}
				}
				if(!selectedAddressIdFlag){
					this.data.selectedAddressId = null;
				}
			}
		},
		//加载商品列表详情
		loadProductList : function(){
			var _this = this;
			//请求cart信息
			_order.getProductList(function(res){
				var productListHtml = _mm.renderHtml(templateIndex2,res);
				$('.product-con').html(productListHtml);
			},function(errMsg){
				console.log(errMsg);
				$('.product-con').html('<p class="err-tip">空空如也,快去购物</p>');
			});
			
		},

	};
	$(function(){
		page.init();
	});

/***/ }),

/***/ 66:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: halfgod
	* @Date:   2017-06-19 10:19:32
	* @Last Modified by:   halfgod
	* @Last Modified time: 2017-06-21 16:01:18
	*/

	'use strict';
	var _mm = __webpack_require__(8);
	var _address = __webpack_require__(69);
	var cities =  __webpack_require__(70);
	var templateIndex = __webpack_require__(71);
	var addressModal = {
		show : function(option){
			this.option = option;
			this.option.data = option.data || {};
			this.$modalWrap = $('.modal-wrap');
			//渲染页面
			this.loadModal();
			//绑定事件
			this.bindEvent();
		},
		bindEvent : function(){
			var _this = this;
			//省份城市二级联动
			this.$modalWrap.find('#receiver-province').change(function(){
				var selectedProvince = $(this).val();
				
				_this.loadCities(selectedProvince);
			});
			//提交收获地址
			this.$modalWrap.find('.address-btn').click(function(){

				var receiverInfo = _this.getReceiverInfo(),
					isUpdate	 = _this.option.isUpdate;
					//新增收件人,验证通过
					if(!isUpdate && receiverInfo.status){
						_address.save(receiverInfo.data,function(res){
							_mm.successTips('地址添加成功');
							_this.hide();
						typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
						},function(errMsg){
							_mm.errorTips(errMsg);
						});
						//更新收件人,验证通过
					}else if(isUpdate && receiverInfo.status){
						_address.update(receiverInfo.data,function(res){
							_mm.successTips('地址修改成功');
							_this.hide();
						typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
						},function(errMsg){
							_mm.errorTips(errMsg);
						});
					}else{
						_mm.errorTips(receiverInfo.errMsg || '发送了错误');
					}
			});
			this.$modalWrap.find('.close').click(function(){
				_this.hide();
			});
			this.$modalWrap.find('.modal-container').click(function(e){
				e.stopPropagation();
			});
		},
		loadModal : function(){
			var addressModalHtml = _mm.renderHtml(templateIndex,{
				isUpdate : this.option.isUpdate,
				data 	 : this.option.data
			});
			this.$modalWrap.html(addressModalHtml);
			//加载省份
			this.loadProvince();
			//加载城市
			//this.loadCities();

		},
		loadProvince : function(){
			var provinces = cities.getProvinces() || [],
			$provinceSelect = this.$modalWrap.find('#receiver-province');
			$provinceSelect.html(this.getSelectOption(provinces));
			//如果更新地址并且有省份信息做省份的回填
			if(this.option.isUpdate && this.option.data.receiverProvince){
				$provinceSelect.val(this.option.data.receiverProvince);
				this.loadCities(this.option.data.receiverProvince);
			}
		},
		//加载城市信息
		loadCities : function(provinceName){
			var  cities1 = cities.getCities(provinceName) || [],
			     $citySelect= this.$modalWrap.find('#receiver-city');
			     //console.log(cities1);
			      $citySelect.html(this.getSelectOption(cities1));
			     if(this.option.isUpdate && this.option.data.receiverCity){
				    $citySelect.val(this.option.data.receiverCity);
			} 

		},
		//获取表单收件人信息,并且表单验证
		getReceiverInfo : function(){
			var receiverInfo = {},
			    result = {
			    	status : false
			    };
			    receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
			    receiverInfo.receiverProvince = $.trim(this.$modalWrap.find('#receiver-province').val());
			    receiverInfo.receiverCity = $.trim(this.$modalWrap.find('#receiver-city').val());
			    receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
			    receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
			    receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zipCode').val());
			    if(this.option.isUpdate){
			    	receiverInfo.id = $.trim(this.$modalWrap.find('#receiver-id').val());
			    }
			    if(!receiverInfo.receiverName){
			    	result.errMsg = '请输入收件人姓名';
			    }else if(!receiverInfo.receiverProvince){
			    	result.errMsg = '请选择省份';
			    }
			    else if(!receiverInfo.receiverCity){
			    	result.errMsg = '请选择城市';
			    }
			    else if(!receiverInfo.receiverPhone){
			    	result.errMsg = '请输入11位手机号';

			    }
			    else if(11 !== receiverInfo.receiverPhone.length){
			    	console.log(receiverInfo.receiverPhone.length)
			    	result.errMsg = '请输入11位手机号';
			    }
			    else if(!receiverInfo.receiverAddress){
			    	result.errMsg = '请输入详细地址';
			    }else{
			    	//验证通过
			    	result.status = true;
			    	result.data = receiverInfo;
			    }
			    return result;
		},
		getSelectOption : function(optionArray){
			var html = '<option value="">请选择</option>';
			for(var i = 0,length= optionArray.length;i<length;i++){
			html += '<option value="'+ optionArray[i] + '">' + optionArray[i] + '</option>';
			}
			return html;

		},
		hide : function(){
			this.$modalWrap.empty();
		},
	};

	module.exports =  addressModal;

/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: halfgod
	* @Date:   2017-06-19 14:44:13
	* @Last Modified by:   halfgod
	* @Last Modified time: 2017-06-21 16:06:53
	*/

	'use strict';
	var _mm = __webpack_require__(8)
	var _address = {
		//获取地址列表
		
		getLoadAddress : function(resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/shipping/list.do'),
				success	: resolve,
				error 	: reject
	});
		},
		//新建收件人
		save : function(addressInfo,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/shipping/add.do'),
				data    : addressInfo,
				success	: resolve,
				error 	: reject
	});
		},
		//新建收件人
		update : function(addressInfo,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/shipping/update.do'),
				data    : addressInfo,
				success	: resolve,
				error 	: reject
	});
		},
		//新建收件人
		deleteAddress : function(id,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/shipping/del.do'),
				data    : {
					shippingId : id
				},
				success	: resolve,
				error 	: reject
	});
		},
		//获取单条收件人信息
		getAddress : function(shippingId,resolve,reject){
			_mm.request({
				url 	: _mm.getServerUrl('/shipping/select.do'),
				data    : {
					shippingId : shippingId
				},
				success	: resolve,
				error 	: reject
	});
		},
	};

	module.exports = _address;

/***/ }),

/***/ 70:
/***/ (function(module, exports) {

	/*
	* @Author: halfgod
	* @Date:   2017-06-20 19:50:33
	* @Last Modified by:   halfgod
	* @Last Modified time: 2017-06-20 21:08:42
	*/

	'use strict';
	var cities = {
		cityInfo : {
		"北京":["北京"],
		"上海":["上海"],
		"天津":["天津"],
		"重庆":["重庆"],
		"河北省":["石家庄","张家口","承德","秦皇岛","唐山","廊坊","保定","沧州","衡水","邢台","邯郸"],
		"山西省":["太原","大同","朔州","阳泉","长治","晋城","忻州","吕梁","晋中","临汾","运城"],
		"辽宁省":["沈阳","朝阳","阜新","铁岭","抚顺","本溪","辽阳","鞍山","丹东","大连","营口","盘锦","锦州","葫芦岛"],
		"吉林省":["长春","白城","松原","吉林","四平","辽源","通化","白山","延边"],
		"黑龙江省":["哈尔滨","齐齐哈尔","黑河","大庆","伊春","鹤岗","佳木斯","双鸭山","七台河","鸡西","牡丹江","绥化","大兴安"],
		"江苏省":["南京","徐州","连云港","宿迁","淮阴","盐城","扬州","泰州","南通","镇江","常州","无锡","苏州"],
		"浙江省":["杭州","湖州","嘉兴","舟山","宁波","绍兴","金华","台州","温州","丽水"],"安徽省":["合肥","宿州","淮北","阜阳","蚌埠","淮南","滁州","马鞍山","芜湖","铜陵","安庆","黄山","六安","巢湖","池州","宣城"],
		"福建省":["福州","南平","三明","莆田","泉州","厦门","漳州","龙岩","宁德"],
		"江西省":["南昌","九江","景德镇","鹰潭","新余","萍乡","赣州","上饶","抚州","宜春","吉安"],
		"山东省":["济南","聊城","德州","东营","淄博","潍坊","烟台","威海","青岛","日照","临沂","枣庄","济宁","泰安","莱芜","滨州","菏泽"],
		"河南省":["郑州","三门峡","洛阳","焦作","新乡","鹤壁","安阳","濮阳","开封","商丘","许昌","漯河","平顶山","南阳","信阳","周口","驻马店"],
		"湖北省":["武汉","十堰","襄攀","荆门","孝感","黄冈","鄂州","黄石","咸宁","荆州","宜昌","恩施","襄樊"],"湖南省":["长沙","张家界","常德","益阳","岳阳","株洲","湘潭","衡阳","郴州","永州","邵阳","怀化","娄底","湘西"],
		"广东省":["广州","清远","韶关","河源","梅州","潮州","汕头","揭阳","汕尾","惠州","东莞","深圳","珠海","江门","佛山","肇庆","云浮","阳江","茂名","湛江"],
		"海南省":["海口","三亚"],
		"四川省":["成都","广元","绵阳","德阳","南充","广安","遂宁","内江","乐山","自贡","泸州","宜宾","攀枝花","巴中","达川","资阳","眉山","雅安","阿坝","甘孜","凉山"],
		"贵州省":["贵阳","六盘水","遵义","毕节","铜仁","安顺","黔东南","黔南","黔西南"],"云南省":["昆明","曲靖","玉溪","丽江","昭通","思茅","临沧","保山","德宏","怒江","迪庆","大理","楚雄","红河","文山","西双版纳"],
		"陕西省":["西安","延安","铜川","渭南","咸阳","宝鸡","汉中","榆林","商洛","安康"],
		"甘肃省":["兰州","嘉峪关","金昌","白银","天水","酒泉","张掖","武威","庆阳","平凉","定西","陇南","临夏","甘南"],"青海省":["西宁","海东","西宁","海北","海南","黄南","果洛","玉树","海西"],
		"内蒙古":["呼和浩特","包头","乌海","赤峰","呼伦贝尔盟","兴安盟","哲里木盟","锡林郭勒盟","乌兰察布盟","鄂尔多斯","巴彦淖尔盟","阿拉善盟"],
		"广西":["南宁","桂林","柳州","梧州","贵港","玉林","钦州","北海","防城港","南宁","百色","河池","柳州","贺州"],"西藏":["拉萨","那曲","昌都","林芝","山南","日喀则","阿里"],
		"宁夏":["银川","石嘴山","吴忠","固原"],
		"新疆":["乌鲁木齐","克拉玛依","喀什","阿克苏","和田","吐鲁番","哈密","博尔塔拉","昌吉","巴音郭楞","伊犁","塔城","阿勒泰"],
		"香港":["香港"],
		"澳门":["澳门"],
		"台湾":["台北","台南","其他"]
	},
	//获取所有的省份
	getProvinces : function(){
		var provinces = [];
		for(var item in this.cityInfo){
			provinces.push(item);
		}
		return provinces;
	},

	getCities : function(provinceName){
		return this.cityInfo[provinceName] || [];
	}
	};
	module.exports = cities;

/***/ }),

/***/ 71:
/***/ (function(module, exports) {

	module.exports = "<div class=\"modal close\"> <div class=\"modal-container\"> <div class=\"modal-header\"> {{#isUpdate}} <h1 class=\"modal-title\">更新地址</h1> {{/isUpdate}} {{^isUpdate}} <h1 class=\"modal-title\">使用新地址</h1> {{/isUpdate}} <i class=\"fa fa-close close\"></i> </div> <div class=\"modal-body\"> <div class=\"form\"> <div class=\"form-line\"> <label class=\"label\" for=\"receiver-name\">收件人姓名</label> <input class=\"form-item\" id=\"receiver-name\" placeholder=\"请输入收件人姓名\" value=\"{{data.receiverName}}\"/> </div> <div class=\"form-line\"> <label class=\"label\" for=\"receiver-province\">所在城市</label> <select class=\"form-item\" id=\"receiver-province\"> </select><select class=\"form-item\" id=\"receiver-city\"> <option value=\"\">请选择</option> </select> </div> <div class=\"form-line\"> <label class=\"label\" for=\"receiver-address\">详细地址</label> <input class=\"form-item\" id=\"receiver-address\" placeholder=\"请输入详细地址,精确到门牌号\" value=\"{{data.receiverAddress}}\"/> </div> <div class=\"form-line\"> <label class=\"label\" for=\"receiver-phone\">收件人手机</label> <input class=\"form-item\" id=\"receiver-phone\" placeholder=\"请输入收件人手机\" value=\"{{data.receiverPhone}}\"/> </div> <div class=\"form-line\"> <label class=\"label\" for=\"receiver-zipcode\">邮政编码</label> <input class=\"form-item\" id=\"receiver-zipCode\" placeholder=\"如:100000\" value=\"{{data.receiverZip}}\"/> </div> <div class=\"form-line\"> <input type=\"hidden\" id=\"receiver-id\" value=\"{{data.id}}\"> <a class=\"btn address-btn\">保存收获地址</a> </div> </div> </div> </div> </div>";

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

/***/ 73:
/***/ (function(module, exports) {

	module.exports = " {{#list}} {{#isActive}} <div class=\"address-item active\" data-id=\"{{id}}\"> {{/isActive}} {{^isActive}} <div class=\"address-item\" data-id=\"{{id}}\"> {{/isActive}} <div class=\"address-title\"> {{receiverCity}} {{receiverProvince}} ({{receiverName}}) 收 </div> <div class=\"address-detail\"> 地址:{{receiverAddress}} 手机:{{receiverPhone}} </div> <div class=\"address-opera\"> <span class=\"link address-update\">编辑</span> <span class=\"link address-delete\">删除</span> </div> </div> {{/list}} <div class=\"address-add\"> <div class=\"address-new\"> <i class=\"fa fa-plus\"></i> <div class=\"text\">使用新地址</div> </div> </div> </div>";

/***/ }),

/***/ 74:
/***/ (function(module, exports) {

	module.exports = "<table class=\"product-table\"> <tr> <th class=\"cell-img\">&nbsp;</th> <th class=\"cell-info\">商品描述</th> <th class=\"cell-price\">价格</th> <th class=\"cell-count\">数量</th> <th class=\"cell-total\">小计</th> </tr> {{#orderItemVoList}} <tr> <td class=\"cell-img\"> <a href=\"./detail.html?productId={{productId}}\" target=\"_blank\"> <img class=\"p-img\" src=\"{{imageHost}}{{productImage}}\" alt=\"{{productName}}\"> </a> </td> <td class=\"cell-info\"> <a class=\"link\" href=\"./detail.html?productId={{productId}}\" target=\"_blank\"> {{productName}} </a> </td> <td class=\"cell-price\">￥{{currentUnitPrice}}</td> <td class=\"cell-count\">{{quantity}}</td> <td class=\"cell-total\">￥{{totalPrice}}</td> </tr> {{/orderItemVoList}} </table> <div class=\"submit-con\"> <span>订单总价:</span> <span class=\"submit-total\">￥{{productTotalPrice}}</span> <span class=\"btn order-submit\">提交订单</span> </div>";

/***/ })

});