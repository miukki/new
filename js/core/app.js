window.APP = {};
;(function () {
	
	var self = APP;
	self.cfg = {};
	self.ctl = { 'about': {}};
	self.isInit = false;

	self.init = function (onLoad) {
	    APP.cfg.title = 'title';
		
		if (self.isInit) {
			return;
		};
		
		_initTmpl();
	};
	
	self.urlFull = function (url, useDomain) {
		return location.protocol + '//' + (useDomain ? APP.cfg.domain : location.hostname) + (url || '');
	};
	
	var _initTmpl = function (i) {
	    if (!i) i = 0;
	    
	    var length = APP.data.templates.length;
		var url = APP.data.templates[i];
		
		$.get('/tmpl/' + url + '.tmpl', function (template) {
		    $.template(url, template);
		    if ((i + 1) == length) {
		        self.isInit = true;
		        $('#layout').show();
		        self.router.init();
		    } else {
		        i ++;
		        _initTmpl(i);
		    };
		    
		});
	};
	
})();
