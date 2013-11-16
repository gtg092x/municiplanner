var express = require('express'); 
var routes = express();
var actProvider = require('../provider/act')
routes.set('views', __dirname + '/../views');


exports.index=function(app){	
	
	routes.get("/",function(req, res, next){
		res.render('index', {  });
	});

	routes.get("/list",function(req, res, next){
		var acts = actProvider.all(function(acts){
			
		});
		res.render("act/list");
	});
	
	routes.get("/detail/:id",function(req, res, next){
		var id = req.params.id;
		var act = actProvider.one(function(acts){
			
		});
		res.render("act/model");
	});

	routes.get("/commit/:id",function(req, res, next){
		var id = req.params.id;
		var act = actProvider.one(function(acts){
			
		});
		res.render("act/commit");
	});
	
	return routes;
};
