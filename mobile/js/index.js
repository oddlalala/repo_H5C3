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
		var moveLength = 0;
		function addTranslateX(l){
			ulPictures.style.transform = "translateX(" + l + "px)";
			ulPictures.style.webkitTransform = "translateX(" + l + "px)";
		}
		function addTransition(){
			ulPictures.style.transition = "transform .5s";
			ulPictures.style.webkitTransition = "transform .5s";
		}
		function removeTransition(){
			ulPictures.style.transition = "none";
			ulPictures.style.webkitTransition = "none";
		}
		function setPointLi(){
			banner.querySelector(".points > li.active").classList.remove("active");
			pointLi[index - 1].classList.add("active");
		}
		// 1 自动轮播图且无缝
		var timer = setInterval(function(){
			index++;
			moveLength = -(index - 1) * eachLength;
			addTranslateX(moveLength);
			addTransition();
		},2000);
		// 2 点随着图片的轮播改变
		ulPictures.addEventListener("transitionend",function(){
			if (index >= 9 ) {
				index = 1;
				moveLength = -(index - 1) * eachLength;   /*index改变，实时改变moveLength的值*/
				addTranslateX(moveLength);
				removeTransition();
			}
			if (index <= 0) {
				index = 8;
				moveLength = -(index - 1) * eachLength;
				addTranslateX(moveLength);
				removeTransition();
			}
			setPointLi();
		});
		// 3 滑动效果
		var startX = 0;
		var distanceX = 0;
		ulPictures.addEventListener("touchstart",function(e){
			startX = e.changedTouches[0].clientX;
			clearInterval(timer);
		});
		ulPictures.addEventListener("touchmove",function(e){
			var	moveX = e.changedTouches[0].clientX;
			distanceX = moveX - startX;
			addTranslateX(moveLength + distanceX);
			removeTransition();   /*否则会出现移不动的感觉*/
		});
		ulPictures.addEventListener("touchend",function(e){
			// 4.1 滑动结束的时候  如果滑动的距离不超过屏幕的1/3  吸附回去，过渡
			// 4.2 滑动结束的时候  如果滑动的距离超过屏幕的1/3  切换（上一张，下一张）根据滑动的方向，过渡
			if (Math.abs(distanceX) < eachLength / 3) {
				addTranslateX(moveLength);   /*index没变，moveLength不变*/
				addTransition();
			}else {
				if (distanceX < 0) {
					index++;
					moveLength = -(index - 1) * eachLength;
				}else {
					index--;
					moveLength = -(index - 1) * eachLength;
				}
				addTranslateX(moveLength);
				addTransition();
			}
			timer = setInterval(function(){
				index++;
				moveLength = -(index - 1) * eachLength;
				addTranslateX(moveLength);
				addTransition();
			},2000);

		});
		
	}
	function countdown(){
		var duration = .2 * 60 * 60;
		var spansTime = document.querySelectorAll(".jd_container > .products > .section01 > .section_header > .time > span");
		var timer = setInterval(function(){
			duration--;
			var h = Math.floor(duration / 60 / 60);
			var m = Math.floor(duration / 60 % 60);
			var s = Math.floor(duration % 60);
			spansTime[0].innerHTML = Math.floor(h / 10);
			spansTime[1].innerHTML = Math.floor(h % 10);
			spansTime[3].innerHTML = Math.floor(m / 10);
			spansTime[4].innerHTML = Math.floor(m % 10);
			spansTime[6].innerHTML = Math.floor(s / 10);
			spansTime[7].innerHTML = Math.floor(s % 10);
			if (duration <= 0) {
				clearInterval(timer);
			}
		},1000);
	}
}