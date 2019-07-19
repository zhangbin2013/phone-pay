<template>
  <div id="app">
    <div @click="showPayPanel">支付</div>
    <!-- <vue-pay-pops :payPanelOptions="payPanelOptions" @inputOk="inputOk"></vue-pay-pops> -->
    <input type="text" v-model="pwd">
    <!-- <mt-switch v-model="value" @change="change"></mt-switch> -->
    <test-pay :payPanelOptions="payPanelOptions" @inputOk="inputOk"></test-pay>
  </div>
</template>

<script>

import axios from 'axios'
import TestPay from './lib/phone-pay'

export default {
  name: 'app',
  components: {
    TestPay
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      pwd: '',
      value: false,
      payPanelOptions: {
        isShow: false,
        pressKeyBackgorund: 'pink',
        pwdLength: 6
      }
    }
  },
  methods: {
    showPayPanel () {
      this.payPanelOptions.isShow = true
    },
    inputOk (res) {
      this.pwd = res
      axios.get(`http://94.191.49.231:3000/pwdtest?pwd=${res}`).then(res => {
        this.payPanelOptions.isShow = false
        if (res.data.result.msg === 'success') {
          // ok
          alert('验证通过')
        } else {
          // false
          alert('验证失败')
        }
      })
    }
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

</style>
