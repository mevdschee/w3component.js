w3component.components['x-clock'] = function (element, template) {
	var self = this;
	var state = {};
	self.render = function() {
		var now = new Date();
		hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
		minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
		second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
		state.time = hour + ":" + minute + ":" + second;
		element.innerHTML = Handlebars.compile(template)(state);
	};
	self.start = function() {
		self.render();
		self.interval = setInterval(self.render,1000);
	};
	self.stop = function() {
		clearInterval(self.interval);
		self.interval = null;
	};
	self.startStop = function() {
		if (self.interval) self.stop();
		else self.start();
	};
	element.addEventListener('click',function(e){
		if (e.target.tagName.toLowerCase()=='b') {
			self.startStop()
		}
	});
	self.start();
};
