/* create DOM handler to init app */
var node = document.createElement("DIV");     
node.id = 'bC_app';
document.getElementsByTagName("BODY")[0].appendChild(node);  

const bC_app_feed = {
	el: '#bC_app', 
	mixins : [
		appData,
		manager, 
		itemsList,
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
			// 'user',
			'documents',
			'variables',
			], this.initApplication);
	},
	methods: {
		initApplication(data){
			if(data.app){
				this.app = data.app;
			}
			// if(data.user){
			// 	this.user = data.user;
			// }
			if(data.documents){
				this.documents = data.documents;
			}
			if(data.variables){
				this.variables = data.variables;
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
		// user: {
		// 	handler(val){
		// 		chrome.storage.local.set({user: val}, function () {/* success */});
		// 	},
		// 	deep: true
		// },
		documents: {
			handler(val){
				chrome.storage.local.set({documents: val}, function () {/* success */});
			},
			deep: true
		},
		variables: {
			handler(val){
				chrome.storage.local.set({variables: val}, function () {/* success */});
			},
			deep: true
		},
	}
}
var bC_app = new Vue(bC_app_feed);