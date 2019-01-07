var ComponentGtm = Vue.extend({
	template: 
	`<div>
		<h1>Google Tag Manager clickable events (contract job plugin)</h1>
		<div class="flex">
			<div 
				v-for="(item, index) in tabs"  
				@click="$root.swichMenu(item, $root.app.gtmBody)"
				:class="[
					'tab', 
					{
						active: ($root.app.gtmBody.tpl === item.component)
					}]">
				{{item.label}}
			</div>
		</div>
		<component
			ref="gtmBody"
			:me="$root.app.gtmBody.me"
			:is="$root.app.gtmBody.tpl"
		/>
	</div>`,
	props: ['me'],
	data () {
		return {
			tabs:[
				{
					label:'Events',
					component: 'component-items',
				},
				{
					label:'Variables',
					component: 'component-market',
				},
				{
					label:'Import/Export',
					component: 'component-uploader',
				},
			],
		}
	}
})
Vue.component('component-gtm', ComponentGtm);


