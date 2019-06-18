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
})