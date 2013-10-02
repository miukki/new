;(function() {
	
	var self = APP.builder = {};

	self.menu = [
		{ 'id': 'index', 'title': 'Главная страница',  'url': '/' },
		{ 'id': 'about',  'title': 'О конференции',  'url': '/about' },
		{ 'id': 'programm', 'title': 'Программа', 'url': '/programm' },
		{ 'id': 'talk',  'title': 'Партнеры и спонсоры',  'url': '/partners' }
	];
	
	self.build = function (param) {
		param = $.extend({ 'animate': false }, param);
		
		var content = $('#content');
		if (!content.length) {
			_contentBuild();
			return;
		};
	};
	
	var _contentBuild = function () {
		var layout = $('#layout');
		var id = APP.router.state.controller;
		var action = APP.router.state.action;
		var ctl = APP.ctl[id];
		var ret = false;
		var name = '';
		var tpl;
		var a;
		var name = APP.router.getName('layout');
		var h = APP.router.getName('header');
		var f = APP.router.getName('footer');
		var changed = false;
		
		if (ctl) {
			ctl.id = ctl.id || id;			
		};
		
		if (name != layout.data('name')) {
			tpl = $.tmpl(name, ctl);
			layout.data({ 'name': name, 'h': h, 'f': f }).html(tpl);
			changed = true;
		};
		
		var header = $('#header');
		var footer = $('#footer');
		var content = $('#content');

		if (changed || (h != layout.data('h'))) {
			header.html($.tmpl(h));
		};
		
		if (changed || (f != layout.data('f'))) {
			footer.html($.tmpl(f));
		};
		
		_menuBuild();
		_menuSet(id);
		
		name = APP.router.getName('ctl');
		if (ctl) {
			if (name != content.data('name')) {
				content.html('');
				tpl = $('<div></div>').append($.tmpl(name, ctl)).addClass(id);
				content.html(tpl).data('name', name);
				ctl.obj = tpl;
			};
			if (ctl[action]) ctl[action]();
		};
		
		APP.util.render(layout);
		
		if (self.callback) {
			self.callback();
			self.callback = null;
		};
		
		if (APP.cfg.isMobile) {
			window.scrollTo(0, 1);
		};
	};
	
	var _menuSet = function (id) {
		var obj = $('#menu-' + id);
		if (!obj.length) {
			return;
		};
		
		$('#menu .active').removeClass('active');
		obj.addClass('active');
	};
	
	var _menuBuild = function () {
		for (var i in self.menu) {
			var item = self.menu[i];
			if (item.callback) {
				item = self[item.callback](item);
			};
		};
		
		$('#menu').html($.tmpl('layout/menu', { 'menu': self.menu }));
	};
	
	self.clear = function (param) {
		for (var i in APP.ctl) {
			var ctl = APP.ctl[i];
			if (ctl && ctl.clear) {
				ctl.clear(param);
			};
		};
	};
	
})();