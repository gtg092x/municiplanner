jQuery(document).ready(function($){
  
  'use strict';
  
  //=================================== Nav Responsive ===================================//
  $('#menu').tinyNav({
      active: 'selected'
  });
  //=================================== Nav Superfish ====================================//
    jQuery(document).ready(function() {
    jQuery('ul.sf-menu').superfish();
  });
  //=================================== Text rotate ====================================//
    var speed=8000;
    $(".text_rotate .rotate").textrotator({
    animation: "fade",
    speed: 1000,
    wait:speed*200
  });
  //=================================== Slider  ===================================//
  
  $("#slider1").responsiveSlides({
    speed: speed,
    pause:true
  });
  
  $("#slider2").responsiveSlides({
    speed: speed
  });
  
  $(".news_slider").responsiveSlides({
    speed: speed
  });
  
  $(".blog_slider").responsiveSlides({
    speed: speed
  });
  
  //=================================== Totop  ===================================//
  $().UItoTop({
    scrollSpeed:speed,
    easingType:'linear'
  });
  //=================================== Slider  ===================================//
  $("#carrousel_topic").owlCarousel({
    autoPlay: speed, //Set AutoPlay to 3 seconds
    pagination: false,
    navigation: true,
    items : 3,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [979,3],
    itemsMobile : [560,1],
    stopOnHover : true
  });
  //=================================== Slider  ===================================//
  $(".slides").owlCarousel({
    autoPlay: speed, //Set AutoPlay to 3 seconds
    items : 5,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [979,3],
    stopOnHover : true
  });
  //=================================== Slider  ===================================//
  $(".gallery_blog").owlCarousel({
    autoPlay: speed, //Set AutoPlay to 3 seconds
    items : 1,
    itemsDesktop : [1199,1],
    itemsDesktopSmall : [979,1],
    itemsMobile : [560,1],
    stopOnHover : true
  });
  //=================================== Slider  ===================================//
  $("#news_carrousel").owlCarousel({
    autoPlay: speed, //Set AutoPlay to 3 seconds
    items : 3,
    pagination: false,
    navigation: true,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [979,3],
     itemsMobile : [560,1],
    stopOnHover : true
  });
  //=================================== Slider  ===================================//
  $("#news_carrousel_blog").owlCarousel({
    utoPlay: speed, //Set AutoPlay to 3 seconds
    items : 2,
    pagination: false,
    navigation: true,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [979,3],
    itemsMobile : [560,1],
    stopOnHover : true
  });
  //=================================== Submit Form  ===================================//
  $('#form').submit(function(event){
    event.preventDefault();
    var url = $(this).attr('action');
    var datos = $(this).serialize();
    $.get(url, datos, function(resultado){
      $('#result').html(resultado);
    });
  }); 
  
  //=================================== Tabs defauld  ===================================//
	$(".tab_content").hide(); //Hide all content
	$("ul.tabs li:first").addClass("active").show(); //Activate first tab
	$(".tab_content:first").show(); //Show first tab content
	
	//=================================== Tabs On Click Event  ===================================//
	$("ul.tabs li").click(function() {
		$("ul.tabs li").removeClass("active"); //Remove any "active" class
		$(this).addClass("active"); //Add "active" class to selected tab
		$(".tab_content").hide(); //Hide all tab content
		var activeTab = $(this).find("a").attr("href"); //Find the rel attribute value to identify the active tab + content
		$(activeTab).fadeIn(); //Fade in the active content
		return false;
	});	
	//=================================== Last version of Fancybox V2  ===================================//
	$('.fancybox').fancybox();
  $("a[class*=fancybox]").fancybox({
		'overlayOpacity'	:	0.7,
		'overlayColor'		:	'#000000',
		'transitionIn'		: 'fade',
		'transitionOut'		: 'fade',
    'easingIn': 'easeOutBack',
    'easingOut':'easeInBack',
		'speedIn':'700',
		'centerOnScroll'	: true,
		'titlePosition'     : 'over'
	});  
  //=================================== Accordion  ===================================//
	$('.accordion-container').hide(); 
	$('.accordion-trigger:first').addClass('active').next().show();
	$('.accordion-trigger').click(function(){
		if( $(this).next().is(':hidden') ) { 
			$('.accordion-trigger').removeClass('active').next().slideUp();
			$(this).toggleClass('active').next().slideDown();
		}
		return false;
	});   	
	//=================================== Tooltips =====================================//
	if( $.fn.tooltip() ) {
		$('[class="tooltip_hover"]').tooltip();
	}

});	
//=================================== Skins Changer ====================================//
var google;	
google.setOnLoadCallback(function()
	{
    'use strict';
    
    // Color changer
    $(".colordefault").click(function(){
      $(".skins").attr("href", "css/skins/default.css");
      return false;
    });
    
    $(".color1").click(function(){
      $(".skins").attr("href", "css/skins/blue.css");
      return false;
    });
    
    $(".color2").click(function(){
      $(".skins").attr("href", "css/skins/green.css");
      return false;
    });
	});