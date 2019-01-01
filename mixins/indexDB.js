const indexDB = {
	mounted: function () {

			window.indexedDB = window.indexedDB || window.mozIndexedDB || 
			window.webkitIndexedDB || window.msIndexedDB;

			window.IDBTransaction = window.IDBTransaction || 
			window.webkitIDBTransaction || window.msIDBTransaction;
			window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || 
			window.msIDBKeyRange

			if (!window.indexedDB) {
				window.alert("Your browser doesn't support a stable version of IndexedDB.")
			}

        	let request = window.indexedDB.open("newDatabase", 1);
        	let self = this;
        	
        	request.onsuccess = function(event) {
	            
	            self.db.instance = request.result;
	            console.log("success: "+ self.db.instance);

        	};

        	request.onupgradeneeded = function(event) {
        		/* before first creation */
	            event.target.result.createObjectStore("employee", {keyPath: "id"});
         	}
         	console.log(request);

	},
    methods : {
    	addToDb: function(){
            let request = this.db.instance.transaction(["employee"], "readwrite")
            .objectStore("employee")
            .add({ id: "00-03", name: "Kenny", age: 19, email: "kenny@planet.org" });
            
            request.onsuccess = function(event) {
               alert("Kenny has been added to your database.");
            };
            
            request.onerror = function(event) {
               alert("Unable to add data\r\nKenny is aready exist in your database! ");
            }
         }
    }
};