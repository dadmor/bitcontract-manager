var componentItems = Vue.extend({
	template: 
	`<div>
		<table class="firstastitle">
			<tr>
				<th>Domain</th>
				<th>Record</th>
				<th>Tags</th>
				<th>Target</th>
				<th>Actions</th>
			</tr>
			
			<tr 
				v-for="(item) in $root.documents"
				:class="['hovered']"
				@click="$root.openContract(item)"
				>
				<td>
					-
				</td>
				<td>
					-
				</td>
				<td>
					-
				</td>
				<td>
					{{item.target}}
				</td>
				<td>
					<a href="#">Remove</a>
				</td>
			</tr>
		</table>

		<button class="jsdft-button full"
			@click="runTargeter()">
			Add new event
		</button>
	</div>`,
	props: ['me'],
	// computed: { 
	//		target: function () {
	// 			const _t = this.me.target;
	// 			this.addNewDocument({target:_t});
	// 			return _t;
	//		}
	//	},
	methods: {
		runTargeter(){

			// console.log(this);
			this.$root.tooglePanels();
			this.$root.app.targeter.tpl = 'component-targeter';
			this.$root.app.targeter.me.addItem = this.addNewDocument;
		},
		addNewDocument(_document){
			this.$root.documents.push(_document);
		}
	},
})
Vue.component('component-items', componentItems);