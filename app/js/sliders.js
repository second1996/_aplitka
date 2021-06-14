$(document).ready(function() {

	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Home heroes banner slider
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	new Swiper('.h-heroes-slider .swiper-container', {
		slidesPerView: 1,
		speed: 1000,
		autoplay: {
			delay: 2500,
		},
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		navigation: {
			prevEl: '.h-heroes-slider-nav .swiper-button-prev',
			nextEl: '.h-heroes-slider-nav .swiper-button-next',
		},
		pagination: {
			el: '.h-heroes-slider-dots .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
	})


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Home brands slider
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	new Swiper('.h-brands-slider .swiper-container', {
		slidesPerView: 1.5,
		slidesPerGroup: 1,
		spaceBetween: 16,
		navigation: {
			prevEl: '.h-brands-slider-nav .swiper-button-prev',
			nextEl: '.h-brands-slider-nav .swiper-button-next',
		},
		pagination: {
			el: '.h-brands-slider-dots .swiper-pagination',
			type: 'bullets',
			clickable: true,
		},
		breakpoints: {
			768: {
				slidesPerView: 3,
				slidesPerGroup: 3,
			},
			992: {
				slidesPerView: 4,
				slidesPerGroup: 4,
			},
			1240: {
				slidesPerView: 5,
				slidesPerGroup: 5,
			},
			1468: {
				slidesPerView: 6,
				slidesPerGroup: 6,
			},
		},
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Products slider for each section
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$('.products-slider').each(function (index, element) {
		let id = index;

		$(element).addClass(`products-slider-${id}`)

		new Swiper(`.products-slider-${id} .swiper-container`, {
			observer: true,
			observeParents: true,
			slidesPerView: 1.5,
			spaceBetween: 16,
			navigation: {
				prevEl: `.products-slider-${id} .products-slider-nav .swiper-button-prev`,
				nextEl: `.products-slider-${id} .products-slider-nav .swiper-button-next`,
			},
			pagination: {
				el: `.products-slider-${id} .products-slider-dots .swiper-pagination`,
				type: 'bullets',
				clickable: true,
			},
			breakpoints: {
				576: {
					slidesPerView: 2,
				},
				768: {
					slidesPerView: 3,
				},
				992: {
					slidesPerView: 4,
				},
			}
		})
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Collection gallery slider
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	const collectionThumbs = new Swiper('.page-single-collection .gallery-thumbs .swiper-container', {
		spaceBetween: 8,
		slidesPerView: 5,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		breakpoints: {
			576: {
				slidesPerView: 6,
			},
		}
	})

	new Swiper('.page-single-collection .gallery-slider .swiper-container', {
		slidesPerView: 1,
		speed: 1000,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		navigation: {
			prevEl: '.page-single-collection .gallery-slider-nav .swiper-button-prev',
			nextEl: '.page-single-collection .gallery-slider-nav .swiper-button-next',
		},
		thumbs: {
			swiper: collectionThumbs
		},
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Product gallery slider
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	const productThumbs = new Swiper('.page-single-product .gallery-thumbs .swiper-container', {
		spaceBetween: 8,
		slidesPerView: 5,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		breakpoints: {
			576: {
				slidesPerView: 6,
			},
		}
	})

	new Swiper('.page-single-product .gallery-slider .swiper-container', {
		slidesPerView: 1,
		speed: 1000,
		navigation: {
			prevEl: '.page-single-product .gallery-slider-nav .swiper-button-prev',
			nextEl: '.page-single-product .gallery-slider-nav .swiper-button-next',
		},
		thumbs: {
			swiper: productThumbs
		},
	})

})