<template>
    <div class="container">
    	<img :src="src" class="rotary_img" />
    </div>
</template>

<script>

export default {
	data () {
		return {
			src : '../../static/image/rotary.jpg'
		}
	},

	components: {
	},

	methods: {
	},

	created () {
	}
}
</script>

<style scoped>
.rotary_img {
	width  : 60vh;
	height : 60vh;
}
</style>
