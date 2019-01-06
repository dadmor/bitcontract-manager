var componentItems = Vue.extend({
	template: 
	`<div>
		<div class="flex">
			<div class="f30">
				<h2>All defined events</h2>
			</div>
			
			<div class="f30" style="text-align:right; padding:10px 0 0 0">
				<a 
					v-if="!isFormOpen"
					@click="openForm(true)"
					class="jsdft-button outline " 
					href="#empty">Add new event</a>
				<a 
					@click="openForm(true)"
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
				@click="selectRow(item)"
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
		<div 
			v-if="isFormOpen"
			class="bottom-sticky">
			<fieldset>
				<div class="flex">
					<div 
						:class="[field.class,'field']" 
						v-for="(field, key, value) in formSchema" >
						<!-- input component -->
						<div 
							v-if="field.type === 'string'">
							<label>{{field.title}}</label>
							<input v-model="itemsSchema[key].value" />
						</div>
						<!-- target component -->
						<div 
							v-if="field.type === 'target'">
							<label>{{field.title}}</label>
							<div class="flex">
								<input class="f60" v-model="itemsSchema[key].value" />
								<a class="jsdft-button outline slim f30" 
									@click="runTargeter()"
									href="#empty">SET Target</a>
							</div>
						</div>
					</div>
					<button 
						v-if="!isEditForm"
						class="jsdft-button full"
						>
						Add new event
					</button>
					<button
						v-if="isEditForm" 
						class="jsdft-button full"
						@click="editRow()">
						Edit entry
					</button>
				</div>
			</fieldset>
		</div>
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
			documentReference:{},

			isFormOpen: false,
		}
	},
	methods: {
		selectRow(item){
			this.editForm(true);
			this.documentReference = item;
			for (let [k, v] of Object.entries(item)) {
				this.itemsSchema[k].value = v;
      			console.log(k,v);
  			}
		},
		editRow(){
			for (let [k, v] of Object.entries(this.itemsSchema)) {
				if(v.type === 'data'){
					this.$set(this.documentReference, k, v.value);
					// this.documentReference[k] = v.value;
				}
			}
		},
		openForm(_bool){
			console.log('kurwo');
			this.$root.app.boardCss.push('minus20');
			Vue.set(this.$root.app, 'rightBar', {
				tpl:'component-dialog-message',
				me:{
					body: '123',
				},
			})
			console.log(this.$root.app);

			this.isFormOpen = _bool;
			this.isEditForm = false;
		},
		editForm(_bool){
			this.isFormOpen = _bool;
			this.isEditForm = true;
		},
		/* todo - repeir in targeter */
		addRow(_document){
			this.$root.documents.push(_document);
		},

		runTargeter(){
			// console.log(this);
			this.$root.tooglePanels();
			this.$root.app.targeter.me.targeterCallback = this.addRow;
			this.$root.app.targeter.tpl = 'component-targeter';
			
		},

		/* list operations */
		uniqueList(key){
			const unique = [...new Set(this.documents.map(item => item[key]))];
			console.log(unique);
		}
		
	},
})
Vue.component('component-items', componentItems);