var componentForm = Vue.extend({
	template: 
	`<div>
		<div class="flex" style="align-items: center;">
			<div 
				style="border: 1px solid #607D8B;
				flex: 3;
				margin-right: 1em;
				line-height: 2em;
				text-align: center;
				border-radius: 3px;
				color: #607D8B;
				cursor: pointer;"
				@click="$root.app.bodyContent.tpl='component-contracts'"
				>< BACK TO LIST</div>
			<div 
				style="flex:10; 
				font-size:18px; 
				color: #607D8B; 
				line-height:2.5em"
				>Contract page: {{activeAttachment.name}}</div>
			<div 
				style="flex:8; 
				text-align:right; 
				color:#607D8B"
				>Owner: {{me.dataLayer.login}} | {{me.dataLayer.email}}<br>
				Premission: {{activeAttachment.permission}}</div>
		</div>
		
		<div class="flex">
			<a 
				v-for="(item) in me.attachments"
				:class="[
					'jsdft-button', 
					'bgbg300', 
					'full', 
					{active: activeAttachment.name===item.name}]" 
				href="#empty" 
				@click="swithAttachment(item)">{{item.name}}</a>
		</div>
		<div v-if="check_field_access()" class="message field-message"> 
					This contract page isn't active now. You wath this page in preview mode. 
				</div>
		<fieldset>
			<div v-for="(field, key, value) in activeAttachment.schema" >
				<div v-if="field.type === 'string'">
					<label>{{field.title}}</label>
					<input v-model="form[key]" :disabled="check_field_access()" />
				</div>
			</div>
		</fieldset>
		<button :disabled="check_field_access()" class="jsdft-button full" @click="runAction(me, form)">
			action
		</button>
		<hr>
		<pre>{{form}}</pre>
	</div>`,
	props: ['me'],
	data: function(){
		return {
			activeAttachment: this.$root.getActiveAttachment(this.me),
		}
	},
	mounted: function () {
		if( !this.$root.valid_user_login() ){
			
			this.$root.guardFalseMsg('not_auth');
			this.$root.app.bodyContent.tpl = 'component-contracts';
		}

		if( !this.$root.valid_check_attachment_permission(this.me) ){

			this.$root.guardFalseMsg('access_locked');
			this.$root.app.bodyContent.tpl = 'component-contracts';
		}
	},
	computed: { 
		form: function () {
			let out = {};
			for (const key in this.me.dataLayer) {
				
				out[key] = this.me.dataLayer[key][this.me.dataLayer[key].length-1]
				// this get and remove last
				// out[key] = this.me.dataLayer[key].pop();
			}
			return out;
      	}
    },
	methods: {
		swithAttachment(item){
			this.activeAttachment = item;
		},
		runAction(_contract, _form){
			this.$root.contractAction(_contract, _form);
		},
		check_field_access(){
			if(!this.$root.user.RSA){
				return true;
			}
			/* is in active attachment */
			if(this.form.attachmentShow != this.activeAttachment.name){
				return true;
			}
			return false;
		}
	},
})
Vue.component('component-form', componentForm);