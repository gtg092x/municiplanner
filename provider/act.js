var base = require('./_base');
var _ = require('underscore')._;
var acts = 
	[
	 	{
	 		name:"Soup Kitchen",
	 		_id:base.genId(),
	 		media:{src:"/image/foo.jpg"},
	 		distance:10,
	 		when:new Date(),
	 		geo: [33.745487,-84.368434],
	 		tags:['volunteering','charity']
	 	},
	 	{
	 		name:"City Council Meeting",
	 		_id:base.genId(),
	 		media:{src:"/image/foo.jpg"},
	 		distance:10,
	 		when:new Date(),
	 		geo: [33.745487,-84.368434],
	 		tags:['government','council']
	 	}
	];

exports.all = function(fn){
	return fn(null,acts);
}

exports.one = function(query,fn){
	return fn(null,acts);
}

exports.list = function(query,fn){
	return fn(null,acts);
}