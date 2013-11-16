$(function(){
	var pause=false;
	$("section#index").each(function(){
		//$(".feed-item").slice(0,5).addClass("in");
		for(var i =0;i<5;i++)
			$(".feed-item").not(".in").last().slice(0,1).addClass('in');
		window.setInterval(function(){
			if(!pause)
			$(".feed-item").not(".in").last().slice(0,1).addClass('in');
		},4000);
	});
	$("#pause").click(function(){
		if($(this).hasClass('btn-danger')){
			$(this).removeClass('btn-danger').addClass('btn-success').text("Resume");
			pause=true;
		}else{
			$(this).addClass('btn-danger').removeClass('btn-success').text("Pause");
			pause=false;
		}
	});
	$("#all").click(function(){
		$(".feed-item").not(".in").addClass('in');
	});
});
