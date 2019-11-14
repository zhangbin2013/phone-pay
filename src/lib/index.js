import phonePay from './phone-pay.vue'; // 导入组件

const components = [
  phonePay
];

const install = function(Vue, options) {
  components.forEach(component => {
    Vue.component(component.name, component);
  })

};

/* istanbul ignore if */
if(typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export {
  phonePay
};

export default {
  version: '1.0.6',
  install,
  phonePay
};
