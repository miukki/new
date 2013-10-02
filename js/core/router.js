;(function () {

	var self = APP.router = {};
	self.callback = null;
	self.route = '';
	self.state = null;
	self.param = {};
	self.noRebuild = false;
	
	self.init = function (route) {
		if (location.hash) {
			location.hash = '';
		};
		
		self.route = route ? route : location.pathname;
		self.getState(self.route);
		
		var title = APP.cfg.title;
		if (title) {
			document.title = title;
		};
		
		APP.builder.build();
	};
	
	self.getState = function (route) {
		self.state = new self.request(route);
		self.state = self.checkMatch(route);
	};
	
	self.go = function (route, callback, param) {
		route = (undefined != route) ? String(route) : '';
		self.param = $.extend({ 'animate': true }, param);
		
		if (callback) {
			self.callback = callback;
		};
		
		var title = APP.cfg.title || $('title').text();
		self.route = APP.cst.ROUTE_PREFIX + route.replace(new RegExp(APP.cst.ROUTE_PREFIX, 'g'), '');
		History.pushState({}, title, self.route);
		self.getState(self.route);
	};
	
	self.request = function (source) {
		source = source.replace(APP.cst.ROUTE_PREFIX, '');
		
		var part = '\/?([^\/=#?&]*)';
		var reg = new RegExp('^' + part + part + '?' + part + '?\/?(.*)?$');
		var match = source.match(reg);
		
		this.controller = match[1] ? match[1] : 'index';
		this.action = match[2] ? match[2] : 'index';
		this.id = match[3] ? match[3] : '';
		
		var param = match[4] ? match[4].split('/') : [];
		for (i = 0; i < param.length; ++i) {
			if (param[i]) {
				this[param[i]] = param[(i + 1)];
				i++;
			};
		};
		
		this.get = APP.util.urlParam(); 
	};
	
	self.checkMatch = function (source) {
		if (!APP.ROUTE_MATCH) {
			return self.state;
		};
		
		var replaces = {};
		for (var i in APP.ROUTE_MATCH) {
			var r = i.replace('/', '\/');
			var ph = r.match(/\{([^\}]+)\}/g);
			r = r.replace(/\{([^\}]+)\}/g, '');
			var m = source.match(new RegExp(r));
			if (!m) {
				continue;
			};
			
			source = APP.ROUTE_MATCH[i];
			
			if (ph) {
				for (var p in ph) {
					ph[p] = ph[p].replace(/\{|\}/g, '');
				};
				for (var n in m) {
					if (n == 0) continue;
					if (ph[n - 1] && m[n]) {
						replaces[ph[n - 1]] = m[n];					
					};
				};				
			};
		};
		
		var r = new self.request(source);
		for (var i in r) {
			if ($.inArray(i, ['action', 'controller']) >= 0) {
				continue;
			};
			if (self.state[i]) {
				r[i] = self.state[i];
			} else {
				r[i] = '';
			};
		};
		
		for (var i in replaces) {
			if (!replaces[i]) {
				continue;
			};
			r[i] = replaces[i];
		};
		return r;
	};
	
	self.getName = function (fld) {
		if (!fld) return '';
		
		var id = self.state.controller;
		var action = self.state.action;
		var ctl = APP.ctl[id];
		var name = '';
		var fldName = fld + 'Name';
		
		if (ctl && ctl[fldName]) {
			if ('object' == typeof(ctl[fldName])) {
				if (ctl[fldName][action]) {
					id = ctl[fldName][action];
				} else {
					id = ctl.id;
				};
			} else {
				id = ctl[fldName];
			};
		};
		
		name = [ fld, id, action ].join('/');
		if ($.inArray(name, APP.data.templates) < 0) {
			name = [ fld, 'default', action ].join('/');
		};
		if ($.inArray(name, APP.data.templates) < 0) {
			name = [ fld, id, 'default' ].join('/');
		};
		if ($.inArray(name, APP.data.templates) < 0) {
			name = [ fld, id ].join('/');
		};
		if ($.inArray(name, APP.data.templates) < 0) {
			name = [ fld, 'default' ].join('/');
		};
		return name;
	};
    
})();