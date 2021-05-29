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


	

})