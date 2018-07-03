<!--
# Sample Vuejs
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-06-14 16:26:51
* @Description
* @Flow 
-->

<template>
<div class="main" v-if="show">
	<div class="loginview">
		<div class="icon">
			<image class="icon_img" src="https://c.waguo.net/static/wxapps/images/icon.png"/>
		</div>
		<div class="desc">
			<p>需要授权才可以继续哦！</p>
		</div>
		<button
		lang            = "zh_CN"
		class           = "btn"
		open-type       = "getUserInfo"
		@getuserinfo 	= "onGotUserInfo">
			授权登陆
		</button>
	</div>
</div>
</template>

<script>
	import Vue        from 'vue';
	import WxCrypt    from '../../utils/WXBizDataCrypt';
	import login_help from '../../utils/login_help';
	import store      from '../../store';

	const error = new Map([
	    [501, '用户未授权'],
	    [502, '用户信息获取失败'],
	    [503, '服务器响应失败'],
	    [504, '微信响应失败'],
	    [505, '登陆失败']
	]);

	export default{
		data() {
			return {
			}
		},
		props : {
			onClose : {
				type    : Function,
				default : () => {console.log('close')}
			},
			show    : {
				type    : Boolean,
				default : false
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
		methods: {
		    onGotUserInfo(e) {
		    	login_help.onGotUserInfo(e, err => {
		    		if(err){
		    			wx.showToast({
							title    : err,
							icon     : 'none',
							duration : 2000
						})
		    		} else {
		    			this.onClose();
		    			wx.hideLoading();
		    		}
		    		
		    	})
			},
		}
	}
</script>

<style>
button {
	border     : none;
	background : none;
	border-radius: 0;
}
button::after {
  border: none;
}
.main {
	width            : 100%;
	height           : 100%;
	top              : 0;
	left             : 0;
	z-index          : 999;
	display          : flex;
	align-items      : center;
	justify-content  : center;
	position         : fixed;
	background-color : rgba(0,0,0,0.4);
}
.loginview {
	width            : 60vw;
	border-width     : 1px;
	position         : relative;
	border-style     : solid;
	border-color     : #eee;
	background-color : #fff;
}
.desc {
	height  : 40rpx;
	padding : 10rpx;
}
.desc p {
	font-size : 20rpx;
	color     : #ccc;
}
.icon {
	padding         : 40rpx 0;
	display         : flex;
	align-items     : center;
	justify-content : center;
}
.icon_img {
	width         : 100rpx;
	height        : 100rpx;
	border-radius : 50rpx;
}
.btn {
	height      : 100rpx;
	margin      : 0 auto;
	line-height : 100rpx;
	border-top  : 1px solid #eee;
	color       : rgb(223, 167, 38);
	font-size   : 24rpx;
}
</style>

