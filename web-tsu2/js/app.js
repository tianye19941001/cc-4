 $(document).ready(function(){
	var ty_public = { 
		brower: function(){
			var userAgent = navigator.userAgent; 
		    var isOpera = userAgent.indexOf("Opera") > -1;
		    if (isOpera) {
		        return "Opera"
		    }; 
		    if (userAgent.indexOf("Firefox") > -1) {
		        return "FF";
		    } 
		    if (userAgent.indexOf("Chrome") > -1){
			  return "Chrome";
			 }
		    if (userAgent.indexOf("Safari") > -1) {
		        return "Safari";
		    } 
		    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
		    	var IEMethod = userAgent.slice(userAgent.indexOf("MSIE")+5,userAgent.indexOf("MSIE")+6);
		        return IEMethod;
		    }
		},
		stopDefault:function(e){
			if ( e && e.preventDefault ){
				e.preventDefault(); 
			}else{
				window.event.returnValue = false; 
				return false;
			}
		},
		stopBubble:function(e){
			if ( e && e.stopPropagation ){
				e.stopPropagation(); 
			}else{
				window.event.cancelBubble = true;
				return false;
			}
		},
		setCookies: function (c_name,value,expiredays)
		{
			var exdate=new Date();
			exdate.setDate(exdate.getDate()+expiredays);
			document.cookie= c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
		},
		getCookies: function(c_name){
			if (document.cookie.length>0){
				c_start=document.cookie.indexOf(c_name + "=")
				if (c_start!=-1){ 
				    c_start=c_start + c_name.length+1 
				    c_end=document.cookie.indexOf(";",c_start)
			    	if (c_end==-1) c_end=document.cookie.length
			   		return unescape(document.cookie.substring(c_start,c_end))
			    } 
			}
			return ""
		}
	}
	$('.school_life_content').eq(0).show()

	$('.school_life_list a').click(function(){
		var index =  $('.school_life_list a').index($(this));
		$('.school_life_content').hide().eq(index).slideDown(500);
		$('.school_life_list a').removeClass('active').eq(index).addClass('active')
	})

	$('#student-right').click(function(){
		swiperStudent.slideNext()
	})

	$('#student-left').click(function(){
		swiperStudent.slidePrev()
	})

	$('.menu').click(function(){
		var height = $(window).height();
		$('body').css({'overflow':'hidden', 'height': height});
		$('.nav_list').show(300);
		movescroll('body');
		$('.nav').css({'position': 'fixed', 'top': 0, 'left': 0})
	})

	$('.nav_list > .close').click(function(){
		$('body').css({'overflow':'auto', 'height': 'auto'});
		$('.nav_list').hide(300);
		$('.nav').css({'position': 'relative'});
		movescroll('body');
	})

	// 报告切换
	$('.report-list .tab>span').click(function(){
		var index = $('.report-list .tab>span').index($(this));
		$('.report-list .tab>span').removeClass('active').eq(index).addClass('active');
		$('.report-list .reports>div').removeClass('active').hide().eq(index).addClass('active').fadeIn(500);
	})

	// 滚动到指定元素
	function movescroll(to) {
		$('html,body').animate({scrollTop: $(to).offset().top-60},600);
	}

	$('.nav-list span').click(function(){
		var toDom = $(this).data('to');
		movescroll('.' + toDom);
	})
	
	if (document.body.clientWidth >= 1024) {

		$('.nav_list').on('mouseenter', function(){
			$('.nav_list .in').append('<em></em>');
		})

		$('.nav_list').on('mouseleave', function(){
			$('.nav_list em').remove();
		})

		$('.nav_list a').on('mouseenter', function(e){

			var index = $('.nav_list a').index($(this));
			var left = $(this).get(0).offsetLeft + 15;
			if (index == 0) left = 0;
			setTimeout(function(){
				$('.nav_list em').css('left', left)
			},0)
		})
		
	}else{
		var prev = $('.nav_list .active').prev();
		if(prev.length > 0) prev.css({'border-bottom': 0})
	}

	// 动画延时函数
	function adddelay(obj,time){
		if (obj.length>0) {
			for (var i = 0; i < obj.length; i++) {
				obj.eq(i).addClass('an_delay'+(i*time+3));
			}
		}
	}

	// 动画增加函数
	function addAnimate(elem,Class,count,nums){
		if( elem.length > 0){
			var offsetT = elem.offset().top;
			var overHeight = $(document).scrollTop() + $(window).height() - 80;
			if (elem.length>=1){
				for( var i = 0; i < elem.length; i++ ){
					if (overHeight > elem.eq(i).offset().top){
						if (!elem.eq(i).hasClass(Class)) {
							elem.eq(i).addClass(Class);
						}
					}
				}
			}
		}
	}

	// 动画
	function animateInit(){
		var toTop = '.content,.student_life,footer,.ty-title,.ty-projects .project,.ty-general .in,.report-list,.ty-new-list a,.new-main p,.new-main img,.set-in .zy';
		var toLeft = '.title,.ts-tit,.school_life_content,.nav-list,.dean-say,.ty-training .in,.ty-connect p,.ty-guidance .r,.ty-recruit,.ty-vocation,.report-in .right,.ty-new-list2 .list a,.ty-new-list3 .list a';
		var toRight = '.newList,.school_life_list,.ty-more,.ty-more-1,.ty-more-2,.ty-more-3,.ty-more-4,.ty-banner h2,.dean-img,.ty-guidance img,.report-in .left,.left-bar .time,.left-bar .share,.set-in .img,.ty-pro-list';
		var toBottom = '.e,.ty-connect img';
		var toBig = '.points i,.ty-how-connect,.teacher';
		addAnimate($(toTop),'an_toTop');
		addAnimate($(toLeft),'an_toLeft');
		addAnimate($(toRight),'an_toRight');
		addAnimate($(toBottom),'an_toBottom');
		addAnimate($(toBig),'an_toBig');
	}

	$(window).scroll(function() {
  	animateInit();
	});

	(function init(){
		animateInit();
	})();

	// 事件聚合
	$('.search-inp .search').click(function(){
		$('.search-inp').addClass('active');
	})

	$('.search-inp .close').click(function(){
		$('.search-inp').removeClass('active');
	})

	$('.share .weixin').click(function(){
		$('.bdsharebuttonbox .bds_weixin')[0].click();
		return false
	})

	$('.share .qq').click(function(){
		$('.bdsharebuttonbox .bds_sqq')[0].click();
		return false
	})

	$('.share .qqzone').click(function(){
		$('.bdsharebuttonbox .bds_qzone')[0].click();
		return false
	})

	$('.share .weibo').click(function(){
		$('.bdsharebuttonbox .bds_tsina')[0].click();
		return false
	})
});
