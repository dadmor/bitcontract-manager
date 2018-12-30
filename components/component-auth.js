var componentAuth = Vue.extend({
	template: 
	`<div>
		<fieldset v-if="!$root.valid_user_login()">
			<div>
				<label>Application password</label>
				<input v-model="auth.appPassword" />
			</div>
			<div>
				<label>Login</label>
				<input v-model="auth.login" />
			</div>
			<div>
				<label>Email</label>
				<input v-model="auth.email" />
			</div>
			<div>
				<label>Your long and serious password</label>
				<input v-model="auth.password" />
			</div>
			<button 
				class="jsdft-button full" 
				@click="$root.loginUser(auth);">
				Authenticate
			</button>
		</fieldset>

		<fieldset 
			class="bg-light-green light-patern"
			v-if="$root.valid_user_login()">
			<div>
				<label>Login: {{$root.user.login}}</label>
				<label>Email: {{$root.user.email}}</label>
				<a 	style="float:right"
					href="#empty"
					@click="$root.logoutUser(); clear()">
					Logout
				</a>
			</div>
		</div>
	</div>
`,
	data: function(){
		return {
			auth:{
				login: "",
				email: "",
				password: "",
				appPassword: "",
			}	
		}
	},
	methods: {
		/* TODO - change getActiveShemaName to getActiveAttachmentName */
		clear(){
			this.auth.password = '';
			this.auth.appPassword = '';
		},
	}
})
Vue.component('component-auth', componentAuth);