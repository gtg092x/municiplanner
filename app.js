
/**
 * Module dependencies.
 */

//connect database
//var db = require('./config/mongo').init();

/*
 * mdrake: init schemas
 */
//require('./schema/user').init();
//require('./schema/profile').init();
//require('./schema/media').init();

/*
 * Express basics
 */
var express = require('express')
  , routes = require('./routes')
    
  , http = require('http')
  //, passport = require('passport')
  //, passportManager = require('./auth/passport')
  , path = require('path')
  ,_ = require('underscore')._;


//var AWS = require('aws-sdk');
//AWS.config.loadFromPath(__dirname+"/config/aws.json");

var app = express();

// all environments
app.set('port', process.env.PORT || 8006);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('env',process.env.NODE_ENV ||'development');
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.cookieParser()); 
app.use(express.bodyParser());
app.use(express.session({ secret: 'check_file' }));



//app.use(passport.initialize());
//app.use(passport.session());



app.use(express.methodOverride());






app.use(function(req, res, next){
	res.locals.path = req.path;	
	res.locals.pathname = req.path;
	res.locals.auth = req.user;
	next();
});

app.configure('development', function(){
	  app.use(express.errorHandler());
	  app.locals.pretty = true;
	  app.set('view options', { pretty: true });
	});

//development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(app.router);



app.use(express.static(path.join(__dirname, 'public')));



//passportManager.manage(passport);





//app.use("/account",require('./routes/account').index(app,passport));
//app.use('/profile',require('./routes/profile').index(app,passport));
//app.use('/media',require('./routes/media').index(app,passport));

app.use(routes.index(app));





http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
