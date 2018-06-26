/**
# Sample Wechat MP
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-06-14 16:15:52
* @Description
* @Flow 
*/

export const getBanner = (state, getters) => {
	return JSON.parse(state.Banner.banner.content)
}
