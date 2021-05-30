$(document).ready(function() {

	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Home heroes banner slider
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	new Swiper('.h-heroes-slider .swiper-container', {
		slidesPerView: 1,
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
		slidesPerView: 6,
		slidesPerGroup: 6,
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
			slidesPerView: 2,
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
					slidesPerView: 3,
					spaceBetween: 24,
				},
				768: {
					slidesPerView: 4,
				},
			}
		})
	})

})