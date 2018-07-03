<!--
# Sample Vuejs
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-06-14 16:26:51
* @Description
* @Flow 
-->

<template>
<div class="main" v-if="show">
	<div class="bgview" style="background-image: url('https://c.waguo.net/static/wxapps/images/new_user.png');">
		<p>55娃娃币已放入您的账号</p>
		<img :src="btn_src" class="close_btn" @click="onClose"/>
	</div>
</div>
</template>

<script>
import Vue        from 'vue';
import store      from '../../store';

export default{
	data() {
		return {
			btn_src : 'https://c.waguo.net/static/wxapps/images/1529633822x-1404817874.png',
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
	}
}
</script>

<style>
.bgview {
	width             : 300px;
	height            : 400px;
	border-radius     : 70rpx;
	display           : flex;
	align-items       : center;
	justify-content   : flex-end;
	flex-direction    : column;
	bottom : 0;
	background-size   : 100% 100%;
	background-repeat : no-repeat;
}
.bgview p {
	color            : #b3581b;
	width            : 40vw;
	height           : 30px;
	font-size        : 26rpx;
	margin-bottom    : 40px;
}
.bgview .close_btn{
	width         : 40vw;
	height        : 45px;
	margin-bottom : 100px;
}
</style>

