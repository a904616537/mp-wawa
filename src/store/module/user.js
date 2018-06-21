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
	}
}

export default {
	state,
	actions,
	mutations
}