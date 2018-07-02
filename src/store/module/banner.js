/**
# Sample Wechat MP
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-06-14 16:15:52
* @Description
* @Flow 
*/

import * as types  from '../mutation-types'

const state = {
	banner : [{
		name : "六一",
		pic  : "http://c.waguo.net//static/images/shangchengtu.png"
	}]
}

const actions = {
	setBanner({commit}, data) {
		commit(types.SET_BANNER, data);
	},
}

// mutations
const mutations = {
	[types.SET_BANNER] (state, data) {

		state.banner = JSON.parse(data.content);
	}
}

export default {
	state,
	actions,
	mutations
}