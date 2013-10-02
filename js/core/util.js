;(function () {
	
	APP.util = {
		'render': function (obj) {
		    APP.util.renderUrlObj(obj);
		},
		
		'renderUrlObj': function (obj) {
			var objects = obj && obj.length ? obj.find('.url') : $('.url');
			if (!objects.length) {
				return;
			};
			
			$.each(objects, function (i, item) {
				var obj = $(item);
				APP.util.click(obj, function () {
					var data = $(this).data();
					var url = data.url;
					var href = data.href;
					var win = Boolean(data.win) || false;
					
					if (data.classname) {
						$(this).addClass(data.classname);
					};
					
					if (url) {
						if (url == 'back') {
							APP.router.back();
						} else {
							APP.router.go(url, false, data);
						};
					} else if (href) {
						if ((data.target == 'blank') || data.win) {
							APP.util.windowOpen(href, data, data.win);
						} else if (data.target == 'top') {
							top.location.href = href;
						} else if (data.target == 'parent') {
							parent.location.href = href;
						} else {
							location.href = href;
						};
					};
				}, obj.data());
			});
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
		
		'click': function (obj, f, data, param) {
			if (!obj || !obj.length) return;
			if (!data) data = {};
			
			if (APP.cfg.isAndroid) {
				data.noTouch = true;
			};
			
			param = $.extend({ 'namespace': '' }, param);
			var n = (param.namespace ? '.'+ param.namespace : '');
			var e = 'click' + n;
			
			obj.unbind(e).bind(e, data, f);
			
			if (!data.noTouch) {
				obj.unbind('touchstart' + n).bind('touchstart' + n, APP.util.touch);				
			};
		},
		
		
		

	};
	
})();