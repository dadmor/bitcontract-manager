var componentMoreInfo = Vue.extend({
	template: 
	`<div>
		<table>
			<tr>
				<th>Data</th>
				<th>Values history</th>
			</tr>
			
			<tr 
				v-for="(value, key) in me.dataLayer"
				>
				<td>
					{{key}}
				</td>
				<td>
					{{value}}
				</td>
			</tr>

		</table>
	</div>`,
	props: ['me'],
	data: function(){
		return {
			
		}
	},
	
	methods: {
		
	},
})
Vue.component('component-more-info', componentMoreInfo);