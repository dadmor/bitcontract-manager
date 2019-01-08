var componentItems = Vue.extend({
	template: 
	`<div>
		<div class="flex">
			<div class="f30" style="padding:10px 0 0 0">
				<h2>All defined events</h2>
			</div>
			
			<div class="f30" style="text-align:right; padding:10px 10px 0 0">
				<a 
					@click="pushDataToChild(
						{
							target: $root.app.rightBar,
							tpl: 'component-form',
							me: {
								formSchema: formSchema,
								itemsSchema: itemsSchema,
								callbackData: documents,
							},
						}
					)"
					class="jsdft-button outline " 
					href="#empty">Add new event</a>
				<a 
					class="jsdft-button outline " 
					href="#empty">Play track</a>
			</div>
		</div>
		<table>
			<tr>
				<th v-for="(item, key) in itemsSchema">{{item.label}}</th>
			</tr>
			<!-- Table body -->
			<tr 
				v-for="(item) in documents"
				:class="['hovered']"
				@click="pushMergeItemsSchema(
						{
							target: $root.app.rightBar,
							tpl: 'component-form',
							me: {
								formSchema: formSchema,
								itemsSchema: itemsSchema,
								callbackData: item,
							},
						}
					)"
				

				>
					<!-- Table cells -->
					<td v-for="(cell, key) in itemsSchema">
						<span v-if="cell.type==='data'">
							{{item[key]}}
						</span>
						<span v-if="cell.type==='component'">
							TODO - render component
						</span>
					</td>
			</tr>
		</table>
	</div>`,
	props: ['me'],
	data: function(){
		return {
			itemsSchema:{
				"domain":{
					type: 'data',
					label: 'Domain',
					value: null
				},
				"collection":{
					type: 'data',
					label: 'Collection',
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
				"target":{
					"type": "target",
					"title": "Target",
				},
				"domain":{
					"type": "string",
					"title": "Domain",
					"class" : "f30",
				},
				"collection":{
					"type": "string",
					"title": "Collection name",
					"class" : "f30",
				},
				"tags":{
					"type": "string",
					"title": "Tags",
					"class" : "f30",
				},
			},
			documents: this.$root.documents,
		}
	},
	methods: {
		pushDataToChild(_attrs){
			_attrs.target.tpl = _attrs.tpl;
			_attrs.target.me = _attrs.me;
		},
		pushMergeItemsSchema(_attrs){
			for (let [k, v] of Object.entries(_attrs.me.callbackData)) {
				if(v){
					_attrs.me.itemsSchema[k].value = v;
				}
  			}
  			_attrs.target.tpl = _attrs.tpl;
			_attrs.target.me = _attrs.me;
			
		}
	},
})
Vue.component('component-items', componentItems);