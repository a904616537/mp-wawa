<!--
# Sample Vuejs
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-06-14 16:26:51
* @Description
* @Flow 
-->

<template>
<div class="main" v-if="show">
	<div class="share">
		<div class="close" @click="onClose">X</div>
		<div class="row" v-for="(item, index) in row" :key="index">
			<div class="text">
				<p v-if="item.title != null">{{item.title}}</p>
				<p v-if="item.desc != null">{{item.desc}}</p>
			</div>
			<div class="btn_view">
				<button class="btn" open-type="share" @click="item.onPress">
					<p>{{item.btn_text}}</p>
					<p v-if="item.number != null">{{item.current}}/{{item.number}}</p>
				</button>
			</div>
		</div>
	</div>
</div>
</template>

<script>
	import Vue from 'vue';

	export default{
		data() {
			return {
				row : [
					{
						title     : '邀请好友+30币',
						desc     : '(对方充值，你得10%返现)',
						btn_text : '邀请',
						number   : 5,
						current  : 0,
						onPress  : () => {
							console.log('分享邀请')
						}
					},{
						title     : null,
						desc     : '(对方充值，你得10%返现)',
						btn_text : '分享',
						number   : 5,
						current  : 0,
						onPress  : () => {}
					},{
						title     : '每日分享+好运',
						desc     : null,
						btn_text : '下载',
						number   : 5,
						current  : 0,
						onPress  : () => {}
					},{
						title     : '登陆app签到/开宝箱领币',
						desc     : null,
						btn_text : '马上登陆',
						number   : null,
						current  : 0,
						onPress  : () => {}
					}
				]
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
			banner(){
				return Vue.store.getters.getBanner
			},
	    },
		methods: {
		    onPlay(obj) {
		    }
		},
		beforeMount() {
		}
	}
</script>

<style>
.main {
	width            : 100%;
	height           : 100%;
	top              : 0;
	left             : 0;
	z-index          : 999;
	display          : flex;
	align-items      : center;
	justify-content  : center;
	position         : absolute;
	background-color : rgba(0,0,0,0.4);
}
.share {
	width            : 80vw;
	padding          : 40rpx;
	border-radius    : 20rpx;
	border-width     : 2px;
	position         : relative;
	border-style     : solid;
	border-color     : rgb(29,152,129);
	background-color : #fff;
}
.close {
	top              : -30rpx;
	right            : -30rpx;
	width            : 60rpx;
	height           : 60rpx;
	border-radius    : 30rpx;
	color            : #fff;
	display          : flex;
	position         : absolute;
	align-items      : center;
	justify-content  : center;
	background-color : rgb(29,152,129);
}
.row {
	display        : flex;
	flex-direction : row;
	align-items    : stretch;
	margin         : 20rpx 0;
}
.text {
	width            : 70%;
	display          : flex;
	justify-content  : center;
	flex-direction   : column;
}
.text p {
	font-size: 14px;
}
.btn_view {
	width : 30%;
}
.btn_view .btn {
	width            : 100%;
	height           : 80rpx;
	display          : flex;
	justify-content  : center;
	align-items      : center;
	flex-direction   : column;
	background-color : rgb(29,152,129);
	border-radius: 10rpx;
}
.btn_view .btn p {
	line-height: 36rpx;
	font-size  : 28rpx;
	color      : #fff;
}
</style>

