$(document).ready(function() {

	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Fancybox config
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$.fancybox.defaults.animationEffect = 'fade'
	$.fancybox.defaults.buttons = ['zoom', 'thumbs', 'close']


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Go up button
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	var go_up_btn = $('#go-up-button')

	$(window).on('scroll', function() {
		if ($(window).scrollTop() > 1000) {
			go_up_btn.addClass('_is-shown')
		} else {
			go_up_btn.removeClass('_is-shown')
		}
	})

	go_up_btn.on('click', function(e) {
		e.preventDefault()
		$('html, body').animate({scrollTop:0}, 1000)
	})


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Smooth scroll (anchors)
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$('a[data-anchor]').bind('click.smoothscroll', function(){
		var target = $(this).attr('href'),
				bl_top = $(target).offset().top - 75;

		$('body, html').animate({scrollTop: bl_top}, 1000)

		return false
	})


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Fix closing dropdown menu when selecting the text
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$('.dropdown-menu').on('click', function (e) {
		e.stopPropagation()
	})


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Adaptive header menu
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	const headerMore = $('.header-bottom .navigation-list > li.more')

	headerMore.find('.more-btn').on('click', function(e) {
		e.preventDefault()
		headerMore.toggleClass('_is-toggled')
	})
	$(document).on('click', function(e) {
		if (!headerMore.is(e.target) && headerMore.has(e.target).length === 0) {
			headerMore.removeClass('_is-toggled')
		}
	})


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Brands popover
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$('[data-toggle="brand-popover"').popover({
		container: 'body',
		trigger: 'manual',
		html: true,
		template: '<div class="popover popover-brands" role="tooltip"><div class="arrow"></div><div class="popover-body"></div></div>',
		popperConfig: {
			placement: 'bottom',
		},
		content: function() {
			if ($(this).parent().find('ul').length) {
				return $(this).next().clone()
			} else {
				return '<div class="text-center">Пусто :(</div>'
			}
		}
	}).on('mouseenter', function() {
		var _this = this
		$(this).popover('show')
		$('.popover').on('mouseleave', function() {
			$(_this).popover('hide')
		})
	}).on('mouseleave', function() {
		var _this = this
		setTimeout(function() {
			if (!$('.popover:hover').length) {
				$(_this).popover('hide')
			}
		}, 300)
	})

})
