$(function(){
	function getData(callback){
		if (window.data) {
			callback&&callback(window.data);
		} else {
			$.getJSON('js/data.json',function(res){
				window.data = res;
				callback&&callback(window.data);
			});
		}
	}
	function render(){
		getData(function(res){
			var isMobile = $(window).width() > 768;
			var html_points = template('template_points',{url: res});
			var html_images = template('template_images',{url: res,isM: isMobile});
			$('.carousel-indicators').html(html_points);
			$('.carousel-inner').html(html_images);
		});
	}
	$(window).on('resize',function(){
		render();
	}).trigger('resize');

	var $wjs_banner = $('.wjs_banner');
	var startPos = 0;
	var length = 0;
	var $carousel = $('.carousel');
	var isMove = false;
	$wjs_banner.on('touchstart',function(e){
		startPos = e.originalEvent.targetTouches[0].clientX;
	}).on('touchmove',function(e){
		length = e.originalEvent.targetTouches[0].clientX - startPos;
		isMove = true;
	}).on('touchend',function(e){
		console.log(length);
		if (length < -50) {
			$carousel.carousel('next');
		}
		if (length > 50) {
			$carousel.carousel('prev');
		}
		startPos = 0;
		length = 0;
		isMove = false;
	});
})