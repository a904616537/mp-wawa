<!--
# Sample Vuejs
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-06-14 16:26:51
* @Description
* @Flow 
-->

<template>
	<div>
		<div class="login">
			<img class="img1" :src="img1" />
			<img class="img2" :src="img2" />
		</div>
		<button
		lang            = "zh_CN"
		class           = "btn"
		open-type       = "getUserInfo"
		@getuserinfo 	= "onGotUserInfo">
			授权登陆
		</button>
	</div>
</template>

<script>
	import Vue     from 'vue';
	import WxCrypt from '../../utils/WXBizDataCrypt';
	import store   from '../../store';

	const error = new Map([
	    [501, '用户未授权'],
	    [502, '用户信息获取失败'],
	    [503, '服务器响应失败'],
	    [504, '微信响应失败'],
	    [505, '登陆失败']
	]);

	export default{
		data () {
			return {
				img1 : 'http://chuantu.biz/t6/331/1529633391x-1404817874.png',
				img2 : 'http://chuantu.biz/t6/331/1529633507x-1404817874.png'
			}
		},
		computed: {
	        user () {
	        	return store.state.User.user
	        },
	        shareData() {
	        	return store.state.User.share
	        }
	    },
	    onLoad(option){
	        this.props = {...option}
	        console.log('this.props', option)
	    },
		methods: {
			onSetSessionKey (key) {
	            store.commit('user/session_key', key)
	        },
	        onLogin (user) {
	            store.commit('user/login', user)
	        },
			onGotUserInfo(e) {
				if (e.mp.detail.rawData){
					//用户按了允许授权按钮
					console.log('用户按了允许授权按钮')
					const {encryptedData, iv} = e.mp.detail;
	                this.onGetLogin(encryptedData, iv)
	                .then(userdata => {
	                	wx.redirectTo({
							url : '/pages/index/main'
						})
	                })
	                .catch(() => {
	                	wx.showToast({
							title    : error.get(503),
							icon     : 'none',
							duration : 2000
						})
	                })
				} else {
					//用户按了拒绝按钮
					console.log('用户按了拒绝按钮')
				}
			},
	        onWXApp(user) {
	        	return new Promise((resolve, reject) => {
	        		const data = {
						openid  : user.openId,
						unionid : user.unionId,
						avatar  : user.avatarUrl,
						gender  : user.gender
	        		}
		        	wx.request({
						url     : `${Vue.setting.api}mobile/wx_app`,
						data    : data,
						success : (result, req) => {
	                    	store.commit('banner/set', result.data.contentconfig.find(val => val.id == 10));
	                    	store.commit('hall/category', result.data.category);
	                    	store.commit('user/detail', result.data.user);
	                    	resolve();
	                    }
	                })
		        });
	        },
	        onGetUserInfo() {
	            return new Promise((resolve, reject) => {
	                wx.getSetting({
	                    success : (res) => {
	                        if (res.authSetting['scope.userInfo']) {
	                        	wx.getUserInfo({
		                            success : (res) => {
	                        			const {encryptedData, iv} = res;
		                                this.onGetLogin(encryptedData, iv)
		                                .then(userdata => resolve(userdata))
		                                .catch(() => reject(error.get(503)))
		                            },
		                            fail : (err) => reject(error.get(502))
		                        })
	                        } else reject(error.get(501))
	                    },
	                    fail : (err) => reject(error.get(501))
	                })
	            });
	        },
	        onGetLogin(encryptedData, iv) {
	            return new Promise((resolve, reject) => {
	                wx.login({
	                    success : (res) => {
	                        if (res.code) {
	                            wx.request({
	                                url  : `${Vue.setting.api}mobile/wx_code`,
	                                data : { code : res.code },
	                                success : (result) => {
	                                	// 登陆服务器响应成功
	                                	const {session_key, openid} = result.data;
	                                	const pc = new WxCrypt(Vue.setting.appid, session_key)

	                                	if(this.shareData) {
	                                		const shareV = pc.decryptData(this.shareData.encryptedData, this.shareData.iv)
	                                		console.log('shareV', shareV, this.shareData)
	                                	}
	                                	
							            const data = pc.decryptData(encryptedData , iv)
							            if(data) {
							            	this.onSetSessionKey(session_key);
		                                	this.onLogin(data);
		                                	this.onWXApp(data)
		                                	.then(() => {
		                                		// 登陆成功后获取用户详细数据
		                                		resolve(data)
		                                	})
							            } else reject(error.get(503))
	                                },
	                                fail : (err) => reject(error.get(503))
	                            })
	                        } else reject(error.get(504))
	                    }
	                });
	            });
	        },
		},
		mounted() {
			wx.showLoading({
				title : '加载中'
			})
			this.onGetUserInfo()
            .then(res => {
				
				setTimeout(function() {
					wx.hideLoading();
					wx.redirectTo({
						url : '/pages/index/main'
					})
				}, 1000);
				
            })
	        .catch(err => {
	        	console.log(err)
	        	wx.hideLoading();
	        })
		}
	}
</script>

<style>
	Page {
		background : #fada39;
		width      : 100%;
		height     : 100%;
		overflow-x : hidden;
		overflow-y : auto;
	}
	.btn {
		width            : 300rpx;
		height           : 100rpx;
		margin           : 0 auto;
		line-height      : 100rpx;
		border-width     : 0;
		background-color : rgb(223, 167, 38);
	}
	.login {
		height          : 75vh;
		padding-top     : 5vh;
		display         : flex;
		justify-content : flex-start;
		align-items     : center;
		flex-direction  : column;
	}
	.img1 {
		width  : 600rpx;
		height : 400rpx;
	}
	.img2 {
		width  : 280rpx;
		height : 300rpx;
	}
</style>

