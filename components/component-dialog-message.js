var ComponentDialogMessage = Vue.extend({
  template: 
  `<div v-html="me.body"></div>`,
  props: ['me'],
})
Vue.component('component-dialog-message', ComponentDialogMessage);