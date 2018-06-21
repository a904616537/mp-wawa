<script>
import Vue     from 'vue';

export default {
    methods: {
    },
    created() {
        wx.connectSocket({
            url    : Vue.setting.socketUrl,
            data   : {},
            header : { 'content-type': 'application/json' },
            method : "GET",
            success : (socket) => {
                console.log('socket 链接成功', socket)
            },
            fail : (err) => {
                console.log('socket 链接失败', err)
            }
        })
        
        wx.onSocketOpen(function(res){
            console.log('WebSocket连接已打开！', res)
        })
        wx.onSocketError(function(res){
            console.log('WebSocket连接打开失败，请检查！')
        })

        wx.onSocketMessage(function(res) {
            console.log('收到服务器内容：' + res.data)
        })
        
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
