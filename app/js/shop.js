$(document).ready(function() {

	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Calc product quantity
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$('.quantity-minus, .quantity-plus').on('click', function() {
		const $this = $(this)

		qtyOperator($this.parents('form').find('input[name="qty"]'), $this.data('qty-action'))
	})

	$('.quantity-amount .value').on('change', function() {
		const $this = $(this)
		const qty = $this.data()

		if ($this.val() >= qty.max) $this.val(qty.max)

		qtyChangeValue($this, Math.ceil($this.val() / qty.one))
	})

	function qtyOperator(qtyInput, action) {
		const qty = qtyInput.data()

		switch (action) {
			case 'minus':
				qty.count = qty.count <= 1 ? 1 : qty.count -= 1
				break
			case 'plus':
				qty.count = qty.count += 1
				break
		}

		return qtyChangeValue(qtyInput, qty.count)
	}

	function qtyChangeValue(qtyInput, count) {
		const form = qtyInput.parents('form')
		const qty = qtyInput.data()

		qty.count = count <= 1 ? 1 : count

		let qtyVal = Math.round((qty.count * qty.one) * 1000) / 1000

		qtyInput.attr('data-count', qty.count).val(qtyVal)
		form.find('.quantity-minus').attr('disabled', qty.count > 1 ? false : true)
		form.find('.itemPrice').text((qty.price * qtyVal).toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 "))
	}


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Toggle shop filters sidebar
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	function filtersBackdrop() {
		if (!$('.mmenu-backdrop').length) {
			$('body').append('<div class="mmenu-backdrop fade"></div>')
			$('.mmenu-backdrop').delay(5).queue(function() {
				$(this).addClass('show').dequeue()
				$(this).on('click', function () {
					filtersBackdrop()
					$('body').removeClass('lock-scroll')
					$('#shop-filters').removeClass('_is-active')
				})
			})
		} else {
			$('.mmenu-backdrop').remove()
		}
	}

	// Open sidebar
	$('#toggle-filters-sidebar').on('click', function() {
		filtersBackdrop()

		$('body').addClass('lock-scroll')
		$('#shop-filters').addClass('_is-active')
	})

	// Close sidebar
	$('#shop-filters .btn-close').on('click', function() {
		filtersBackdrop()

		$('body').removeClass('lock-scroll')
		$('#shop-filters').removeClass('_is-active')
	})


	/**
	*-------------------------------------------------------------------------------------------------------------------------------------------
	* Shop filters
	*-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	window.initShopFilters = function() {
		$('.shop-filters-item').each(function(index, el) {
			let arr = []

			$(el).find('.shop-filters-list input[type="checkbox"]').each(function(index, checkboxEl) {
				if ($(this).is(':checked')) {
					arr.push($(this).siblings('label').text())
					$(el).find('.shop-filters-name').find('.values').html(arr.join(', '))
				}
			})

			if (arr.length > 0) {
				$(el).addClass('_is-active')
			} else {
				$(el).removeClass('_is-active')
			}

			$(el).on('show.bs.dropdown', function() {
				const filterName = $(el).find('.shop-filters-name'),
							checkboxes = $(el).find('.shop-filters-list input[type="checkbox"]')
				let filtersArr = []

				checkboxes.each(function() {
					if ($(this).is(':checked')) {
						filtersArr.push($(this).siblings('label').text())
						filterName.find('.values').html(filtersArr.join(', '))
					}
				})

				$(el).find('.shop-filters-list input[type="checkbox"]').on('change', function(e) {
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
		})
	}
	initShopFilters()


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Price filter (noUiSlider)
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
				// tooltips: [
				// 	{
				// 		from: function(value) {
				// 			return Math.round(value);
				// 		},
				// 		to: function(value) {
				// 			return 'от ' + Math.round(value) + ' р';
				// 		},
				// 	},
				// 	{
				// 		from: function(value) {
				// 			return Math.round(value);
				// 		},
				// 		to: function(value) {
				// 			return 'до ' + Math.round(value) + ' р';
				// 		},
				// 	}
				// ],
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


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Toggle cart checkout tabs
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	$('a[id*="checkout-tab"]').on('click', function(e) {
		e.preventDefault()

		$('a[id*="checkout-tab"]').removeClass('active')
		$(this).addClass('active')

		if (this.id == 'checkout-tab-2') {
			$('.checkout-form').find('.legal-entity').fadeIn(200)
		}

		if (this.id == 'checkout-tab-1') {
			$('.checkout-form').find('.legal-entity').fadeOut(200)
		}
	})


	/**
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	 * Toggle all collection products tabs
	 *-------------------------------------------------------------------------------------------------------------------------------------------
	*/
	window.showAllCollectionTabs = function() {
		$('.collection-products-list > [class*="col"]').clone().appendTo('#products-tab-1 .collection-products-list')
	}
	showAllCollectionTabs()

})
