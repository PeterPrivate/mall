webpackJsonp([13],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(101);


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

/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: Administrator
	* @Date:   2017-06-06 16:06:02
	* @Last Modified by:   Administrator
	* @Last Modified time: 2017-06-10 15:29:29
	*/

	'use strict';
	__webpack_require__(102);
	__webpack_require__(90);
	var _user = __webpack_require__(12);
	var _mm = __webpack_require__(8);

	var formError = {
	      show : function(errMsg){
	      	$('.error-item').show().find('.err-msg').text(errMsg);
	      },
	      hide : function(){
	      	$('.error-item').hide().find('.err-msg').text('');
	      }

	};

	var page = {
		init :function(){
			this.bindEvent();

		},
		bindEvent:function(){
			var _this = this;
			$('#submit').click(function(){
				_this.submit();
			});
			//如果回车也提交
			$('.user-content').keyup(function(e){
				if (e.keyCode === 13) {
					_this.submit();
				}
			});
		},
		submit : function(){
			var formData = {
				username : $.trim($('#username').val()),
				password : $.trim($('#password').val())
			},
			validateResult = this.formValidate(formData);
			if(validateResult.status){
				_user.login(formData,function(res){
					window.location.href = _mm.getUrlParam('redirect') || './index.html'
				},function(errMsg){
					formError.show(errMsg);
				});

			}else{
				formError.show(validateResult.msg)

			}

		},
		formValidate : function(formData){
			var result = {
				status : false,
				msg		: ''
			};
			if(!_mm.validate(formData.username,'require')){
				result.msg='用户名不能为空';
				return result;
			}
			if(!_mm.validate(formData.password,'require')){
				result.msg='密码不能为空';
				return result;
			}
			//通过验证.返回正确
			result.status = true;
			result.msg='验证通过';
			return result;
		}
	};

	$(function(){
		page.init();
	});

/***/ }),

/***/ 102:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});