<template>
  <div id="pay">
    <!-- 输入框及键盘 -->
    <div :class="payPanelOptions.isShow?'pay-container pay-container-active':'pay-container'">
      <div v-if="!isLoding">
        <!-- 收入框 -->
        <div class="pay-pulldown" @click="pullDown">

          <svg t="1551670245182" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg" p-id="1038" xmlns:xlink="http://www.w3.org/1999/xlink" width="25"
               height="25">
            <path
              d="M512 704c8.288 0 15.776-3.232 21.456-8.4l0.064 0.08 352-320-0.08-0.08c6.448-5.856 10.56-14.208 10.56-23.6a32 32 0 0 0-32-32c-8.288 0-15.76 3.232-21.456 8.4l-0.08-0.08L512 628.752 181.536 328.32l-0.08 0.08A31.776 31.776 0 0 0 160 320a32 32 0 0 0-32 32c0 9.376 4.112 17.744 10.544 23.6l-0.08 0.08 352 320 0.08-0.08c5.68 5.168 13.168 8.4 21.456 8.4z"
              p-id="1039"></path>
          </svg>
        </div>
        <!-- 密码框 -->
        <div class="pay-password-panel">
          <div class="pay-password-border">
            <div class="pay-input" v-for="(item, index) in pwdLength" :key="index">
              <input type="password" :value="val[index]" disabled>
            </div>
          </div>
        </div>
        <!-- 键盘部分 -->
        <div class="pay-keyboard-border">
          <!-- 数字1-9的部分 -->
          <div class="pay-keyboard">
            <div class="pay-key-wrapper" v-for="item in keyBoards" :key="item">
              <div class="pay-key" @touchstart="val2input(item,$event)" @touchend="end($event)">
                {{item}}
              </div>
            </div>
          </div>
          <!-- 数字0和删除健部分 -->
          <div class="pay-keyboard-bottom">
            <div class="pay-key-bottom pay-key-blank"></div>
            <div class="pay-key-bottom ">
              <div class="pay-key" @touchstart="val2input(0,$event)" @touchend="end($event)">0</div>
            </div>
            <div class="pay-key-bottom pay-key-blank" @click="delVal()">

              <svg class="icon" width="40px" height="40.00px" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M469.39119709044934 637.4592522922666c4.734311578232098 4.734311578232098 11.83577829831111 7.101466720079011 16.57008987654321 7.101466720079011s11.83577829831111-2.3671551418469137 16.57008987654321-7.101466720079011l99.42053925925923-99.42053925925923 99.42053925925923 99.42053925925923c4.734311578232098 4.734311578232098 11.83577829831111 7.101466720079011 16.57008987654321 7.101466720079011s11.83577829831111-2.3671551418469137 16.57008987654321-7.101466720079011c9.468623156464195-9.468623156464195 9.468623156464195-23.67155659662222 0-33.14017975308642l-99.42053925925923-99.42053925925923 99.42053925925923-99.42053925925923c9.468623156464195-9.468623156464195 9.468623156464195-23.67155659662222 0-33.14017975308642s-23.67155659662222-9.468623156464195-33.14017975308642 0l-99.42053925925923 99.42053925925923-99.42053925925923-99.42053925925923c-9.468623156464195-9.468623156464195-23.67155659662222-9.468623156464195-33.14017975308642 0s-9.468623156464195 23.67155659662222 0 33.14017975308642l99.42053925925923 99.42053925925923-99.42053925925923 99.42053925925923c-7.101466720079011 9.468623156464195-7.101466720079011 23.67155659662222 0 33.14017975308642z"
                  fill="#8a8a8a"/>
                <path
                  d="M341.56478965633585 814.9959293560098h591.7889239773234c26.038713033007408 0 47.343114487782714-21.304401454775306 47.343114487782714-47.343114487782714V239.77709525522965c0-26.038713033007408-21.304401454775306-47.343114487782714-47.343114487782714-47.343114487782714h-591.7889239773234c-11.83577829831111 0-23.67155659662222 0-310.09739607608884 298.2616177777778-9.468623156464195 9.468623156464195-9.468623156464195 23.67155659662222 0 33.14017975308642 288.79299462131354 291.1601510576987 298.2616177777778 291.1601510576987 310.09739607608884 291.1601510576987z m7.101466720079011-575.21883410078h584.6874572572444v527.8757196129975H348.6662563764148c-28.40586817485432-21.304401454775306-151.49796403073577-144.39649731065677-265.1214380246914-262.7542815883061 113.62347399395556-118.35778427764939 239.08272499168393-243.81703656991604 265.1214380246914-265.1214380246914z"
                  fill="#8a8a8a"/>
              </svg>

            </div>
          </div>
        </div>
      </div>
      <!-- 加载部分 -->
      <div v-if="isLoding" class="loding">
        <svg t="1551779942699" class="icon" style="" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="2547" xmlns:xlink="http://www.w3.org/1999/xlink" width="40"
             height="40">
          <path
            d="M512.032002 237.105181a29.310168 29.310168 0 0 1-29.310168-29.246172V29.310168a29.310168 29.310168 0 0 1 58.620336 0v178.548841A29.310168 29.310168 0 0 1 512.032002 237.105181zM512.032002 1024a29.310168 29.310168 0 0 1-29.310168-29.310168v-178.484845a29.310168 29.310168 0 1 1 58.620336 0v178.548841A29.310168 29.310168 0 0 1 512.032002 1024z m482.657834-482.657834h-178.484845a29.310168 29.310168 0 1 1 0-58.620336h178.548841a29.310168 29.310168 0 1 1 0 58.620336z m-786.830823 0H29.310172a29.310168 29.310168 0 0 1 0-58.620336h178.548841a29.310168 29.310168 0 0 1 0 58.620336z m519.263546-215.090557a29.182176 29.182176 0 0 1-20.734704-49.980876l126.264108-126.264108a29.310168 29.310168 0 1 1 41.405412 41.405412l-126.264108 126.264108a29.182176 29.182176 0 0 1-20.670708 8.575464zM170.741333 882.568839a29.182176 29.182176 0 0 1-20.734704-49.980876l126.264108-126.264108a29.246172 29.246172 0 1 1 41.405412 41.405412L191.412041 874.057371a29.182176 29.182176 0 0 1-20.670708 8.575464z m682.581338 0a29.182176 29.182176 0 0 1-20.670708-8.575464l-126.264108-126.264108a29.310168 29.310168 0 1 1 41.405412-41.405412l126.264108 126.264108a29.310168 29.310168 0 0 1-20.734704 49.91688zM297.005441 326.251609a29.182176 29.182176 0 0 1-20.670708-8.575464L150.006629 191.412037a29.310168 29.310168 0 1 1 41.405412-41.405412l126.264108 126.264108a29.310168 29.310168 0 0 1-20.734704 49.91688z"
            p-id="2548" fill="#8a8a8a"></path>
        </svg>
        <div>正在支付中，请稍后</div>
      </div>
    </div>

    <!-- 遮罩层 -->
    <div class="mask" v-show="payPanelOptions.isShow"></div>
  </div>
</template>
<script>
export default {
  name: 'phone-pay',
  props: ['payPanelOptions'],
  data () {
    return {
      pwdLength: this.payPanelOptions.pwdLength || 6,
      // 背景色
      pressKeyBackgorund: this.payPanelOptions.pressKeyBackgorund || '#ccc',
      // 键盘数字(1~9)
      keyBoards: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      // 键入的值
      val: [],
      isLoding: this.payPanelOptions.isLoding || false

    }
  },

  methods: {
    val2input (value, ev) {
      this.val.push(value)
      ev.target.style.backgroundColor = this.pressKeyBackgorund
      if (this.val.length === this.pwdLength) {
        // 输入完毕后将值传递给父组件
        this.$emit('inputOk', this.val.join(''))
        // 清空数据
        this.val = []
        // this.payPanelOptions.isShow= false
        this.isLoding = true
      }
    },
    end (ev, flag) {
      ev.target.style.backgroundColor = '#f6f6f6'
    },
    delVal () {
      if (this.val.length > 0) this.val.pop()
    },
    pullDown () {
      // 收起下拉面板
      this.payPanelOptions.isShow = false
      // 清空数据
      this.val = []
    }
  },
  watch: {
    payPanelOptions: {
      handler (newValue, oldValue) {
        this.isLoding = false
      },
      deep: true
    }
  }
}
</script>
<style scoped>
  /* 遮罩层 */
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .5);
    z-index: 9;
  }

  /* 面板下拉上升的动画 */
  .pay-container {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0px;
    height: 400px;
    bottom: -400px;
    background: #f6f6f6;
    border-top: 1px solid #c7c7c7;
    z-index: 99;
    overflow: hidden;
    transition: transform .2s;
    transform: translateY(0);
  }

  .pay-container-active {
    transition: transform .2s;
    transform: translateY(-400px);
  }

  /* 下拉框部分的css */
  .pay-pulldown {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    border-bottom: 1px solid #cccccc;
  }

  /* 密码框部分的css */
  .pay-password-panel {
    height: 100px;
    background: #eee;
    padding: 30px;
    box-sizing: border-box;
  }

  .pay-input {
    flex: 1;
    height: 40px;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
    background-color: white;
  }

  .pay-password-border {
    border: 1px solid #ccc;
    border-right: 0px;
    display: flex;
  }

  .pay-input input {
    width: 100%;
    height: 100%;
    font-size: 30px;
    text-align: center;
    background: none;
    outline: none;
    border: none;
  }

  /* 键盘部分的css */
  .pay-keyboard-border {
    border-left: 1px solid #ccc;
    border-top: 1px solid #ccc;
  }

  .pay-keyboard {
    position: relative;
    display: flex;
    flex-wrap: wrap;

  }

  .pay-key-wrapper {
    background-color: #f6f6f6;
    width: 33.3%;
    height: 65px;
    box-sizing: border-box;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  .pay-key {
    font-size: 32px;
    text-align: center;
    line-height: 63px;
    width: 100%;
  }

  /* 键盘最底下的部分 */
  .pay-keyboard-bottom {
    display: flex;
    height: 65px;
  }

  .pay-key-bottom {
    width: 33.3%;
    display: flex;
    height: 65px;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  .pay-key-blank {
    background-color: #eee;
  }

  /* 加载动画 */
  .loding {
    padding: 100px;
  }

  .loding div {
    padding-top: 30px;
  }

  .loding svg {
    -webkit-animation: loader 2s ease-in-out infinite alternate;
    animation: loader 2s ease-in-out infinite alternate;
  }

  @keyframes loader {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(720deg);
    }
  }

  /* 防止长按选择文本 */
  * {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
</style>
