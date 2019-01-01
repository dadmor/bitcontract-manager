var ComponentGtm = Vue.extend({
  template: 
  `<div>
  	<h2>Google Tag Manager clicks meter (contract job plugin)</h2>
  </div>`,
  props: ['me'],
})
Vue.component('component-gtm', ComponentGtm);