const manager = {
    methods : {
        loginUser(_auth){
			this.user.email = _auth.email;
			this.user.login = _auth.login;

			this.user.RSA = cryptico.generateRSAKey(
				SHA256(_auth.password+_auth.login+_auth.email), 1024);
			this.user.publicKey = cryptico.publicKeyString(this.user.RSA);

			this.app.RSA = cryptico.generateRSAKey(
				SHA256(_auth.appPassword), 1024);
			this.app.publicKey = cryptico.publicKeyString(this.app.RSA);

			this.app.bodyContent.tpl = 'component-contracts';
		},
		logoutUser(){
			this.user.email = null;
			this.user.login = null;
			this.user.RSA = null;
			this.user.publicKey = null;
			this.app.RSA = null;
			this.app.bodyContent.tpl = 'component-contracts';
			// this.app = null;
		},
		uploadContract(_data){
			this.app.bodyContent.me = _data;
			this.app.bodyContent.me.contractId = this.genSerial(18);
			this.app.storageContracts.push(this.app.bodyContent.me);
		},
		removeContract(_contract){
			this.app.storageContracts = this.app.storageContracts.filter(x => x.contractId !== (_contract.contractId));
		},
		moreInfo(_contract){
			this.app.boardCss.push('minus20');
			this.app.rightBar = {
				tpl:'component-more-info',
				me: _contract,
			}
		},
		openContract(_contract){
			/* guardians */
			if(!this.valid_contract_is_active(_contract)) return this.guardFalseMsg('not_active_contract');

			this.$root.app.bodyContent.me = _contract;
			this.$root.app.bodyContent.tpl = 'component-form';
		},
		tooglePanels(){
			alert('jo');
			var index = this.app.boardCss.indexOf('hide');
			if (index === -1) {
				this.app.boardCss.push('hide');
				this.$root.app.targeter.tpl = 'component-targeter';
			}else{
				this.app.boardCss.pop('hide');
				this.$root.app.targeter.tpl = null;
			}
		},
		swichMenu(_item,_target){
			_target.tpl = _item.component; 
		},
		guardFalseMsg(_msg){
			this.app.dialog.class = ['warning'];
			this.app.dialog.tpl = 'component-dialog-message';
			this.app.dialog.me.body = this.falseMessages[_msg];
			return false;
		},

		/* validators - app */
		valid_user_login(){
			if(this.user.RSA) return true; 
		},
		valid_contract_is_active(_contract){
			if(_contract.signs.length > 0) return true; 
		},
		valid_check_attachment_permission(_contract){

			const _permission = this.getActiveAttachment(_contract).permission;

			if(_permission == "owner"){
				[first] = _contract.signs;
				return this.valid_sign_owner(first.signature);
			}
			if(_permission == "all"){
				return true;
			}
		},
    }
};