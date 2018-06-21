<template>
<div class="container" style="background-image: url('../../static/images/bg.png');">

	<div class="title">
		<img :src="title_src" style="width: 100%; height: 100%;" />
	</div>
	<div class="animation">
		<div class="pan" style="background-image: url('../../static/images/pan1.png');">
			<div class="panbg" :animation="aniData" style="background-image: url('../../static/images/pan2.png');">
				<div v-for="(item, index) in lottery" :key="index"  :class="('plate-box' + index)" >
					<p class="text-box">{{ item }}</p>
		        </div>
			</div>
		</div>
		<div @click="startRollTap" class="start" style="background-image: url('../../static/images/lucky_btn.png');"></div>
		<img :src="src" class="pointer">
	</div>
	<div class="footer">
		<div class="input">
			<p>本次：99币</p>
			<p>余额：99币</p>
		</div>
		<div class="btn">
			<p>免费获得娃娃币</p>
		</div>
		<div class="btn">
			<p>换一台</p>
		</div>
	</div>
	<div class="modal" v-if="showbag">
		<div class="bag" style="background-image: url('../../static/images/bag_bg.png');">
			<input type="text" name="bag" :value="bag_text" disabled />
			<img :src="btn_src" class="bag_btn" @click="showbag=false" />
		</div>
	</div>
	
</div>
</template>

<script>


export default {
	data () {
		return {
			btn_src       : '../../static/images/bag_btn.png',
			title_src     : '../../static/images/title.png',
			src           : '../../static/images/pointer.png',
			bag_text      : '',
			showbag       : false,
			aniData       : null,
			canRoll       : true, 				//加控制，防止用户点击两次
			num           : 1,					//用在动画上，让用户在第二次点击的时候可以接着上次转动的角度继续转
			lotteryArrLen : 0,					//放奖品的数组的长度
			lottery       : ['奖品1', '奖品2', '奖品3', '奖品4', '奖品5', '奖品6']	//放奖品
		}
	},

	components: {
	},

	methods: {
		onLoad(opt) {
			this.aniData = wx.createAnimation({
				duration       : 3000,
				timingFunction : 'ease'
			});
		},
		startRollTap() { //开始转盘
			if (this.canRoll) {
				this.onLoad();
				this.canRoll = false;
				let aniData  = this.aniData; //获取this对象上的动画对象
				let rightNum = ~~(Math.random() * this.lottery.length); //生成随机数
				console.log(`随机数是${rightNum}`);
				console.log(`奖品是：${this.lottery[rightNum]}`);
				const rotate = 3600 * this.num - 360 / this.lottery.length * rightNum;
				aniData.rotate(rotate).step();
				this.aniData = aniData.export()
				this.num++;
				this.canRoll = true;
				// 转盘结束后弹出结果
				setTimeout(() => {
					this.bag_text = this.lottery[rightNum]
					this.showbag = true;
				}, 3500);
			}
		}
	},

	created () {
	}
}
</script>

<style scoped>
.container {
	padding           : 5vh 0 0;
	background-size   : 100% 100%;
	width             : 100%;
	top               : 0px;
	bottom            : 0px;
	z-index           : 0;
	position          : absolute;
	overflow          : hidden;
	word-break        : break-all; 
	background-color  : red;
	background-repeat : no-repeat;
}
.title {
	width: 80vw;
	height: 30vw;
	margin-bottom: 3vh;
}
.animation {
	position: relative;
}
.pointer {
	z-index   : 999;
	width     : 5vh;
	height    : 8vh;
	left      : 50%;
	top       : 4%;
	transform : translate(-50%, -50%);
	position  : absolute;
}
.start {
	position          : absolute;
	z-index           : 999;
	left              : 50%;
	top               : 50%;
	transform         : translate(-50%, -50%);
	width             : 110rpx;
	height            : 110rpx;
	border-radius     : 50%;
	background-repeat : no-repeat;
	background-size   : 19vh 19vh;
	width             : 19vh;
	height            : 19vh;
}

.pan {
	display           : table-cell;
	vertical-align    : middle;
	text-align        : center;
	width             : 55vh;
	height            : 55vh;
	background-repeat : no-repeat;
	background-size   : 55vh 55vh;
}
.panbg {
	margin: 0 auto;
	width: 50vh;
	height: 50vh;
	background-repeat: no-repeat;
	background-size: 50vh 50vh;
}
.text-box {
	font-weight: bold;
}
.footer {
	width           :  100%;
	height          : 15vh;
	display         : flex;
	flex-direction  : row;
	justify-content : center;
	align-items     : center;
}
.btn {
	height           : 6vh;
	border-radius    : 3vh;
	padding          : 0 5vw;
	margin           : 0 2vw;
	display          : flex;
	justify-content  : center;
	align-items      : center;
	background-color : rgb(213,255,241);
	box-shadow       : 0px 3px 1px rgb(163,232,207);
}
.btn p {
	font-size : 14px;
	color     : #2da991;
}
.input p {
	color            : #2da991;
	margin           : 5px 0;
	padding          : 3px 10px;
	font-size        : 12px;
	border-radius    : 1vh;
	background-color : #fff;
}
.modal {
	top              : 0;
	left             : 0;
	width            : 100%;
	height           : 100%;
	z-index          : 999;
	display          : flex;
	justify-content  : center;
	align-items      : center;
	position         : absolute;
	background-color : rgba(0,0,0,0.4);
}
.bag {
	width             : 70vw;
	height            : 100vw;
	display           : flex;
	align-items       : center;
	justify-content   : flex-end;
	flex-direction    : column;
	background-size   : 100% 100%;
	background-repeat : no-repeat;
}
.bag input {
	color            : #b3581b;
	width            : 40vw;
	height           : 8vw;
	border           : solid 2px #ffd37d;
	padding          : 1vw 2vw;
	font-size        : 14px;
	margin-bottom    : 12vw;
	background-color : #fff;
}
.bag img {
	width         : 40vw;
	height        : 10vw;
	margin-bottom : 25vw;
}
.plate-box0 {
	position         : absolute;
	top              : 15%;
	left             : 50%;
	z-index          : 1;
	transform        : translate(-50%, -50%) rotate(0deg);
}
.plate-box1 {
	position         : absolute;
	top              : 35%;
	left             : 80%;
	z-index          : 1;
	transform        : translate(-50%, -50%) rotate(60deg);
}
.plate-box2 {
	position         : absolute;
	top              : 65%;
	left             : 80%;
	z-index          : 1;
	transform        : translate(-50%, -50%) rotate(120deg);
}
.plate-box3 {
	position         : absolute;
	top              : 85%;
	left             : 50%;
	z-index          : 1;
	transform        : translate(-50%, -50%) rotate(180deg);
}
.plate-box4 {
	position         : absolute;
	top              : 65%;
	left             : 20%;
	z-index          : 1;
	transform        : translate(-50%, -50%) rotate(240deg);
}
.plate-box5 {
	position         : absolute;
	top              : 35%;
	left             : 20%;
	z-index          : 1;
	transform        : translate(-50%, -50%) rotate(300deg);
}
</style>
