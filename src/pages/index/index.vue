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
			<swiper :autoplay="autoplay" :interval="interval" :duration="duration" :indicatorDots="indicatorDots" :indicatorColor="indicatorColor" 
			:indicator-active-color="indicatorActiveColor">
				<block v-for="img in imgUrls" :key="index">
					<swiper-item>
				      	<image :src="imgUrls" class="slide-image" alt="imgs"></image>
				    </swiper-item>
				</block>
			</swiper>	
		</div>
		<div class="list-box">
			<div class="list-item">
				<div class="inner">
					<div class="img-style"></div>
					<div class="item-content">
						<h3>{{name}}</h3>
						<div class="item-bottom">
							<div class="price bottom-style">{{price}}币/次</div>
							<div class="status bottom-style" v-if="free? true : false"><div class="radius"></div>空闲中</div>
							<div class="status-nofree" v-if="free? false : true"><div class="radius-nofree"></div>召唤中</div>
						</div>
					</div>
				</div>
			</div>
			<div class="list-item">
				<div class="inner">
					<div class="img-style"></div>
					<div class="item-content">
						<h3>{{name}}</h3>
						<div class="item-bottom">
							<div class="price">{{price}}币/次</div>
							<div class="status bottom-style" v-if="free? true : false"><div class="radius"></div>空闲中</div>
							<div class="status-nofree" v-if="free? false : true"><div class="radius-nofree"></div>召唤中</div>
						</div>
					</div>
				</div>
			</div>
			<div class="list-item">
				<div class="inner">
					<div class="img-style"></div>
					<div class="item-content">
						<h3>{{name}}</h3>
						<div class="item-bottom">
							<div class="price">{{price}}币/次</div>
							<div class="status"><div class="radius"></div>空闲中</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

	export default{
		data() {
			return {
				name: '商品名称',
				price: 18,
				free: false,
				indicatorDots: true,
				indicatorColor: 'rgba(255,255,255,.4)',
				indicatorActiveColor: '#fff',
				autoplay: true,
				interval: 5000,
				duration: 500,
				imgUrls: [],
				userInfo: {}
			}
		},
		methods: {
			getUserInfo () {
		      	// 调用登录接口
		      	wx.login({
		        	success: (res) => {
		        		if(res.code) {
		        			wx.request({
		        				url : '',
		        				data: {
		        					code: res.code
		        				},
		        				method: 'POST',
		        				header: {'content-type': 'application/json'},
		        				success: function(data){
		        					console.log(data)
		        				}
		        			})
		        			wx.getUserInfo({
			            		success: (res) => {
			              			this.userInfo = res.userInfo
			            		},
			          		})
		        		}else {
		        			console.log('获取用户登录态失败！' + res.errMsg)
		        		}
		        	}
		      	})
		    },
		},
		created () {
		    // 调用应用实例的方法获取全局数据
		    this.getUserInfo()
		}
	}
</script>

<style>
	Page {
	  background: #f3f0e3;
	  width: 100%;
	  height: 100%;
	  overflow-x: hidden;
	  overflow-y: auto;
	}
	swiper{
		height: 360rpx;
	}
	.swiper{
		margin: 20rpx;
		background-color: #f4f4f4;
		border-radius: 20rpx;	
	}
	.swiper .slide-image{
		width: 100%;
		height: 360rpx;
		background-size: cover;
		overflow: hidden;
	}
	.list-box{
		padding: 0 10rpx;
	}
	.list-item{
		width: 50%;
		float: left;
		overflow: hidden;
		margin-bottom: 20rpx;
		font-size: 28rpx;
	}
	.list-box:after,.item-bottom:after{
		content: '.';
		clear: both;
		display: block;
		height: 0;
		overflow: hidden;
	}
	.list-item .inner{
		margin: 0 10rpx;
		border-radius: 10rpx;
		background-color: #fff;
	}
	.img-style{
		background-color: #d6d3d4;
		height: 260rpx;
		border-radius: 10rpx;
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

