w3component.components['php-crud-api-list'] = function (element, template) {
	var self = this;
	var state = {};
	self.request = function() {
		var req1 = new XMLHttpRequest();
		req1.onreadystatechange = function() {
			if (req1.readyState != 4 || req1.status != 200) return;
			state.data = php_crud_api_transform(JSON.parse(req1.responseText));
			self.render();
		};
		req1.open("GET", state.url, true);
		req1.send();
	};
	self.render = function() {
		element.innerHTML = Handlebars.compile(template)(state);
		w3component.rescan(element);
	};
	self.init = function () {
		for (var i = 0; i < element.attributes.length; i++) {
			if (element.attributes[i].name.lastIndexOf('data-', 0) === 0) {
				state[element.attributes[i].name.substring(5)] = element.attributes[i].value;
			}
		}
		self.request();
	}
	element.addEventListener('click', function(e){
		
	});
	self.init();
};
