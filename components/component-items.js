var componentItems = Vue.extend({
	template: 
	`<div>
		<table class="firstastitle">
			<tr>
				<th v-for="(item, key) in items">{{item.label}}</th>
			</tr>
			<!-- Table body -->
			<tr 
				v-for="(item) in $root.documents"
				:class="['hovered']"
				@click="selectRow(item)"
				>
					<!-- Table cells -->
					<td v-for="(cell, key) in items">
						<span v-if="cell.type==='data'">
							{{item[key]}}
						</span>
						<span v-if="cell.type==='component'">
							TODO - render component
						</span>
					</td>
			</tr>
		</table>
		<div class="bottom-sticky">
			<fieldset>
				<div class="flex">
					<div 
						:class="field.class" 
						v-for="(field, key, value) in formSchema" >
						<div 
							v-if="field.type === 'string'">
							<label>{{field.title}}</label>
							<input v-model="items[key].value" />
						</div>
					</div>
					<button class="jsdft-button full"
						@click="runTargeter()">
						Add new event
					</button>
				</div>
			</fieldset>
		</div>
	</div>`,
	props: ['me'],
	data: function(){
		return {
			items:{
				"domain":{
					type: 'data',
					label: 'Domain',
					value: null
				},
				"record":{
					type: 'data',
					label: 'Record',
					value: null
				},
				"tags":{
					type: 'data',
					label: 'Tags',
					value: null
				},
				"target":{
					type: 'data',
					label: 'Target',
					value: null
				},
				"actions":{
					type: 'component',
					label: 'Actions',
					component:'cell-actions',
					data:[
						{
							label: 'remove', 
							action: 'itemsRemoveAction'
						}
					]
				}
			},
			formSchema: {
				"domain":{
					"type": "string",
					"title": "Domain",
					"class" : "f30",
				},
				"record":{
					"type": "string",
					"title": "Record",
					"class" : "f30",
				},
				"tags":{
					"type": "string",
					"title": "Tags",
					"class" : "f30",
				},
				"target":{
					"type": "string",
					"title": "Target",
				}
			},
		}
	},
	methods: {
		selectRow(item){
			return item
		},
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