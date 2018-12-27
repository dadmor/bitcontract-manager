var ComponentUploader = Vue.extend({
  template: 
  `<fieldset>
    <form id="jsonFile" name="jsonFile" enctype="multipart/form-data" method="post">
      <p>Select contract file to load as .json file</p>
      <input type="file" @change="processFile($event)">
      <div v-if="message" class="field-message">{{message}}</div>
    </form>
  </fieldset>`,
  props: ['me'],
  data: function(){
    return {
      fileinput: {},
      message: false,
    }
  },
  methods: {
    processFile(event) {
      const fr = new FileReader();
      fr.onload = this.receivedText;
      fr.readAsText(event.target.files[0]);
      let ref_message = this.message;
    },
    receivedText(e) {
      try{
        this.message = false;
        if(this.me.method){
          window.scrollTo(0,0);
          this.$root[this.me.method](JSON.parse(e.target.result));
        }
      }catch(err){
        /* show message */
        this.message = 'Script fromat error. Please load atother file';
      }
    }
  },
})
Vue.component('component-uploader', ComponentUploader);