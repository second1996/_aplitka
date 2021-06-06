$(document).ready(function() {

	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Shop filters
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	window.initShopFilters = function() {
		$('.shop-filters-item.dropdown').on('show.bs.dropdown', function() {
			const filterName = $(this).find('.shop-filters-name'),
						checkboxes = $(this).find('.shop-filters-list input[type="checkbox"]')
			let filtersArr = []

			checkboxes.each(function() {
				if (this.checked) {
					filtersArr.push($(this).siblings('label').text())
				}
			})

			checkboxes.on('change', function() {
				const filterItem = $(this).parents('.shop-filters-item'),
							label = $(this).siblings('label').text()

				if ($(this).is(':checked')) {
					filtersArr.push(label)
				} else {
					for (let el = filtersArr.length - 1; el >= 0; el--) {
						if (filtersArr[el] === label) {
							filtersArr.splice(el, 1);
						}
					}
				}

				if (filtersArr.length > 0) {
					filterItem.addClass('_is-active')
				} else {
					filterItem.removeClass('_is-active')
				}

				filterName.find('.values').html(filtersArr.join(', '))
			})
		})
	}
	initShopFilters()


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Price Filter (noUiSlider)
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	window.initPriceFilter = function() {
		document.querySelectorAll('.shop-filters-price-handle').forEach(slider => {
			let filterMinPrice = parseInt( slider.dataset.slidermin );
			let filterMaxPrice = parseInt( slider.dataset.slidermax );
			let priceFrom      = slider.nextElementSibling.querySelector('.shop-filters-price-from');
			let priceTo        = slider.nextElementSibling.querySelector('.shop-filters-price-to');
			let inputMinPrice  = parseInt( priceFrom.value );
			let inputMaxPrice  = parseInt( priceTo.value );

			// Create noUiSlider
			sliderOptions = {
				start: [inputMinPrice, inputMaxPrice],
				step: 100,
				tooltips: [
					{
						from: function(value) {
							return Math.round(value);
						},
						to: function(value) {
							return 'от ' + Math.round(value) + ' р';
						},
					},
					{
						from: function(value) {
							return Math.round(value);
						},
						to: function(value) {
							return 'до ' + Math.round(value) + ' р';
						},
					}
				],
				connect: true,
				range: {
					'min': filterMinPrice,
					'max': filterMaxPrice
				}
			}
			noUiSlider.create(slider, sliderOptions)

			// Update noUiSlider
			// document.querySelector('.shop-filters-price-handle').noUiSlider.updateOptions(sliderOptions)

			// Change/Update noUiSlider values
			priceFrom.addEventListener('change', priceUpdateValues);
			priceTo.addEventListener('change', priceUpdateValues);

			slider.noUiSlider.on('update', function (values, handle) {
				var value = values[handle];

				// Set «from» value
				if (handle == 0) {
					priceFrom.value = Math.round(value);
				}

				// Set «to» value
				if( handle == 1) {
					priceTo.value = Math.round(value);
				}
			})

			slider.noUiSlider.on('end', function (values, handle) {
				// Trigger «from» input value
				if (handle == 0) {
					$(priceFrom).change()
				}

				// Trigger «to» input value
				if( handle == 1) {
					$(priceTo).change()
				}
			})

			function priceUpdateValues() {
				var priceFromValue, priceToValue;

				// Check if value isn't empty...
				if (priceFrom.value != '') {
					priceFromValue = priceFrom.value;
				}
				if (priceTo.value != '') {
					priceToValue = priceTo.value;
				}

				// ... and change values
				slider.noUiSlider.set([priceFromValue, priceToValue]);
			}
		})
	}
	initPriceFilter()


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Init shop filters
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	window.initFilters = function() {
		// $('[data-toggle="tooltip"]').tooltip('update')

		initShopFilters()
		initPriceFilter()
	}

})
