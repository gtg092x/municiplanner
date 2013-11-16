var request = require('request');
var _ = require('underscore')._;
var fs = require('fs');
var async = require('async');
var jsdom = require("jsdom");
var base = require('../provider/_base');



function processGoogleCalData(data,fn){
	var data = data.feed;
	var title = data.title.$t;
	data = data.entry;
	var results=[];
	_.each(data,function(entry){
		//console.log(entry);
		var result = {};
		result.name = title+" - "+entry.title.$t;
		result.description = entry.content.$t;
		result.where = entry.where || {};
		result.where.address=entry.gd$where[0].valueString;
		result.when = new Date(entry.gd$when[0].startTime);
		results.push(result);
	});
	fn(null,results);
};

function getRandomItem(arr){
	return arr[Math.floor(Math.random()*arr.length)];
};

function getRandomCouncilImage(){
	return getRandomItem(["http://citycouncil.atlantaga.gov/ac/images/backgrounds/resourcepanel.jpg","http://citycouncil.atlantaga.gov/press/62.gif"]);
};

function getCouncilEvents(fn){
	var counilEventsFeed = "http://www.google.com/calendar/feeds/brasscast@gmail.com/public/full?alt=json&orderby=starttime&max-results=15&singleevents=true&sortorder=ascending&futureevents=true";
	request(counilEventsFeed, function (error, response, body) {
		if (!error && response.statusCode == 200) {
		    
		    /*
		     * Mapping Google Data
		     */
		    processGoogleCalData(JSON.parse(body),function(err,data){
		    	_.each(data,function(dat){
		    		dat.media={src:getRandomCouncilImage()};
		    	});
		    	fn(err,data);
		    });
		    /*
		     * End mapping Google Data
		     */
		}else{
			fn(error||"not found",null);
		}
	});
};

function getRandomElectionImage(){
	return getRandomItem(["http://www.iac15.org/wp-content/uploads/2013/08/ballot.jpg","http://clatl.com/binary/84e9/1343710163-july-31-2012-elections-atlanta.jpeg","http://images.huffingtonpost.com/2012-10-02-http%3A-www.google.com-imgres%3Fimgurl%3Dhttp%3A-www.randishade.com-UserFiles-vote.jpg%26imgrefurl%3Dhttp%3A-www.randishade.com-212-vote.htm%26h%3D1044%26w%3D1050%26sz%3D265%26tbnid%3D3vmmZTFVkvHaOM%3A%26tbnh%3D82%26tbnw%3D82%26zoom%3D1%26usg%3D__WJf1MgGykMGSKtmGxVQv1DzXbMQ%3D%26docid%3DypEX5_LJAM4ucM%26sa%3DX%26ei%3DQ4FqUPaIDJK89QTRioD4Ag%26ved%3D0CCYQ9QEwAA%26dur%3D4598-VoteButton.jpg"]);
};

function getElections(fn){
	var electionsPage = "http://www.sos.ga.gov/elections/election_dates.htm";
	jsdom.env(
			  electionsPage,
			  ["http://code.jquery.com/jquery.js"],
			  function (errors, window) {
				  var results = [];
				  if(!window){
					  console.log(errors);
					  fn(errors,null);
					  return;
				  }
				  var $ = window.$;
				  var previousTitle="";
				  window.$("tr","table.MsoNormalTable:first").each(function(i){
					  
					  if(i){
						  act = {};
						  $("td",this).each(function(i){
							  switch(i){
							  		case 0:
							  			act.name = $.trim($(this).text().replace(/\s+/g,' '));
							  			
							  			previousTitle = act.name;
							  			break;
							  		case 1:
							  			act.description = "Registration deadline: "+$.trim($(this).text().replace(/\s+/g,' '));
							  			break;
							  		case 2:
							  		default:
							  			act.when = new Date($.trim($(this).text().replace(/\s+/g,' ')));
							  			break;
							  }
						  });
						  act.media= {src:getRandomElectionImage()};
						  act.where={};
						  act.where.address="Your Polling Location";
						  results.push(act);
					  }
				  });
				  
				  fn(errors,results);
			  }
			);
};

function getRandomVolunteerImage(){
	return getRandomItem(["http://www.msstrength.com/wp-content/themes/zen/images/leaves.jpg","http://blog.operationhope.org/home/wp-content/uploads/2013/04/Volunteers.jpg"]);
};

function getVolunteer(fn){
	var volunteerPage = "http://www.volunteermatch.org/search/index.jsp?r=msa&l=39901";
	jsdom.env(
			volunteerPage,
			  ["http://code.jquery.com/jquery.js"],
			  function (errors, window) {
				  var results = [];
				  if(!window){
					  console.log(errors);
					  fn(errors,null);
					  return;
				  }
				  var $ = window.$;
				  window.$(".searchitem","#searchresults").each(function(i){
				
					  
					  act = {};
					  act.when = new Date($.trim($('.oppdate',this).text().split('-')[0]).replace(/\s+/g,' '));
					  var html = $(".search_opp_location",this).html().replace(/></g,"> <");
					  
					  act.where = {address:$.trim($(html).text()).replace(/\s+/g,' ')};
					  act.name=$.trim($("a:first",this).text()).replace(/\s+/g,' ');
					  act.media= {src:getRandomVolunteerImage()};
					  results.push(act);
				 
				  });
				  
				  fn(errors,results);
			  }
			);
};



/*var results = {acts:[]};

getCouncilEvents(function(err,body){
	results.acts=results.acts.concat(body);
	
});*/
/*getElections(function(err,data){
	console.log(data);
	console.log(err);
});*/
console.log('calling reduce');

var data=[];

async.map([getCouncilEvents,getElections,getVolunteer],function(item,next){
	
	item(function(err,data){
		next(err,data||[]);
	});
},function(err,results){
	async.reduce(results, [], function(memo, data, callback){
	    // pointless async:
	    
		
		callback(null, (memo||[]).concat(data||[]))
		
	    
	}, function(err, result){
	    result = _.filter(result,function(item){
	    	return !!item;
	    });
	    _.each(result,function(item){
	    	if(!item._id)
	    		item._id=base.genId();
	    });
	    //console.log(result);
	    result = _.sortBy(result,function(item){
	    	return item.when.getTime();
	    });
	    if(result && result.length)
	    	fs.writeFile(__dirname+'/../data/activities.json',JSON.stringify({acts:result},null,4),function(err){
	    		console.log(!err?"Success!":"Fail");
	    	});
	});

});

