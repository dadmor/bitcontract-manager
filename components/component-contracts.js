var componentContracts = Vue.extend({
	template: 
	`<div>
		<table class="firstastitle">
			<tr>
				<th>Contract name</th>
				<th>State</th>
				<th>Sign</th>
				<th>Actions</th>
			</tr>
			
			<tr 
				v-for="(item) in $root.app.storageContracts"
				:class="['hovered']"
				@click="$root.openContract(item)"
				>
				<td>
					<b>{{item.contractName}}</b>
					<div class="courier">{{item.contractId}}</div>
				</td>
				<td>
					{{$root.getActiveShemaName(item)}}
				</td>
				<td>
					<span 
						class="tag bg-green" 
						v-if="item.signs.length>0">
						{{item.signs.length}}
					</span>
					<span v-if="item.signs.length===0">
						(blank form)
					</span>
					<span v-if="item.signs.length===1">
						(signed blank form)
					</span>
				</td>
				<td>
					<span @click.stop="$root.moreInfo(item)" class="link">
						more info
					</span>
					<span 
						v-if="item.signs.length===0" 
						@click.stop="$root.activateContract(item)"
						class="link">
						attivation
					</span>
					<span class="link" v-on:click.stop="$root.removeContract(item)">
						remove
					</span>
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
Vue.component('component-contracts', componentContracts);