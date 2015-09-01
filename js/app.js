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
	$('.menu-toggle,#main-menu a').click(menu.toggle);

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

	// TABBER
	$('.tabber').each(function() {
		var $tabber = $(this),
			$a = $tabber.find('a'),
			$content = $('#' + $tabber.attr('for')),
			$frame = $content.find('>.frame'),
			current = 0,
			fixed = $content.hasClass('fixed'),
			setPositions = function() {
				$frame.each(function(i) {
					if (i < current) {
						$(this).css('left', '-100%');
					} else if (i === current) {
						$(this).css('left', '0%');
						if (!fixed) {
							$content.height($(this).height());
						}
					} else {
						$(this).css('left', '100%');
					}
				});
			},
			moving = false,
			change = function(num) {
				if (num !== current && !moving) {
					moving = true;
					var $prev = $frame.eq(current).addClass('anim'),
						$next = $frame.eq(num).addClass('anim');
					current = num;
					$a.removeClass('active').eq(current).addClass('active');
					setPositions();
					$next.one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd otransitionend transitionend', function() {
						$prev.add($next).removeClass('anim');
						moving = false;
					});
				}
			};
		$content.scrollTop(0).scrollLeft(0);
		setPositions();
		$a.each(function(i) {
			$(this).click(function(e) {
				e.preventDefault();
				change(i);
			});
		});
		$(window).resize(setPositions);
	});

	// Click links
	$('.click-link').click(function(e) {
		e.preventDefault();
		var h = $(this).attr('href');
		$(h).click();
	});

	// Video resizing
	(function($videos) {
		var resizeVideo = function($v) {
				var h = Math.round($v.width() * 2 / 3);
				$v.height(h);
			},
			resizeAll = function() {
				$videos.each(function() {
					resizeVideo($(this));
				});
			};
		resizeAll();
		$(window).resize(resizeAll);
		$('#videos-tab').click(resizeAll);
	})($('.videos iframe'));

	// Modal

	/*

	<div class="modal">
    <div class="modal-body">
      <div class="modal-close"><i class="fa fa-times"></i></div>
      <div class="modal-scroller"></div>
    </div>
  </div>
	*/
	var Modal = (function() {

		var $modal = $('<div class="modal"></div>').appendTo('body'),
			$modalBody = $('<div class="modal-body"></div>').appendTo($modal),
			$modalClose = $('<div class="modal-close"><i class="fa fa-times"></i></div>').appendTo($modalBody),
			$modalScroller = $('<div class="modal-scroller"></div>').appendTo($modalBody),
			m = {
				content: function(txt) {
					$modalScroller.html(txt);
					return m;
				},
				show: function() {
					$modal.addClass('show');
					return m;
				},
				hide: function() {
					$modal.removeClass('show');
					return m;
				}
			};
		$modalClose.click(m.hide);

		return m;
	})();
	$('.show-modal').click(function(e){
		e.preventDefault();
		Modal.show();
	});

	// AVISO LEGAL
	Modal.content('<iframe src="legal.html"/>');



};

jQuery('document').ready(function() {
	labnarMobile(jQuery);
});