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
					var month=new Array();
					month[0]="Jan";	month[1]="Feb";	month[2]="Mar";
					month[3]="Apr";	month[4]="May"; month[5]="Jun";
					month[6]="Jul";	month[7]="Aug";	month[8]="Sep";
					month[9]="Oct";	month[10]="Nov";month[11]="Dec";
					var d = new Date();
					return month[d.getMonth()] + " " + d.getDay() + " "+ d.getFullYear();
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

exports.find = function(id,fn){
	acts(function(err,data){
		fn(err,data[id]);
	});
}

exports.where = function(query,fn){
	acts(function(err,data){
		fn(err,data);
	});
}