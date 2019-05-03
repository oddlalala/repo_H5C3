window.onload = function(){
	var banner = document.querySelector(".jd_container > .banner");
	header_bg();
}
function header_bg(){
	var header_container = document.querySelector(".jd_container > header > .header_container");
	var body = document.querySelector("body");
	var height_banner = banner.offsetHeight;
	var opacity = 0;
	body.onscroll = function(){
		var length = document.documentElement.scrollTop || document.body.scrollTop;
		if (length <= height_banner) {
			opacity = (length / height_banner) * .85;
		}else{
			opacity = .85;
		}
		header_container.style.background = 'rgba(201,21,35,' + opacity + ')';
	}
}
function banner_turn(){
	var pictures_ul = banner.querySelector(".jd_container > .banner > ul");

}