 $(document).ready(function () {
 	$('.open-div h2').click(function () {
 		$(this).parent().toggleClass('open');
 		setTimeout(function () {
 			$('.table-public tr').each(function () {
 				var index = $(this).parent().find('tr').index($(this));
 				var height = $(this).height();

 				var divs = $(this).parents('.table-public-warp').find('.left-icons > div');
 				divs.eq(index).height(height + 1)
 			})
 		}, 0)
 	})

 	$('.table-public tr').each(function () {
 		var index = $(this).parent().find('tr').index($(this));
 		var height = $(this).height();

 		var divs = $(this).parents('.table-public-warp').find('.left-icons > div');
 		divs.eq(index).height(height + 1)
 	})


 	$('.report-new-tabs span').click(function () {
 		var index = $('.report-new-tabs span').index($(this));
 		$('.report-new-tabs span').removeClass('active').eq(index).addClass('active');
 		$('.report-new-tabs-box').removeClass('active').eq(index).addClass('active');
 	})

 	if ($('.allergy-show').length > 0) {
 		$('.allergy-show li').each(function () {
 			var dataNum = Number($(this).find('h3 strong').text());
 			if (dataNum <= 0.3) {
 				$(this).find('.progress-ing span').addClass('progress-1');
 			} else if (dataNum > 0.3 && dataNum <= 0.8) {
 				$(this).find('.progress-ing span').addClass('progress-2');
 			} else if (dataNum > 0.8 && dataNum <= 1.3) {
 				$(this).find('.progress-ing span').addClass('progress-3');
 			} else if (dataNum > 1.3 && dataNum < 3) {
 				$(this).find('.progress-ing span').addClass('progress-4');
 			} else {
 				$(this).find('.progress-ing span').addClass('progress-5')
 			};
 		})
 	}

 	$('.index-header .menu').click(function () {
 		$(this).find('ul').toggle()
 	})

 	$('.list-all .left li, .medication .left li').click(function () {
 		var index = $(this).parents('.left').find('li').index($(this));

 		$('.show-detial').addClass('active');
 		$('.search-detial').removeClass('active');
 		$(this).parents('.left').find('li').removeClass('active').eq(index).addClass('active');
 		$(this).parents('.left').siblings('.right-detial').eq(0).find('.right').removeClass('active').eq(index).addClass('active')
 	})

 	$('#search-btn').click(function () {
 		var text = $('#search-text').val();

 		if (!text) {
 			$('.show-detial').addClass('active');
 			$('.search-detial').removeClass('active');
		} else {
			$('.search-detial').addClass('active');
			$('.show-detial').removeClass('active');
			 
			$('.search-detial ul').html('');
			var list = $('.list-all .show-detial li');
			list.each(function(){
				var inText = $(this).text();
				if(inText.indexOf(text) >= 0) {
					$('.search-detial ul').append($(this).clone())
				}
			})
		}
	 })
	 
	 var lineData = $('.third-data');
	 if(lineData.length > 0) {
		var ttdta = $('.third-data strong span').text()
		if(ttdta >= 4) {
			ttdta = 4;
		}

		var percent = 100-ttdta/4*100 + '%';
		$('.data-pic em').css({'top': percent})
	 }
 });