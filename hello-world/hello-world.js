w3component.components['hello-world'] = function (element, template) {
	var self = this;
	var state = {};
	self.submit = function(e) {
		e.preventDefault();
		state.world = $(this).find('input[name="world"]').val();
		self.render();
	};
	self.render = function(data) {
		element.html(Handlebars.compile(template)(state));
		w3component.rescan(element);
	};
	element.on('submit','form',self.submit);
	self.render();
};
