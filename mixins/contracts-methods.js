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

			/* prepare pack to signature */
			const packToSign = {
				data: _attr.form,
				contractHash: '',
			}

			packToSign.contractHash = SHA256(JSON.stringify(_attr.contract));

			const signedPack = cryptico.encrypt(
					JSON.stringify(packToSign), 
					this.user.publicKey, 
					this.user.RSA).cipher;

			const finalContract = _attr.contract.signs.push(signedPack);

			// var DecryptionResult = cryptico.decrypt(EncryptionResult.cipher, this.app.RSA);
			this.$root.app.bodyContent.me = finalContract;

			/* TODO - this code is not strict contrat methosd - its manager helpers */
			/* back to list with manager */
			this.$root.app.bodyContent.tpl = 'component-contracts';
			this.$root.setStorageContracts();
		},
    },
};