var labnarMobile = function($) {
	"use strict";

	// HEADER *************************************
	// Menu
	var menu = {
		show: false,
		$header: $('#main-header'),
		cl: 'menu-shown',
		show: function() {
			if (!menu.shown) {
				menu.$header.addClass(menu.cl);
				menu.shown = true;
			}
		},
		hide: function() {
			if (menu.shown) {
				menu.$header.removeClass(menu.cl);
				menu.shown = false;
			}
		},
		toggle: function() {
			if (!menu.shown) {
				menu.show();
			} else {
				menu.hide();
			}
		}
	};
	$('.menu-toggle').click(menu.toggle);
	
	// Finder
	$('#finder').each(function() {
		var $this = $(this),
			shown = false,
			$input = $this.find('input');
		$this.click(function() {
			if (!shown) {
				$this.addClass('in-focus');
				$input.focus();
				shown = true;
			}
		});
		$input.blur(function() {
			$this.removeClass('in-focus');
			shown = false;
		});
	});

	// Frame Navigation
	$('#frame-navigation').each(function() {
		var $this = $(this),
			$a = $this.find('a'),
			current = 0,
			currentId = $a.eq(0).attr('href'),
			moving = false,
			duration = 400;

		$a.each(function(index) {
			$(this).click(function(e) {
				e.preventDefault();
				if (index !== current && !moving) {
					moving = true;
					var direction = (index > current) ? 1 : -1;

					$(currentId).css('left', (-100 * direction) + '%');
					current = index;
					currentId = $(this).attr('href');
					$(currentId).css('left', '0%');

					$a.removeClass('active').eq(index).addClass('active');
					setTimeout(function() {
						moving = false;
					}, duration);
				}
			});
		});

	});


};

jQuery('document').ready(function() {
	labnarMobile(jQuery);
});