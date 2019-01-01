const appData = {
	data () {
        return {
            app: {
                RSA: null,
                publicKey: null,
                storageContracts: [],
                boardCss: ['boxscroll'],
                boardMenu:[
                    {
                        label:'My Contracts',
                        component: 'component-contracts'
                    },
                    {
                        label:'Contracts Market',
                        component: 'component-market'
                    },
                    {
                        label:'GTM manager (job)',
                        component: 'component-gtm'
                    }
                ],
                bodyContent: {
                    tpl: 'component-contracts',
                    me: null,
                },
                rightBar: {
                    tpl: false,
                    me: {},
                },
                dialog:{
                    tpl: false,
                    class: [],
                    me: {},
                },
                targeter:{
                    tpl: false,
                    me: {},
                }
            },
            user:{
                RSA: null,
                publicKey: null,
                login: null,
                email: null,
            },
            falseMessages:{
                'not_auth' : 'Please finish authentication as user.',
                'shema_sign' : 'Contract is active now.',
                'not_active_contract': 'To activate this contact, create owner signature.',
                'access_locked': 'Access locked. Auth as contract owner.',
            },
            documents:[]
        }
    },
};