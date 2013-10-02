;(function () {
	
	APP.util = {
		'render': function (obj) {
		},
		
		'urlParam': function () {
			var url = location.href;
			var idx = url.indexOf('?');
			var ret = {};
			
			if (idx < 0) {
				return ret;
			};
			
			var param = url.substr(idx + 1, url.length);
			param = param.split('&');
			
			for (var i in param) {
				kv = param[i].split('=');
				
				if (kv[0]) {
					ret[kv[0]] = kv[1];
				};
			};
			
			return ret;
		},
		
		

	};
	
})();