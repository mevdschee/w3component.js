w3component.components['hello-world'] = function (element, template) {
	var self = this;
	var state = {};
	self.submit = function(e) {
		e.preventDefault();
		state.world = e.target.querySelector('input[name="world"]').value;
		self.render();
	};
	self.render = function(data) {
		element.innerHTML = Handlebars.compile(template)(state);
		w3component.rescan(element);
	};
	element.addEventListener('submit', function(e){
		if (e.target.tagName.toLowerCase()=='form') {
			self.submit(e);
		}
	});
	self.render();
};
