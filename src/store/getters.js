/**
# Sample Wechat MP
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-06-14 16:15:52
* @Description
* @Flow 
*/

export const getBanner = (state, getters) => {
	if(state.Banner.banner) return state.Banner.banner;
	else return []
}

export const isLogin = (state, getters) => {
	if(state.User.token) return true;
	else return false;
}
