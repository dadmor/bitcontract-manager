const generators = {
    methods : {
        genSerial(_l) {
			String.prototype.shuffle = function () {
			    var a = this.split(""),
			        n = a.length;

			    for(var i = n - 1; i > 0; i--) {
			        var j = Math.floor(Math.random() * (i + 1));
			        var tmp = a[i];
			        a[i] = a[j];
			        a[j] = tmp;
			    }
			    return a.join("");
			}
			var charset = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNOPQRSTUVWXYZ0123456789",
				retVal = "";
				charset.shuffle();
			for (var i = 0, n = charset.length; i < _l; ++i) {
				if(i==6){
					retVal += '-';
				}
				if(i==12){
					retVal += '-';
				}
				if(i==18){
					retVal += '-';
				}
				if(i==24){
					retVal += '-';
				}
				retVal += charset.charAt(Math.floor(Math.random() * n));
			}
			return retVal;
		}
    }
};