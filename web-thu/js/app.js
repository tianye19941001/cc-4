 $(document).ready(function () {
 	// 滚动到指定元素
 	function movescroll(to) {
 		$('html,body').animate({
 			scrollTop: $(to).offset().top - 60
 		}, 600);
 	}

 	$('.menu').click(function () {
 		var height = $(window).height();
 		$('body').css({
 			'overflow': 'hidden',
 			'height': height
 		});
 		$('.nav_list').show(300);
 		movescroll('body');
 		$('.nav').css({
 			'position': 'fixed',
 			'top': 0,
 			'left': 0
 		})
 	})

 	$('.nav_list > .close').click(function () {
 		$('body').css({
 			'overflow': 'auto',
 			'height': 'auto'
 		});
 		$('.nav_list').hide(300);
 		$('.nav').css({
 			'position': 'relative'
 		});
 		movescroll('body');
 	})



 	$('.nav-list span').click(function () {
 		var toDom = $(this).data('to');
 		movescroll('.' + toDom);
 	})

 	if (document.body.clientWidth >= 1024) {

 		$('.nav_list').on('mouseenter', function () {
 			$('.nav_list .in').append('<em></em>');
 		})

 		$('.nav_list').on('mouseleave', function () {
 			$('.nav_list em').remove();
 		})

 		$('.nav_list a').on('mouseenter', function (e) {

 			var index = $('.nav_list a').index($(this));
 			var left = $(this).get(0).offsetLeft + 15;
 			if (index == 0) left = 0;
 			setTimeout(function () {
 				$('.nav_list em').css('left', left)
 			}, 0)
 		})

 	} else {
 		var prev = $('.nav_list .active').prev();
 		if (prev.length > 0) prev.css({
 			'border-bottom': 0
 		})
 	}

 	// 动画延时函数
 	function adddelay(obj, time) {
 		if (obj.length > 0) {
 			for (var i = 0; i < obj.length; i++) {
 				obj.eq(i).addClass('an_delay' + (i * time + 3));
 			}
 		}
 	}

 	// 动画增加函数
 	function addAnimate(elem, Class, count, nums) {
 		if (elem.length > 0) {
 			var offsetT = elem.offset().top;
 			var overHeight = $(document).scrollTop() + $(window).height() - 80;
 			if (elem.length >= 1) {
 				for (var i = 0; i < elem.length; i++) {
 					if (overHeight > elem.eq(i).offset().top) {
 						if (!elem.eq(i).hasClass(Class)) {
 							elem.eq(i).addClass(Class);
 						}
 					}
 				}
 			}
 		}
 	}

 	// 动画
 	function animateInit() {
 		var toTop = '.content,.student_life,footer,.ty-title,.ty-projects .project, .map .student,.ty-general .in,.report-list,.ty-new-list a,.new-main p,.new-main img,.ty-bk img,.ty-department-list,.set-in .zy,.doctor-list,.ty-product-list li,.ty-public-div .detial p';
 		var toLeft = '.title,.ts-tit,.school_life_content,.nav-list,.dean-say,.ty-training .in,.ty-connect p,.ty-guidance .r,.ty-recruit,.ty-vocation,.report-in .right,.ty-new-list2 .list a,.ty-new-list3 .list a,.ty-zs img,.ty-download img,.ty-sport .in,.ty-ugd-programme img,.ty-report-list li,.main .step,.ty-years li';
 		var toRight = '.newList,.school_life_list,.ty-more,.ty-banner h2,.dean-img,.ty-guidance img,.report-in .left,.left-bar .time,.left-bar .share,.ty-zs .in,.ty-download .in,.ty-sport img,.set-in .img,.ty-pro-list,.doctor-list li, .main .about p,.ty-public-div img';
 		var toBottom = '.e,.ty-connect img,.ty-connect-zs .in';
 		var toBig = '.points i,.ty-how-connect,.teacher,.ty-ugd-course img';
 		addAnimate($(toTop), 'an_toTop');
 		addAnimate($(toLeft), 'an_toLeft');
 		addAnimate($(toRight), 'an_toRight');
 		addAnimate($(toBottom), 'an_toBottom');
 		addAnimate($(toBig), 'an_toBig');
 	}

 	$(window).scroll(function () {
 		animateInit();
 	});

 	(function init() {
 		animateInit();
 	})();

 	// 事件聚合
 	$('.search-inp .search').click(function () {
 		$('.search-inp').addClass('active');
 	})

 	$('.search-inp .close').click(function () {
 		$('.search-inp').removeClass('active');
 	})

 	$('.share .weixin').click(function () {
 		$('.bdsharebuttonbox .bds_weixin')[0].click();
 		return false
 	})

 	$('.share .qq').click(function () {
 		$('.bdsharebuttonbox .bds_sqq')[0].click();
 		return false
 	})

 	$('.share .qqzone').click(function () {
 		$('.bdsharebuttonbox .bds_qzone')[0].click();
 		return false
 	})

 	$('.share .weibo').click(function () {
 		$('.bdsharebuttonbox .bds_tsina')[0].click();
 		return false
 	})
 });