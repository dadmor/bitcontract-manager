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
						- (blank form)
					</span>
					<span v-if="item.signs.length===1">
						(signed blank form)
					</span>
				</td>
				<td>
					<span @click.stop="$root.moreInfo(item)" class="link">
						show data layer
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

		<!-- uploader -->
		<h2>Load contract from file</h2>
		<component-uploader :me="{method: 'uploadContract'}"/>

		<!-- uploader -->
		<h2>Load contract from text</h2>
		<p>Copy contract code example from email</p>
		<textarea v-model="import_text"></textarea>
		<button class="jsdft-button full"
			@click="$root.uploadContract(JSON.parse(import_text))">
			Load from text
		</button>
	</div>`,
	props: ['me'],
	data: function(){
		return {
			import_text:null,
		}
	},
	methods: {
		
	},
})
Vue.component('component-contracts', componentContracts);