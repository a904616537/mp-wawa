/**
* FileType js
* Sample React Redux 
* @Author: Kain·Shi <a904616537@outlook.com>
* @DateTime:    2018-07-02 10:52:43
* @Description
* @Flow 
*/

import Vue     from 'vue';
import WxCrypt from './WXBizDataCrypt';
import store   from '../store';


	const error = new Map([
	    [501, '用户未授权'],
	    [502, '用户信息获取失败'],
	    [503, '服务器响应失败'],
	    [504, '微信响应失败'],
	    [505, '登陆失败']
	]);


export default {
	onSetSessionKey (key) {
        store.commit('user/session_key', key)
    },
    onLogin (user) {
        store.commit('user/login', user)
    },
	onWXApp(user) {
		return new Promise((resolve, reject) => {
			const data = {
				nickname : user.nickName,
				openid   : user.openId,
				unionid  : user.unionId,
				avatar   : user.avatarUrl,
				gender   : user.gender
			}
	    	wx.request({
				url     : `${Vue.setting.api}mobile/wx_app`,
				data    : data,
				success : (result, req) => {
	            	store.commit('banner/set', result.data.contentconfig.find(val => val.id == 10));
	            	store.commit('hall/category', result.data.category);
	            	store.commit('user/detail', {user : result.data.user, token : result.data.login.token});
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
                        this.onGetLogin()
                        .then(userdata => {
                        	// 登陆服务器响应成功
                        	const {session_key, openid} = userdata.data;
                        	
                        	wx.getUserInfo({
	                    		success : (res) => {
	            					const {encryptedData, iv} = res;

		                        	const pc = new WxCrypt(Vue.setting.appid, session_key);
		                        	if(store.state.User.share) {
		                        		this.share = pc.decryptData(store.state.User.share.encryptedData, store.state.User.share.iv)
		                        	}
		                        	
						            const data = pc.decryptData(encryptedData , iv)
						            if(data) {
						            	this.onSetSessionKey(session_key);
		                            	this.onLogin(data);
		                            	this.onWXApp(data)
		                            	.then(() => {
		                            		console.log('share', this.share)
		                            		if(this.share) {
			                        			this.onRequstShare(this.share.openGId);
			                        		}
		                            		// 登陆成功后获取用户详细数据
		                            		resolve(data)
		                            	})
						            } else reject(error.get(503))
	                			},
                				fail : (err) => reject(error.get(502))
                			})
                        })
                        .catch((err) => {
                        	console.log('err', err)
                        	reject(error.get(503))
                        })
	                } else reject(error.get(501))
	            },
	            fail : (err) => reject(error.get(501))
	        });
	    });
	},
	onGotUserInfo(e, callback) {
		if(e.mp.detail.rawData){

			wx.showLoading({
				title : '加载中'
			})

			//用户按了允许授权按钮
			console.log('用户按了允许授权按钮')
			const {encryptedData, iv} = e.mp.detail;
	        this.onGetUserInfo()
	        .then(userdata => {
	        	setTimeout(() => {
	        		callback(false)
					wx.hideLoading();
				}, 1000);
	        })
	        .catch(() => {
				callback(error.get(503))
	        })
		} else {
			//用户按了拒绝按钮
			console.log('用户按了拒绝按钮')
			callback(error.get(501))
		}
	},
	onGetLogin() {
	    return new Promise((resolve, reject) => {
	        wx.login({
	            success : (res) => {
	                if (res.code) {
	                    wx.request({
							url     : `${Vue.setting.api}mobile/wx_code`,
							data    : { code : res.code },
							success : (result) => resolve(result),
							fail    : (err) => {
	                        	console.log('err', err)
	                        	reject(error.get(503))
	                        }
	                    })
	                } else reject(error.get(504))
	            }
	        });
	    });
	},
	onRequstShare(gid) {
		const data = {
			team_union : gid,
			uid        : store.state.User.share_uid,
			token      : store.state.User.token,
		}
		console.log('data', data);
		wx.request({
			url     : `${Vue.setting.api}mobile/share_team_get`,
			data    : data,
			success : (result, req) => {
				console.log('result share_team_get', result)
            }
        })
	}
}