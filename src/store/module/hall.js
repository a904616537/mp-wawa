/**
# Sample Wechat MP
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-06-14 16:15:52
* @Description
* @Flow 
*/

import * as types  from '../mutation-types'

const state = {
	category : []
}

const actions = {
	onCategory({commit}, data) {
		commit(types.HALL_CATEGORY, data);
	}
}

// mutations
const mutations = {
	[types.HALL_CATEGORY] (state, data) {
		state.category = data;
	}
}

export default {
	state,
	actions,
	mutations
}