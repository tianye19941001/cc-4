 $(document).ready(function () {


 	// 报告切换
 	$('.report-list .tab>span').click(function () {
 		var index = $('.report-list .tab>span').index($(this));
 		$('.report-list .tab>span').removeClass('active').eq(index).addClass('active');
 		$('.report-list .reports>div').removeClass('active').hide().eq(index).addClass('active').fadeIn(500);
 	})

 	$('.topnav li').mouseenter(function () {
 		$(this).find('.child').slideDown();
 	})

 	$('.topnav li').mouseleave(function () {
 		$(this).find('.child').slideUp();
	 })
	 
	 $('body').on('click', '.itools ul li', function() {
		$(this).addClass('active').siblings().removeClass('active');
	})

	$('.mobile-menu').on('click', function(){

		if($(this).hasClass('open')) {
			$('.topnav').slideUp()
			$(this).removeClass('open')
		} else {
			$('.topnav').slideDown()
			$(this).addClass('open')
		}
	})

	window.addEventListener('scroll', function() {
		//滚动时切换tab
		$('.ty-title').each(function(){
			var thisTop = $(this).get(0).getBoundingClientRect().top;
			var type = $(this).data('type');

			if(thisTop > -50 && thisTop < 50) {
				$('.itools ul li').removeClass('active');
				$('.itools ul li').eq(type-1).addClass('active');
			}
		})
	})

 	// 滚动到指定元素
 	function movescroll(to) {
 		$('html,body').animate({
 			scrollTop: $(to).offset().top - 60
 		}, 600);
 	}

 	$('.nav-list span').click(function () {
 		var toDom = $(this).data('to');
 		movescroll('.' + toDom);
 	})

 	if (document.body.clientWidth >= 1024) {



 	} else {
 		$('.itools i').click(function () {
 			$('.itools ul').toggle()
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
 		var toTop = '.ttt';
 		var toLeft = '.ttt';
 		var toRight = '.ttt';
 		var toBottom = '.ttt';
 		var toBig = '.ttt';
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