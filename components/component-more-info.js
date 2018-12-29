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

		<table>
			<tr>
				<th>Signs</th>
				<th></th>
				<th></th>
				<th></th>
			</tr>
			
			<tr 
				v-for="(value) in me.signs"
				>
				<td>
					{{value.owner}}
				</td>
				<td>
					{{value.address}}
				</td>
				<td>
					{{value.dataLayer}}
				</td>
				<td>
					{{value.signature}}
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