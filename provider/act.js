var base = require('./_base');
var _ = require('underscore')._;
var acts = 
	[
	 	{
	 		name:"Soup Kitchen",
	 		_id:base.genId(),
	 		media:{src:"http://clatl.com/imager/imagine-transit-here-the-path-of-the-beltline-seen-here-crossing-ponce-de/b/original/1281751/47b6/news_Feature1-1_12.jpg"},
	 		distance:10,
	 		when:new Date(),
	 		geo: [33.745487,-84.368434],
	 		tags:['volunteering','charity']
	 	},
	 	{
	 		name:"City Council Meeting",
	 		_id:base.genId(),
	 		media:{src:"http://clatl.com/imager/imagine-transit-here-the-path-of-the-beltline-seen-here-crossing-ponce-de/b/original/1281751/47b6/news_Feature1-1_12.jpg"},
	 		distance:10,
	 		when:new Date(),
	 		geo: [33.745487,-84.368434],
	 		tags:['government','council']
	 	}
	];
_.each(acts,function(act){
	_.extend(act,{
		whenFormatted:function(){
			return "now";
		}
	});
});


exports.all = function(fn){
	return fn(null,acts);
}

exports.one = function(query,fn){
	return fn(null,acts);
}

exports.list = function(query,fn){
	return fn(null,acts);
}