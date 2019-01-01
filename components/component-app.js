var componentApp = Vue.extend({
	template: 
	`
	<div id="app">
		<div class="custom-header" 
		@click="$root.tooglePanels();">
				<h1>⎌bigContract MANAGER</h1>
				<div class="sub-custom-header">Create smart economy now!</div>
		</div>	
		<div id="RTA_board" :class="$root.app.boardCss">
			<div class="custom-content flex">
				<div class="f200 bc_board_menu">

					<div v-if="!$root.user.RSA" class="message field-message"> 
						First, authenticate user! 
					</div>

					<!-- auth -->
					<h2>Authentication</h2>
					<component-auth/>

					<!-- menu -->
					<div class="items">
						<div
							:class="[
								'board_menu_item',
								{'active' : (item.component==$root.app.bodyContent.tpl)}]"
							v-for="(item, index) in $root.app.boardMenu" 
							v-on:click="
								$root.app.bodyContent.tpl=item.component">
							{{item.label}}
						</div>
					</div>
				</div>
				<div class="fminus200">

					<!-- Contracts area -->
					<component
						ref="bodyContent"
						:me="$root.app.bodyContent.me"
						:is="$root.app.bodyContent.tpl"
					/>
				</div>
			</div>
		</div>

		<!-- right bar -->
		<div 
			id="RTA_sidebar" 
			v-if="$root.app.rightBar.tpl">
			<!-- Sidebar HEADER -->
			<div id="RTA_sidebar_header">
				<h1>
					Title <span 
						@click="$root.app.rightBar.tpl=false; $root.app.boardCss.remove('minus20');" 
						class="xclose">X</span>
				</h1>
				<div class="rta_sidebar_header_subtitle">
					Subtitle
				</div>
		    </div>
		    <component
					ref="rightBar"
					:me="$root.app.rightBar.me"
					:is="$root.app.rightBar.tpl"
				/>
		</div>
		
		<div class="custom-footer">
			<a href="#">Dont readme</a>
		</div>

		<div 
			id="bc_dialog" 
			:class="$root.app.dialog.class"
			v-if="$root.app.dialog.tpl">
			<span @click="$root.app.dialog.tpl=false" class="xclose">X</span>
			<h2>Dialog message</h2>

			<component
					id="$root.dialog-body"
					ref="dialog"
					:me="$root.app.dialog.me"
					:is="$root.app.dialog.tpl"
				/>
			<div class="dialog-decorator"></div>
		</div>

		<component
			v-if="$root.app.targeter.tpl"
			id="targeter"
			ref="targeter"
			:me="$root.app.targeter.me"
			:is="$root.app.targeter.tpl"
		/>
	</div>	
	`,
	data: function(){	
	},
	methods: {	
	}
})
Vue.component('component-app', componentApp);