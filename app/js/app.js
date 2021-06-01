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
	* Sticky header
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	new Headhesive('header.header', {
		offset: 500,
		classes: {
			clone:   'header--clone',
			stick:   'header--stick',
			unstick: 'header--unstick'
		},
		onInit: function() {
			$('.header--clone .header-top').remove()
			$('.header--clone .header-middle .search-results').remove()
			$('.header--clone .header-bottom .brands').remove()
		},
		onStick: function() {
			$('.header-middle .search').removeClass('_is-focused')
			$('.header-middle .search-results').removeClass('_is-opened')
		}
	})

	$('.header-middle .burger-megamenu .btn-burger').on('click', function() {
		$(this).toggleClass('_is-toggled')
		$('.header--clone .header-bottom').toggleClass('_is-opened')
	})


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Site header: Toggle search results
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	const headerSearchWrapper = $('.header-middle .search')
	const headerSearchForm = $('.header-middle .search-form-input')
	const headerSearchResults = $('.header-middle .search-results')

	headerSearchForm.on('click', function() {
		headerSearchWrapper.addClass('_is-focused')
		headerSearchResults.addClass('_is-opened')
	})

	$(document).on('click', function(e) {
		if (!headerSearchWrapper.is(e.target) && headerSearchWrapper.has(e.target).length === 0) {
			headerSearchWrapper.removeClass('_is-focused')
			headerSearchResults.removeClass('_is-opened')
		}
	})



	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Site header: Show more menu
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


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Products attributes height
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	window.calcProductCardAttributes = function() {
		$('.card-product').each(function(index, el) {
			const li = $(el).find('.card-attributes > ul > li')
			const shadow = $(el).find('.card-shadow')
			let countHeight = 0

			if (li.length >= 3) {
				li.each(function(index, el) {
					if (index >= 3) {
						$(el).addClass('hidden')
						countHeight += $(el).outerHeight()
					}
				})
			}
			$(el).css('margin-bottom', '-' + countHeight + 'px')
		})
	}
	calcProductCardAttributes()

})
