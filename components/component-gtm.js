var ComponentGtm = Vue.extend({
	template: 
	`<div>
		<h2>Google Tag Manager clickable events (contract job plugin)</h2>
		<div class="flex smoth-patern">
			<div 
				v-for="(item, index) in tabs"  
				@click="$root.swichMenu(item, render.gtmBody)"
				:class="[
					'tab', 
					{
						active: (render.gtmBody.tpl === item.component)
					}]">
				{{item.label}}
			</div>
		</div>
		<component
			ref="gtmBody"
			:me="render.gtmBody.me"
			:is="render.gtmBody.tpl"
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
					label:'Import/Export',
					component: 'component-uploader',
				},
			],
			render:{
				gtmBody:{
					me: null,
					tpl: 'component-items'
				}
			}
		}
	}
})
Vue.component('component-gtm', ComponentGtm);


