/* create DOM handler to init app */
var node = document.createElement("DIV");     
node.id = 'bC_app';
document.getElementsByTagName("BODY")[0].appendChild(node);  

const bC_app_feed = {
	el: '#bC_app', 
	mixins : [
		appData,
		manager, 
		contractMethods,
		contractApi, 
		generators
	],
	template: `
		<div id="bC_app">
			<component-app/>
		</div>
		`,
	created: function () {
		/* get app main data from storage */
		chrome.storage.local.get([
			'app',
			'user',
			], this.initApplication);
	},
	methods: {
		initApplication(data){
			if(data.app){
				this.app = data.app;
			}
			if(data.user){
				this.user = data.user;
			}
		},
	},
	watch: {
		app: {
			handler(val){
				chrome.storage.local.set({app: val}, function () {/* success */});
			},
			deep: true
		},
		user: {
			handler(val){
				chrome.storage.local.set({user: val}, function () {/* success */});
			},
			deep: true
		},
	}
}
var bC_app = new Vue(bC_app_feed);