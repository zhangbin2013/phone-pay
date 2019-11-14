import vuePayPops from './phone-pay.vue' // 导入组件

const PayPop = {
  install (Vue, options) {
    Vue.component(vuePayPops.name, vuePayPops)
  }
}
export {
  vuePayPops
}
export default PayPop
