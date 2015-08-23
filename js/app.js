var labnarMobile = function($) {
	"use strict";

	// HEADER *************************************
	// Menu
	$('#main-header').each(function() {
		var $header = $(this),
			$menuIcon = $('#menu-icon'),
			$menu = $('#main-menu'),
			$menuClose = $('#menu-close').add('#menu-backdrop'),
			shown = false,
			cl = 'menu-shown';

			$menuIcon.click(function(){
				if(!shown){
					$header.addClass(cl);
					shown = true;
				}
			});
			$menuClose.click(function(){
				if(shown){
					$header.removeClass(cl);
					shown = false;
				}
			});
	});
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