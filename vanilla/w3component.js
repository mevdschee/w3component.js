var w3component = window.addEventListener("load",function(){
	var self = this;
	self.components = {};
	var templates = {};
	var render = function(src,name){
		var elements = document.querySelectorAll('div.w3component[data-src="'+src+'"]');
		for (var i=0;i<elements.length;i++) (function(){
			this.setAttribute('data-rendered',1);
			this.w3component = new self.components[name](this,templates[name]);
		}).call(elements[i]);
	}
	var handle = function(){
		if (this.getAttribute('data-rendered')) return;
		var src = this.getAttribute('data-src');
		var name = src.split('/').pop();
		if (self.components[name]===null) return;
		if (self.components[name]!==undefined) return render(src,name);
		self.components[name] = null;
		var req1 = new XMLHttpRequest();
		req1.onreadystatechange = function() {
			if (req1.readyState != 4 || req1.status != 200) return;
			var style = document.createElement("style");
			style.innerHTML = req1.responseText;
			document.body.appendChild(style);
		};
		req1.open("GET", src+'.css', true);
		req1.send();
		var req2 = new XMLHttpRequest();
		req2.onreadystatechange = function() {
			if (req2.readyState != 4 || req2.status != 200) return;
			templates[name] = req2.responseText;
			var script = document.createElement("script");
			script.setAttribute('src',src+'.js');
			script.addEventListener("load",function(){
				render(src,name);
			});
			document.body.appendChild(script);
		};
		req2.open("GET", src+'.html', true);
		req2.send();
	}
	self.rescan = function(element){
		var elements = element.querySelectorAll('div.w3component');
		for (var i=0;i<elements.length;i++) handle.call(elements[i]);
	}
	self.rescan(document.body);
	w3component = self;
});
