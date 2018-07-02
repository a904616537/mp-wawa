<!--
# Sample Vuejs
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-06-14 16:26:51
* @Description
* @Flow 
-->

<template>
	<div class="home">
		<div class="swiper">
			<swiper
			style ="height : 360rpx;"
			:autoplay="autoplay"
			:interval="interval"
			:duration="duration"
			:indicatorDots="indicatorDots"
			:indicatorColor="indicatorColor"
			:indicator-active-color="indicatorActiveColor"
			>
				<block v-for="(item, index) in banner" :key="index">

					<swiper-item class="swiper-item">
						<div :style="'background-image: url('+item.pic+');'" class="slide-image"></div>
				    </swiper-item>
				</block>
			</swiper>
		</div>
		<div class="list-box">
			<div v-for="(item, index) in sortList" :key="index" class="list-item" @click="onPlay(item)">
				<div class="inner">
					<div class="img-style" :style="'background-image: url('+item.gift_pic+');'"></div>
					<div class="item-content">
						<h3>{{item.gift_name}}</h3>
						<div class="item-bottom">
							<div class="price bottom-style">{{item.gold_price}}币/次</div>
							<!-- <div class="status bottom-style" v-if="free? true : false"><div class="radius"></div>空闲中</div>
							<div class="status-nofree" v-if="free? false : true"><div class="radius-nofree"></div>召唤中</div> -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<v-login :show="show" :onClose="onClose"/>
	</div>
</template>

<script>
	import Vue     from 'vue';
	import Login   from './login';
	import WxCrypt from '../../utils/WXBizDataCrypt';
	import login_help from '../../utils/login_help';
	import store   from '../../store';


	export default{
		data() {
			return {
				show                 : false,
				free                 : false,
				indicatorDots        : true,
				indicatorColor       : 'rgba(255,255,255,.4)',
				indicatorActiveColor : '#fff',
				autoplay             : true,
				interval             : 5000,
				duration             : 1000,
				list                 : []
			}
		},
		onLoad(option){
	        this.props = {...option}
	    },
	    components: {
			'v-login' : Login
		},
		computed: {
			banner(){
				return store.getters.getBanner
			},
			isLogin() {
				return store.getters.isLogin
			},
			sortList() {
				return this.list.map(val => {
		    		let category = store.state.Hall.category.find(v => v.key === val.gift_category)
		    		if(!category) category = store.state.Hall.category.find(v => v.key === 0)
		    		return Object.assign(val, {...category});
		    	}).sort((a,b) => a.order - b.order);
			},
			user () {
	        	return store.state.User.user
	        },
	        shareData() {
	        	return store.state.User.share
	        }
	    },
		methods: {
			onClose() {
				this.show = false;
			},
		    onPlay(obj) {
		    	const url = `/pages/rotary/main?gift_no=${obj.gift_no}&gift_name=${obj.gift_name}&gsid=${obj.gsid}&gift_pic=${obj.gift_pic}&gold_price=${obj.gold_price}`;
		    	wx.navigateTo({
					url
				})
		    },
		    onRefresh() {
		    	wx.request({
					url     : `${Vue.setting.api}mobile/wawa_list`,
					success : (result) => this.list = result.data.data,
					fail    : (err) => {
						wx.showToast({
							title    : '网络错误',
							icon     : 'none',
							duration : 2000
						})
					}
                })
		    }
		},
		beforeMount() {
			this.onRefresh();

			wx.showLoading({
				title : '加载中'
			})
			login_help.onGetUserInfo()
            .then(res => {
            	if(!this.isLogin) {
					this.show = true;
				}
				setTimeout(() => {
					this.onClose();
					wx.hideLoading();
				}, 1000);
            })
	        .catch(err => {
	        	if(!this.isLogin) {
					this.show = true;
				}
	        	wx.hideLoading();
	        })
		}
	}
</script>

<style>
	Page {
		background : #f3f0e3;
		width      : 100%;
		height     : 100%;
		overflow-x : hidden;
		overflow-y : auto;
	}
	swiper{
	}
	.swiper{
		margin : 20rpx;
	}

	.swiper .slide-image{
		width           : 100%;
		height          : 360rpx;
		background-size : cover;
		border-radius   : 20rpx;
		overflow        : hidden;
	}
	.list-box{
		padding: 0 10rpx;
	}
	.list-item{
		width         : 50%;
		float         : left;
		overflow      : hidden;
		font-size     : 28rpx;
		margin-bottom : 20rpx;
	}
	.list-box:after,.item-bottom:after{
		clear    : both;
		height   : 0;
		content  : '.';
		display  : block;
		overflow : hidden;
	}
	.list-item .inner{
		margin           : 0 10rpx;
		border-radius    : 10rpx;
		background-color : #fff;
	}
	.img-style{
		background-color: #d6d3d4;
		height: 260rpx;
		border-radius: 10rpx;
		background-size: cover;
	}
	.item-content{
		padding: 10rpx 14rpx;
		color: #BF6A0B;
	}
	.list-item .item-bottom{
		font-size: 24rpx;
		margin-bottom: 20rpx;
		font-weight: 300;
	}
	.item-bottom .price{
		float: left;
	}
	.item-bottom .status{
		float: right;
		color: #B7E549;
	}
	.item-bottom .radius{
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		background-color: #B7E549;
		display: inline-block;
		margin-right: 5rpx;
	}
	.item-bottom .status-nofree{
		float: right;
		color: #D5443D;
	}
	.item-bottom .radius-nofree{
		width: 20rpx;
		height: 20rpx;
		border-radius: 50%;
		background-color: #D5443D;
		display: inline-block;
		margin-right: 5rpx;
	}
</style>

