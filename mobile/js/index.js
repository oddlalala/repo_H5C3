window.onload = function(){
	var banner = document.querySelector(".jd_container > .banner");
	header_bg();
	banner_turn();
	countdown();
	function header_bg(){
		var headerCon = document.querySelector(".jd_container > header > .header_container");
		var scrollEnd = banner.offsetHeight;
		var opacity = 0;
		window.onscroll = function(){
			var scrollLength = document.documentElement.scrollTop || document.body.scrollTop;
			if (scrollLength <= scrollEnd) {
				opacity = (scrollLength / scrollEnd) * .85;
			}else {
				opacity = .85;
			}
			headerCon.style.background = "rgba(201,21,35," + opacity + ")";
		}
	}
	function banner_turn(){
		var ulPictures = banner.querySelector(".pictures");
		var pointLi = banner.querySelectorAll(".points > li");
		var eachLength = banner.offsetWidth;
		var index = 1;
		function addTranslateX(l){
			ulPictures.style.transform = "translateX(" + l + "px)";
			ulPictures.style.webkitTransform = "translateX(" + l + "px)";
		}
		function addTransition(){
			ulPictures.style.transition = "transform 1s";
			ulPictures.style.webkitTransition = "transform 1s";
		}
		function removeTransition(){
			ulPictures.style.transition = "none";
			ulPictures.style.webkitTransition = "none";
		}
		// 自动轮播图且无缝
		var timer = setInterval(function(){
			index++;
			var moveLength = -(index - 1) * eachLength;
			addTranslateX(moveLength);
			addTransition();
			// 点随着图片的轮播改变
		},2000);
		ulPictures.addEventListener("transitionend",function(){
			if (index >= 9 ) {
				index = 1;
				addTranslateX(0);
				removeTransition();
			}
			if (index <= 0) {
				index = 8;
				addTranslateX((index - 1) * eachLength);
				removeTransition();
			}
			banner.querySelector(".points > li.active").classList.remove("active");
			pointLi[index - 1].classList.add("active");
		});
		// 滑动效果
		var startX = 0;
		var moveX = 0;
		var distanceX = 0;
		ulPictures.addEventListener("touchstart",function(e){
			startX = e.changedTouches[0].clientX;
			console.log(ulPictures.offsetLeft);
		});
		ulPictures.addEventListener("touchmove",function(e){
			moveX = e.changedTouches[0].clientX;
			distanceX = moveX - startX;

			clearInterval(timer);
			addTranslateX((index - 1) * eachLength + distanceX);
			console.log(ulPictures.offsetLeft);
		});
		ulPictures.addEventListener("touchend",function(e){
			// 滑动结束的时候  如果滑动的距离不超过屏幕的1/3  吸附回去，过渡
			// 滑动结束的时候  如果滑动的距离超过屏幕的1/3  切换（上一张，下一张）根据滑动的方向，过渡
			if (distanceX < eachLength / 3) {

			}else {
				
			}
		});
		
	}
	function countdown(){

	}
}