// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  let path = window.location.href;
  if (path.includes('projects') || path.includes('blog')) {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera
    document.documentElement.scrollTop = 0; // For IE and Firefox
}

function toggleDarkMode() {
  const curMode = document.querySelector('.darkModeCheck').checked;
  if (curMode) {
    // turn off
    document.body.classList.remove('dark-theme');
    document.querySelector('#header') && document.querySelector('#header').classList.remove('dark-theme');
    document.querySelector('.nameText') && document.querySelector('.nameText').classList.remove('dark-theme');
    document.querySelector('#typed') && document.querySelector('#typed').classList.remove('dark-theme');
    document.querySelector('.typed-cursor') && document.querySelector('.typed-cursor').classList.remove('dark-theme');
    document.querySelector('#banner') && document.querySelector('#banner').classList.remove('dark-theme');
    document.querySelector('#footer') && document.querySelector('#footer').classList.remove('dark-theme');
    localStorage.removeItem('darkMode');
  } else {
    // add darkMode
    document.body.classList.add('dark-theme');
    document.querySelector('#header') && document.querySelector('#header').classList.add('dark-theme');
    document.querySelector('.nameText') && document.querySelector('.nameText').classList.add('dark-theme');
    document.querySelector('#typed') && document.querySelector('#typed').classList.add('dark-theme');
    document.querySelector('.typed-cursor') && document.querySelector('.typed-cursor').classList.add('dark-theme');
    document.querySelector('#banner') && document.querySelector('#banner').classList.add('dark-theme');
    document.querySelector('#footer') && document.querySelector('#footer').classList.add('dark-theme');
    localStorage.setItem('darkMode', true);
  }
}

(function($) {

	skel.breakpoints({
		wide: '(max-width: 1680px)',
		normal: '(max-width: 1280px)',
		narrow: '(max-width: 980px)',
		narrower: '(max-width: 840px)',
		mobile: '(max-width: 736px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$header = $('#header'),
			$banner = $('#banner');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');
      const curMode = localStorage.getItem('darkMode');
      if (curMode) {
        document.querySelector('.darkModeCheck').checked = true;
        // add darkMode
        document.body.classList.add('dark-theme');
        document.querySelector('#header') && document.querySelector('#header').classList.add('dark-theme');
        document.querySelector('.nameText') && document.querySelector('.nameText').classList.add('dark-theme');
        document.querySelector('#typed') && document.querySelector('#typed').classList.add('dark-theme');
        document.querySelector('.typed-cursor') && document.querySelector('.typed-cursor').classList.add('dark-theme');
        document.querySelector('#banner') && document.querySelector('#banner').classList.add('dark-theme');
        document.querySelector('#footer') && document.querySelector('#footer').classList.add('dark-theme');
      }


			$window.on('load', function() {
				$body.removeClass('is-loading');
			});

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on narrower.
			skel.on('+narrower -narrower', function() {
				$.prioritize(
					'.important\\28 narrower\\29',
					skel.breakpoint('narrower').active
				);
			});

		// Scrolly links.
			$('.scrolly').scrolly({
				speed: 1000,
				offset: -10
			});

		// Dropdowns.
			$('#nav > ul').dropotron({
				mode: 'fade',
				noOpenerFade: true,
				expandMode: (skel.vars.mobile ? 'click' : 'hover')
			});

		// Off-Canvas Navigation.

			// Navigation Button.
				$(
					'<div id="navButton">' +
						'<a href="#navPanel" class="toggle"></a>' +
					'</div>'
				)
					.appendTo($body);

			// Navigation Panel.
				$(
					'<div id="navPanel">' +
						'<nav>' +
							$('#nav').navList() +
						'</nav>' +
					'</div>'
				)
					.appendTo($body)
					.panel({
						delay: 500,
						hideOnClick: true,
						hideOnSwipe: true,
						resetScroll: true,
						resetForms: true,
						side: 'left',
						target: $body,
						visibleClass: 'navPanel-visible'
					});

			// Fix: Remove navPanel transitions on WP<10 (poor/buggy performance).
				if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
					$('#navButton, #navPanel, #page-wrapper')
						.css('transition', 'none');

		// Header.
		// If the header is using "alt" styling and #banner is present, use scrollwatch
		// to revert it back to normal styling once the user scrolls past the banner.
		// Note: This is disabled on mobile devices.
			if (!skel.vars.mobile
			&&	$header.hasClass('alt')
			&&	$banner.length > 0) {

				$window.on('load', function() {

					$banner.scrollwatch({
						delay:		0,
						range:		1,
						anchor:		'top',
						on:			function() { $header.addClass('alt reveal'); },
						off:		function() { $header.removeClass('alt'); }
					});

				});

			}

	});

})(jQuery);
