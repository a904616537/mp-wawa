/**
# Sample Wechat MP
* @Author: Sumi <xumin.1991@163.com>
* @DateTime:    2018-06-15 15:51:29
* @Description
* @Flow 
*/


import Vue from 'vue'
import App from './App'
import store from './store'

App.mpType               = 'app';
Vue.config.productionTip = false;
Vue.store                = store;
Vue.setting              = {
    api       : 'https://waguo.vip/',
    appid     : 'wx45f7a61a75ccf686',
    socketUrl : 'ws://106.14.112.101:80'
}

const app = new Vue(App)
app.$mount()

export default {
    // 这个字段走 app.json
    config: {
        // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        pages  : ['^pages/login/main', 'pages/index/main', 'pages/rotary/main'],
        window : {
            backgroundTextStyle          : 'light',
            navigationBarBackgroundColor : '#f2d56e',
            navigationBarTitleText       : '抓娃娃王国',
            navigationBarTextStyle       : 'black',
        }
    }
}



