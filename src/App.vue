<script>
import Vue from 'vue';

export default {
    onLaunch(ops) {
        if (ops.scene == 1044) {
            wx.getShareInfo({
                shareTicket : ops.shareTicket,
                success     : (res) => { 
                    Vue.store.commit('user/share', res)
                },
                fail        : (res) => { console.log('error', res) },
                complete    : (res) => { console.log('complete') }
            })
        }
    },
    methods: {
    },
    created() {
        // wx.connectSocket({
        //     url    : Vue.setting.socketUrl,
        //     data   : {},
        //     header : { 'content-type': 'application/json' },
        //     method : "GET",
        //     success : (socket) => {
        //         console.log('socket 链接成功', socket)
        //     },
        //     fail : (err) => {
        //         console.log('socket 链接失败', err)
        //     }
        // })
        
        // wx.onSocketOpen((res) => {
        //     console.log('WebSocket连接已打开！')
             
        //     const user = {
        //         uid  : 1994819,
        //         un   : "74ABA651-B556-4406-B556-4C03E0BE59DB@mobile",
        //         nn   : "iPhone 6 Plus",
        //         key  : "2ea954706f4532d34733bc4bb3af99c3|1|iPhone 6 Plus|zh_CN"
        //     }
        //     var mCmd = { "cmd": "connector.user.login", "data": user }
        //     console.log('JSON.stringify(user)', JSON.stringify(mCmd))
        //     wx.sendSocketMessage({
        //         data : JSON.stringify(mCmd),
        //         success : (res) => {
        //             console.log('WebSocket 发送返回消息！', res)
        //         }
        //     })
        //     wx.onSocketMessage((res) => {
        //         console.log('收到服务器内容：' + res.data)
        //     })
        // })

        // wx.onSocketError((res) => {
        //     console.log('WebSocket连接打开失败，请检查！')
        // })
        
    }
}
</script>

<style>
.container {
    height          : 100%;
    display         : flex;
    flex-direction  : column;
    align-items     : center;
    justify-content : space-between;
    padding         : 200rpx 0;
    box-sizing      : border-box;
}
/* this rule will be remove */
* {
    transition         : width 2s;
    -moz-transition    : width 2s;
    -webkit-transition : width 2s;
    -o-transition      : width 2s;
}
</style>
