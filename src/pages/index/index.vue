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
			>
				<block v-for="(item, index) in imgUrls" :key="index">
					<swiper-item>
				      	<image :src="item" class="slide-image"></image>
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
				indicatorColor: 'rgba(255,255,255,.3)',
				indicatorActiveColor: '#fff',
				autoplay: false,
				interval: 5000,
				duration: 1000,
				imgUrls: [
					'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
					'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
					'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
			    ]
			}
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
	.swiper{
		overflow: hidden;
		margin           : 20rpx;
		border-radius    : 20rpx;
		background-color : #f4f4f4;
	}
	.slide-image{
		width  : 100%;
		height : 360rpx;
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
	}
	.item-content{
		padding: 10rpx 20rpx;
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

