webpackJsonp([14],{

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(104);


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

/***/ 104:
/***/ (function(module, exports, __webpack_require__) {

	/*
	* @Author: Administrator
	* @Date:   2017-06-11 12:51:48
	* @Last Modified by:   Administrator
	* @Last Modified time: 2017-06-11 14:15:00
	*/

	'use strict';
	__webpack_require__(105);
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
		data : {
			username : '',
			question : '',
			answer : '',
			token : '',
		},
		init :function(){
			this.onLoad();
			this.bindEvent();

		},
		onLoad : function(){
			this.loadStepUsername();
		},
		bindEvent:function(){
			var _this = this;
			//问题提示获取点击
			$('#submit-username').click(function(){
				var username = $.trim($('#username').val());
				if (username) {
					_user.getQuestion(username,function(res){
						_this.data.username = username;
						_this.data.question = res;
						_this.loadStepQuestion();
					},function(errMsg){
						formError.show(errMsg);
					});
				}
				else{
					formError.show('请输入用户名');
				}
			});
			//回答点击
			$('#submit-question').click(function(){
				var answer = $.trim($('#answer').val());
				if (answer) {
					//检查秘密提示问题答案
					_user.checkAnswer({
						username : _this.data.username,
						question : _this.data.question,
						answer   : answer
					},function(res){
						_this.data.answer = answer;
						_this.data.token = res;
						_this.loadStepPassword();
					},function(errMsg){
						formError.show(errMsg);
					});
				}
				else{
					formError.show('请输入密码提示问题答案');
				}
			});
			//新密码后的低矮你家
			$('#submit-password').click(function(){
				var password = $.trim($('#password').val());
				if (password && password.length >= 6) {
					//检查秘密提示问题答案
					_user.resetPassword({
						username : _this.data.username,
						passwordNew : password,
						forgetToken   : _this.data.token
					},function(res){
						window.location.href = './result.html?type=pass-reset';
					},function(errMsg){
						formError.show(errMsg);
					});
				}
				else{
					formError.show('请输入不少于6位的新密码');
				}
			});
			
		},
		//加载输入用户名的一步
		loadStepUsername : function(){
			$('.step-username').show();
		},
		loadStepQuestion : function(){
			formError.hide();
			//容器的切换
			$('.step-username').hide()
			.siblings('.step-question').show().find('.question').text(this.data.question);

		},
		loadStepPassword : function(){
			formError.hide();
			$('.step-question').hide()
			.siblings('.step-passwo').show();

		},
	};

	$(function(){
		page.init();
	});

/***/ }),

/***/ 105:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ })

});