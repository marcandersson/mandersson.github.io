import Router from '../general/router.js';
import Page from './page.js';

class Nav {

	constructor () {

		// Responsive Menu Button

		document.querySelector('.menu_button').addEventListener('click', this.menuResponsiveActive)

		// Menu

		var buttons = document.querySelectorAll('.menu button');

		for (var button of buttons) {

			button.addEventListener('click', this.navigate.bind(this));

		}

		// Orientation Change

		if (window.mobileAndTabletcheck()) {

			if (screen.orientation.type == 'landscape-primary') {
				document.querySelector('html').classList.add('orientation');
			}

			window.addEventListener("orientationchange", function() {
				
				if (screen.orientation.type == 'landscape-primary') {
					document.querySelector('html').classList.add('orientation');
				}
				else {
					document.querySelector('html').classList.remove('orientation');
				}

			}, false);

		}

		// Scroll

		this.scrollEnabled = true;

		document.querySelector('body').addEventListener('mousewheel', this.scroll.bind(this));

		// Mobile Scroll

		/*document.addEventListener('touchmove', function(e) {
			e.preventDefault();
		}, { passive: false });

		document.addEventListener('touchforcechange', function(e) {
			e.preventDefault();
		}, { passive: false });*/

		var hammertime = new Hammer(document.querySelector('html'));
		
		hammertime.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });

		hammertime.on("pan", this.scrollInverted.bind(this));

		return true;
	}

	menuResponsiveActive (event) {
		
		if (document.querySelector('.menu_button').getAttribute('state') == 'active') {
			document.querySelector('.menu').setAttribute('state','ready');			
			document.querySelector('.menu_button').setAttribute('state','inactive');
			document.querySelector('.logo').setAttribute('state','ready');
		}
		else {
			document.querySelector('.menu_button').setAttribute('state','active');
			document.querySelector('.menu').setAttribute('state','active');
			document.querySelector('.logo').setAttribute('state','active');			
		}

		return true;
	}

	navigate (event) {


		if (event.target.getAttribute('state') != 'active') {

			// Menu

			document.querySelector('.menu button[state="active"]').removeAttribute('state');

			event.target.setAttribute('state', 'active');

			// Responsive Title

			document.querySelector('.responsive_title span:nth-child(2)').innerText = event.target.innerText;

			// Responsive Menu

			if (document.querySelector('.menu').getAttribute('state') == 'active') {
				this.menuResponsiveActive(null);
			}

			// Page

			Page.out(event.target.getAttribute('page'));

		}

		return true;
	}

	orientationChange () {
		return true;
	}

	scroll (event) {
			
		if (this.scrollEnabled) {

			if (document.querySelector('.page[state="ready"] .slide[state="active"]')) {

				if (event.deltaY > 0) {
					Page.scrollDown(this, event);
				}
				else if (event.deltaY < 0) {
					Page.scrollUp(this, event);
				}

			}

		}

		return true;
	}

	scrollInverted (event) {

		if (this.scrollEnabled) {

			if (document.querySelector('.page[state="ready"] .slide[state="active"]')) {

				if (event.deltaY > 0) {
					Page.scrollUp(this, event);
				}
				else if (event.deltaY < 0) {
					Page.scrollDown(this, event);
				}

			}

		}

		return true;
	}

}

export default Nav;