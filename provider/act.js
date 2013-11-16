var base = require('./_base');
var _ = require('underscore')._;
var fs = require('fs');
var acts = function(fn){
	fs.readFile(__dirname+'/../data/activities.json','utf8',function(err,data){
		data = JSON.parse(data);
		if(data)
		_.each(data.acts,function(act){
			act._id=base.genId();
			act.when=new Date();
			_.extend(act,{
				whenFormatted:function(){
					return "now";
				}
			});
		});
		fn(err,data?data.acts:null);
	});
};




exports.all = function(fn){
	acts(function(err,data){
		fn(err,data);
	});
}

exports.find = function(query,fn){
	acts(function(err,data){
		fn(err,data[0]);
	});
}

exports.where = function(query,fn){
	acts(function(err,data){
		fn(err,data);
	});
}