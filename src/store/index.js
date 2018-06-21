/**
* Sample React Redux
* @Author: Kain·Shi <a904616537@outlook.com>
* @DateTime:    2018-06-14 15:38:06
* @Description
* @Flow 
*/

import Vue          from 'vue'
import Vuex         from 'vuex'
import * as actions from './actions'
import  Counter     from './module/counter'
import  User     from './module/user'

Vue.use(Vuex)

const store = new Vuex.Store({
	actions,
	modules : {
		Counter,
		User
	},
	// strict  : debug
})

export default store
