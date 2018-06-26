/**
# Sample Wechat MP
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-06-14 16:15:52
* @Description
* @Flow 
*/

import * as types  from '../mutation-types'

const state = {
	user        : {},
	session_key : '',
	detail      : {},
	share       : null
}

const actions = {
	onLogin({commit}, data) {
		commit(types.LOGIN, data);
	},
	setSessionKey({commit}, data) {
		commit(types.SETSESSIONKEY, data);
	},
}

// mutations
const mutations = {
	[types.LOGIN] (state, data) {
		state.user = data;
	},
	[types.SETSESSIONKEY] (state, data) {
		state.session_key = data;
	},
	[types.USERDETAIL] (state, data) {
		state.detail = data;
	},
	[types.USER_PLAY] (state, data) {
		state.detail.room_card -= data;
	},
	[types.SETSHARE] (state, data) {
		state.share = data;
	},
}

export default {
	state,
	actions,
	mutations
}