const contractMethods = {
    methods : {
    	setDataLayer(_attr){
			/* guardian */
			if(!this.user.RSA){
				alert('login first');
				
			}
			_attr.contract.dataLayer[_attr.key].push(_attr.value);

			/* TODO - this code is not strict contrat methosd - its manager helpers */
			/* back to list with manager */
			this.$root.app.bodyContent.tpl = 'component-contracts';
			this.$root.setStorageContracts();
		},

        sign(_attr){
			/* guardian */
			if(!this.user.RSA){
				alert('login first');
				return false;
			}

			/* prepare pack to signature (sigPack) */
			const sigPack = {
				owner: this.user.login,
				address: this.user.email,
				dataLayer: _attr.contract.dataLayer,
				signature: null,
			}
 			_attr.contract.signs.push(sigPack);
			
	 		const signature = cryptico.encrypt(
				SHA256(JSON.stringify(_attr.contract)), 
				this.user.publicKey, 
				this.user.RSA
			).cipher;

	 		/* add signature to last sigPack */
			_attr.contract.signs[_attr.contract.signs.length - 1].signature = signature;

			// var DecryptionResult = cryptico.decrypt(EncryptionResult.cipher, this.app.RSA);
			// this.$root.app.bodyContent.me = finalContract;

			/* TODO - this code is not strict contrat methosd - its manager helpers */
			/* back to list with manager */
			this.$root.app.bodyContent.tpl = 'component-contracts';
			this.$root.setStorageContracts();
		},
		send(_attr){
			alert('now send me');
			const c = JSON.stringify(_attr.contract);
			this.app.dialog.class = ['warning'];
			this.app.dialog.tpl = 'component-dialog-message';
			this.app.dialog.me.body = '<h2>bitContract<h2><p>Copy contract code to manager</p><hr><pre class="custom-email-prev">'+c+'</pre>';
		}
    },
};