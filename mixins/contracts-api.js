const contractApi = {
    methods : {
    	/* contracts parse */

		/* TODO - change getActiveShemaName to getActiveAttachmentName */
		getActiveShemaName(_contract){
			return _contract.dataLayer.attachmentShow[_contract.dataLayer.attachmentShow.length - 1]
			/* this es6 construct remove last  */
			// return [..._contract.dataLayer.attachmentShow].pop();
		},
		getActiveAttachment(_contract){
			return _contract.attachments.find(
				x => x.name === (this.getActiveShemaName(_contract)));
		},
		contractAction(_contract, _form){
			const self = this;
			
			/* always update data layer by attachment form data */
			for (let key in _form) {
				self['setDataLayer']({
					contract: _contract,
					key: key,
					value: _form[key],
				})
			}
			/* now run contracts actions (call by key value) */
			this.getActiveAttachment(_contract).action.calls.forEach(
				(call) => { 
					try {
						self[call.mainMethod]({ 
							...call.attrs, 
							contract: _contract,
							form: _form,
						});
					} catch(err) {
						alert('contract method:'+call.mainMethod+' isnt exist')
					}
			});
		},
		
		/* signs logic */
		activateContract(_contract){
			/* guardians */
			if(!this.valid_user_login()) return this.guardFalseMsg('not_auth');
			if(_contract.signs.length) return this.guardFalseMsg('shema_sign');
			/* make initial sign (sign schema) */
			
			this.sign({contract: _contract})

			alert('The contract has been signed');
		},

		/* validators - contract */
		
		valid_sign_owner(_sign){
			if(this.user.RSA && cryptico.decrypt(_sign, this.user.RSA).signature == 'verified'){
				return true;
			}else{
				return false;
			}
		},

		/* ## check is I edited My form */
		valid_schema_owner(_contract){

		},
    },
};