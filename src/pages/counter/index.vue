<!--
* Sample Vuejs 
* @Author: Kain·Shi <a904616537@outlook.com>
* @DateTime:    2018-06-14 16:11:17
* @Description
* @Flow 
-->

<template>
    <div class="counter-warp">
        <p>Vuex counter：{{ count }}</p>
        <p>
            <button @click="increment">+</button>
            <button @click="decrement">-</button>
        </p>

        <a href="/pages/index/main" class="home">去往首页</a>
    </div>
</template>

<script>
// Use Vuex
import store from '../../store'


export default {
    computed: {
        count () {
          return store.state.Counter.count
        }
    },
    methods: {
        increment () {
            // @params ([string], [object]) 
            store.commit('counter/increment', {count :1})
        },
        decrement () {
            store.commit('counter/decrement', {})
        }
    }
}
</script>

<style>
.counter-warp {
    text-align : center;
    margin-top : 100px;
}
.home {
    display : inline-block;
    margin  : 100px auto;
    padding : 5px 10px;
    color   : blue;
    border  : 1px solid blue;
}
</style>
