/**
 * New node file
 */
module.exports = function(grunt) {
	var static_base = "./public/",
	 js_base = static_base+"scripts/",
	 media_base = static_base+"images/",
	 document_base = "views/",
	 
	 documentTypes=['jade','md','markdown','html'],
	 css_base = static_base+"styles/";
	 var coffee_lib_compiled =js_base+"lib/coffee/coffee.js",
	 coffee_src_compiled =js_base+"src/coffee/coffee.js";
	 var pretty=true;
	 

  // Project configuration.
	  
	var grunt_config = {
		    pkg: grunt.file.readJSON('package.json'),
		    bower: {
		        install: {
		          options: { 
		            targetDir: './lib',
		            layout: 'byType',
		            install: true,
		            verbose: false,
		            cleanTargetDir: false,
		            cleanBowerDir: false
		          }
		        }
		      },
		   
		    uglify: {
		    	      
			      dist: {
			    	  options: {
			  	        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
			  	        sourceMap: 'map/site.jsm',
			  	      beautify:true
			  	      },
			        src: [
			              js_base+'lib/coffee/*.js',
			              js_base+'lib/*.js',
			              js_base+'src/coffee/*.js',
			              js_base+'src/*.js'
			              ],
			        dest: js_base+'site.min.js'
			      }
		    	
		    },
		    copy:{
		    	lib:{
		    		files:[
		    		       {
		    		    	   expand:true,src:["bower_components/bootstrap/dist/fonts/*"],dest:static_base+"fonts/",filter:"isFile",flatten:true
		    		       }
		    		       ]
		    	}
		    },
		    concat:{ 
		    	
		      lib:{
		    	  options:{separator:";"},
			        src: [
			              'bower_components/bootstrap/dist/js/bootstrap.js',
			              'bower_components/typeahead.js/dist/typeahead.js',
			              'bower_components/underscore/underscore.js',
			              'bower_components/backbone/backbone.js',
			              'bower_components/hogan/web/builds/2.0.0/hogan-2.0.0.mustache.js'			              
			              
			              ],
			        dest: js_base+'lib.js'
		      },
		      lib_dev:{
		    	  options:{separator:";"},
			        src: [
			              'bower_components/bootstrap/dist/js/bootstrap.min.js',
			              'bower_components/typeahead.js/dist/typeahead.min.js',
			              'bower_components/underscore/underscore-min.js',
			              'bower_components/backbone/backbone-min.js',
			              'bower_components/hogan/web/builds/2.0.0/hogan-2.0.0.mustache.js'			              
			              
			              ],
			        dest: js_base+'lib.min.js'
		      },
		      jquery:{
		    	  options:{separator:";"},
			        src: ['bower_components/jquery/jquery.min.js',			              
			              'bower_components/jquery.cookie/jquery.cookie.js',
			              'bower_components/jquery-touchswipe/jquery.touchSwipe.js',
			              'bower_components/jquery-form/jquery.form.js',
			              'bower_components/json2/json2.js',
			              'scripts/lib/jquery/*.js'
			              
			              ],
			        dest: js_base+'jquery.min.js'
		      },
		      lib_css:{    	  
			        src: [  'bower_components/bootstrap/dist/css/bootstrap.min.css',
			                'bower_components/animate.css/animate.css',
			                'public/stylesheets/lib/*',
			                'bower_components/bootstrap-glyphicons/css/bootstrap-glyphicons.css'
			              
			              ],
			        dest: css_base+'lib.min.css'
		      },
		      lib_css_dev:{    	  
			        src: [  'bower_components/bootstrap/dist/css/bootstrap.css',
			                'bower_components/animate.css/animate.css',
			                'public/stylesheets/lib/*',
			                'bower_components/bootstrap-glyphicons/css/bootstrap-glyphicons.css'
			              
			              ],
			        dest: css_base+'lib.css'
		    },
		      shiv:{	    	  
			        src: ['bower_components/html5shiv/dist/html5shiv.js'
			        
			              
			              ],
			        dest: js_base+'shiv.js'
		    }
		    },
		    coffee:{
		    	options: {
		    	      sourceMap: true
		    	    },
		    	compile:{
		    		files:{
		    				
		    	    }
		    	}//
		    },
		    compass:{
		    	dist:{
		    		options:{
		    			sassDir:css_base+"scss",
		    		//	specify:css_base+"scss/style.scss",
		    			cssDir:css_base,
		    			imagesDir:static_base+"images"
		    		}
		    	}
		    },
		  /*  jade: {
		    	  compile: {
		    	    options: {
		    	    	filters: require('./filters.js'),
		    	    	pretty:pretty,
			    	      data: {
			    	        debug: true,
			    	        pretty:pretty
			    	      }
		    	    },
		    	    files:[{
		    	      //"index.html": [document_base+"index.jade"]
		    	    	src: [document_base+'*.jade'], dest: './',ext:'.html',flatten:true,
		    	    //}
		    	    		expand:true,filter: function(filepath) {
		    	    			
		    	    			var localpath = filepath.replace(/^views\//,"");
		    	    			grunt.log.write(localpath);
		    	    	        return localpath.indexOf("_")!=0;
		    	    	      }
		    	    }] 
		    	  }
		    	},*/
		    watch: {
		        css:{
		        	options: { livereload: true },
			    	files: [css_base+'scss/*.scss',css_base+'scss/modules/*.scss'],
			        tasks: ['compass']
			      },
			      coffee:{
			    	  files: [js_base+'**/*.coffee'],
				        tasks: ['coffee','uglify']
			      }
			      ,js:{
			    	  options: { livereload: true },
			    	  files: [js_base+"lib.min.js",js_base+'lib/*.js',js_base+'src/*.js'],
				        tasks: ['uglify']
			      }
			      ,image:{
			    	  options: { livereload: true },
			    	  files: [media_base+'/**.*'],
				        tasks: []
			      }
			      ,jade:{
			    	  options: { livereload: true },
			    	 files: [document_base+"**.{"+documentTypes.join(',')+"}",document_base+"**/*.{"+documentTypes.join(',')+"}"],
				      tasks: []
			      }
		        }
		  };
	
		var Markdown = require('markdown');
	grunt_config.coffee.compile.files[coffee_lib_compiled]=[js_base+'lib/*.coffee'];
	grunt_config.coffee.compile.files[coffee_src_compiled]=[js_base+'src/*.coffee'];
		
		
  grunt.initConfig(grunt_config);
  

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  //grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');  

  // Default task(s).
  grunt.registerTask('default', [//'coffee',
                                 'compass',"concat",'uglify','copy'
                                 ]);
  //grunt.registerTask('watch', ['watch']);
  

};