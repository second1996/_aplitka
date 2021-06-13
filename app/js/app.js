$(document).ready(function() {

	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Fancybox config
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$.fancybox.defaults.animationEffect = 'fade'
	$.fancybox.defaults.buttons = ['zoom', 'thumbs', 'close']
	$.fancybox.defaults.smallBtn = true


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
	$(document).on('click', '.dropdown-menu', function (e) {
		e.stopPropagation()
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	* Switch phone mask in forms
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	function switchPhoneMask(selector) {
		var maskCheckbox = $(selector).find('input[type="checkbox"]'),
				maskInput = $(selector).parent().find('input[type="tel"]');

		if (maskCheckbox.is(':checked')) {
			maskInput.mask('+7 (999) 999-99-99')
			maskInput.attr('placeholder', '+7 (___) ___ __ __')
		} else {
			maskInput.mask('0#')
			maskInput.attr('placeholder', 'Номер телефона')
		}
	}

	window.initSwitchPhoneMask = function() {
		$('.switch-input-mask').each(function(index, element) {
			switchPhoneMask(element)

			$(element).find('input[type="checkbox"]').on('input checked', function() {
				switchPhoneMask(element)
			})
		})
	}
	initSwitchPhoneMask()


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


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Site header: Toggle search results
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	const headerSearchWrapper = $('.header-middle .search')
	const headerSearchForm = $('.header-middle .search-form-input')
	const headerSearchResults = $('.header-middle .search-results')

	headerSearchForm.on('click', function() {
		if ($(this).parents('.header--clone').length == 0) {
			headerSearchWrapper.addClass('_is-focused')
			headerSearchResults.addClass('_is-opened')
		}
	})

	$(document).on('click', function(e) {
		if (!headerSearchWrapper.is(e.target) && headerSearchWrapper.has(e.target).length === 0) {
			headerSearchWrapper.removeClass('_is-focused')
			headerSearchResults.removeClass('_is-opened')
		}
	})


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Site header: Toggle catalog menu
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

	$('.header-middle .burger-megamenu .btn-burger').on('click', function() {
		$(this).toggleClass('_is-toggled')
		$('.header--clone .header-bottom').toggleClass('_is-opened')
	})


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Site header: Toggle mobile menu
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	function mmenuBackdrop() {
		if (!$('.mmenu-backdrop').length) {
			$('body').append('<div class="mmenu-backdrop fade"></div>')
			$('.mmenu-backdrop').delay(5).queue(function() {
				$(this).addClass('show').dequeue()
				$(this).on('click', function () {
					mmenuBackdrop()
					$('body').removeClass('lock-scroll')
					$('.mmenu').removeClass('_is-opened')
				})
			})
		} else {
			$('.mmenu-backdrop').remove()
		}
	}

	// Open menu
	$('.header-middle .burger-mmenu .btn-burger').on('click', function() {
		mmenuBackdrop()

		$('body').addClass('lock-scroll')
		$('.mmenu').addClass('_is-opened')
	})

	// Close menu
	$('.mmenu .mmenu-heading .btn-close').on('click', function() {
		mmenuBackdrop()-

		$('body').removeClass('lock-scroll')
		$('.mmenu').removeClass('_is-opened')
	})


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Site header: Toggle search form on mobile
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$('.header-middle .search .search-btn').on('click', function() {
		$('.header-middle .search .search-btn').toggleClass('_is-toggled')
		$('.header-middle .search .search-form').toggleClass('_is-opened')
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
	* Products attributes height (card shadow)
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	window.calcCardShadow = function() {
		$('.card-product').each(function(index, el) {
			const li = $(el).find('.card-attributes > ul > li')
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
	calcCardShadow()


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* File upload in forms
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$('.form-file').each(function() {
		const uploadInput = $(this).find('input[type="file"]')
		const uploadPlaceholder = $(this).find('.form-file-placeholder .placeholder')
		const uploadName = $(this).find('.form-file-placeholder .name')

		uploadInput.on('change', function() {
			uploadName.text(this.value.split('\\').pop())
	
			if (this.value.split('\\').pop().length) {
				uploadPlaceholder.css('display', 'none')
			} else {
				uploadPlaceholder.css('display', 'block')
			}
		})
	})


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Show more button for catalog categories/rubrics & collection cards
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	window.showMoreButton = function() {
		// Catalog categories, rubrics
		$('.show-more').each(function() {
			const _this = $(this)
			const list = _this.find('.show-more-list > div')
			const btnShow = _this.find('.btn-more--show')
			const btnHide = _this.find('.btn-more--hide')
	
			if (list.length > 6) {
				btnShow.addClass('_is-visible')
				btnShow.on('click', function() {
					$(this).addClass('_is-toggled')
					list.each(function (index, el) {
						if ($(el).is(':hidden')) {
							$(el).addClass('hidden')
							$(el).slideDown(200)
						}
					})
				})
				btnHide.on('click', function() {
					btnShow.removeClass('_is-toggled')
					list.each(function (index, el) {
						if ($(el).hasClass('hidden')) {
							$(el).slideUp(200)
						}
					})
				})
			}
		})
		// Collection card
		$('.exemplars').each(function() {
			const _this = $(this)
			const list = _this.find('.exemplars-item')
			const btnShow = _this.find('.btn-more--show')
			const btnHide = _this.find('.btn-more--hide')
	
			if (list.length > 1) {
				btnShow.addClass('_is-visible')
				btnShow.on('click', function() {
					$(this).addClass('_is-toggled')
					list.each(function (index, el) {
						if ($(el).is(':hidden')) {
							$(el).addClass('hidden')
							$(el).slideDown(200)
						}
					})
				})
				btnHide.on('click', function() {
					btnShow.removeClass('_is-toggled')
					list.each(function (index, el) {
						if ($(el).hasClass('hidden')) {
							$(el).slideUp(200)
						}
					})
				})
			}
		})
	}
	showMoreButton()


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Read more button for paragraphs
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	window.readMoreButton = function() {
		$('.readmore').each(function() {
			const _this = $(this)
			const list = _this.find('.readmore-list').children()
			const btnShow = _this.find('.btn-more--show')
			const btnHide = _this.find('.btn-more--hide')

			if (list.length > 1) {
				btnShow.addClass('_is-visible')

				// list.each(function (index, el) {
				// 	if (index >= 1) $(el).css('display', 'none')
				// })

				btnShow.on('click', function() {
					console.log('clicked');
					$(this).addClass('_is-toggled')
					list.each(function (index, el) {
						if ($(el).is(':hidden')) {
							$(el).addClass('hidden')
							$(el).slideDown(200)
						}
					})
				})
				btnHide.on('click', function() {
					btnShow.removeClass('_is-toggled')
					list.each(function (index, el) {
						if ($(el).hasClass('hidden')) {
							$(el).slideUp(200)
						}
					})
				})
			}
		})
	}
	readMoreButton()

})