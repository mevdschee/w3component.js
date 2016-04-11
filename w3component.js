var w3component = $(function(){
	var self = this;
	self.components = {};
	var templates = {};
	var render = function(path,name){
		$(['div.w3component[w3component="'+path+'"]']).each(function(){
			$(this).attr('rendered',1);
			new self.components[name]($(this),templates[name]);
		});
	}
	var handleComponent = function(){
		var path = $(this).attr('w3component');
		if ($(this).attr('rendered')) return;
		var name = path.split('/').pop();
		if (self.components[name]===null) return;
		if (self.components[name]!==undefined) return render(path,name);
		self.components[name] = null;
		$.ajax({dataType:'text', url: path+'.css',success:function(styles){
			$('<style>').appendTo('body').text(styles);
		}});
		$.ajax({dataType:'text', url: path+'.html',success:function(template){
			templates[name] = template;
			$('<script>').attr('src',path+'.js').appendTo('body').on('load',function(){
				render(path,name);
			});
		}});
	}
	self.rescan = function(element){
		element.find('div.w3component').each(handleComponent);
	}
	self.rescan($(document));
	w3component = self;
});
