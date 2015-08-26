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
	var frameNavigator = (function() {
		var $a = $('#frame-navigation').find('a'),
			current = 0,
			currentId = $a.eq(0).attr('href'),
			moving = false,
			duration = 400,
			fnav = {
				set: function(id) {
					if (id !== currentId && !moving) {
						moving = true;
						var next = -1;
						$a.removeClass('active');
						$a.each(function(index) {
							if ($(this).attr('href') === id) {
								$(this).addClass('active');
								next = index;
							}
						});
						if (next !== -1) {
							var direction = (next > current) ? 1 : -1;
							$(currentId).css('left', (-100 * direction) + '%');
							currentId = id;
							$(currentId).css('left', '0%');
						}
						setTimeout(function() {
							moving = false;
						}, duration);
					}
				}
			};
		$a.click(function(e) {
			e.preventDefault();
			fnav.set($(this).attr('href'));
		});
		return fnav;
	})();

	

};

jQuery('document').ready(function() {
	labnarMobile(jQuery);
});