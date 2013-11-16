var express = require('express'); 
/*
 * GET home page.
 */
var routes =  express();

routes.set('views', __dirname + '/../views');


exports.index=function(app){	
	
	

	routes.get("/",function(req, res,next){
		res.render('index', {  });
	});
	
	
	routes.get("/about/app",function(req, res,next){
		res.render('about/app', {  });
	});
	
	routes.get("/article/:id",function(req, res,next){
		var id = req.params.id;
		var path = __dirname+"/../documents/markdown/"+id+".md";
		
		var markdown = require("markdown").markdown;
		
		var fs = require("fs");
		
		fs.readFile(path, 'utf8', function (err,data) {
			if(!err){
				var page = markdown.toHTML(data);
				res.render('page', { page:page });
			}else{
				res.write("page not found");
				res.end();
			}
		});
		
	});
	
	
	return routes;
};
