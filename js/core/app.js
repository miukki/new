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
		
		APP.cfg.startUrl = self.getRoute();
		_initTmpl();
	};
	
	self.urlFull = function (url, useDomain) {
		return location.protocol + '//' + (useDomain ? APP.cfg.domain : location.hostname) + (url || '');
	};
	
	self.getRoute = function (ctl, action, id, add) {
		if (APP.router.state) {
			if (!ctl) {
				ctl = APP.router.state.controller;
			};
			if (!action) {
				action = APP.router.state.action;
			};
			if (!id) {
				id = APP.router.state.id;
			};
		};
		action = action || '';
		ctl = ctl || '';
		id = id || '';
		add = add || '';
		
		// page hack
		if ((action == 'list') && !id) {
			id = 1;
		};
		
		var r = '';
		if (APP.ROUTE[ctl] && APP.ROUTE[ctl][action]) {
			r = APP.ROUTE[ctl][action];
		} else {
			r = sprintf('/%s/%s/%s', ctl, action, id);
		};
		r += add;
		return r;
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
		        self.router.init(APP.cfg.startUrl);
		    } else {
		        i ++;
		        _initTmpl(i);
		    };
		    
		});
	};
	
})();
