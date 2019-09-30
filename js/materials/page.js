import Router from '../general/router.js';

class Page {

	constructor (state) {

		var xhttp = new XMLHttpRequest();
			
			xhttp.onreadystatechange = function () {
				
				if (xhttp.readyState == 4 && xhttp.status == 200) {

					document.querySelector('.page').innerHTML = xhttp.responseText;
					
					setTimeout(function() {
						document.querySelector('.page').setAttribute('state', 'ready');
						document.querySelector('.page').setAttribute('page', state);
						document.querySelector('.menu button[page="' + state + '"]').setAttribute('state', 'active');

						setTimeout(function(){
							document.querySelector('.page .slide:first-child').setAttribute('state', 'active');
						}, 450);
					}, 25);

				}

			}.bind(state);
			
			xhttp.open('GET', '../../pages/' + state + '.html', true);
			xhttp.send();

	}

	static out (toState) {

		// Slide

		document.querySelector('.page .slide[state="active"]').setAttribute('state', 'out');

		// Page

		setTimeout(function(){
			
			document.querySelector('.page').setAttribute('state','awaiting');

			if (document.querySelector('.page .mouse')) {

				setTimeout(function(){
					return Router.pushToHistory(toState);
				}, 450);

			}
			else {
				return Router.pushToHistory(toState);				
			}

		}, 1000);

	}

	static scrollDown (nav, event) {

		var slide = document.querySelector('.page .slide[state="active"]');
		var slideNext = slide.nextElementSibling;

		if (slideNext.className == 'slide') {

			nav.scrollEnabled = false;

			slide.setAttribute('state','out');

			var delay = 300;
			
			if (slide.querySelector('.quote')) delay = 450;
			else if (slide.querySelector('.photos') || slide.querySelector('.merit')) delay = 600;

			setTimeout(function(){

				slide.removeAttribute('state');
				slideNext.setAttribute('state', 'active');

				var slideNumber = document.querySelector('.slide_number span:first-child');
					slideNumber.innerHTML = parseInt(slideNumber.innerText) + 1;

				delay = 600;
					
				if (event.deltaY != 100 && window.innerWidth > 1365) delay = 2000;

				setTimeout(function() {
					nav.scrollEnabled = true;
				}, delay);

			}, delay);

		}

		return true;
	}

	static scrollUp (nav, event) {

		var slide = document.querySelector('.page .slide[state="active"]');
		var slidePrev = slide.previousElementSibling;

		if (slidePrev) {
			if (slidePrev.className == 'slide') {

				nav.scrollEnabled = false;

				slide.setAttribute('state','out');

				var delay = 300;

				if (slide.querySelector('.quote')) delay = 450;
				else if (slide.querySelector('.photos') || slide.querySelector('.merit')) delay = 600;

				setTimeout(function(){

					slide.removeAttribute('state');
					slidePrev.setAttribute('state', 'active');

					var slideNumber = document.querySelector('.slide_number span:first-child');
						slideNumber.innerHTML = parseInt(slideNumber.innerText) - 1;

					delay = 600;
					
					if (event.deltaY != -100 && window.innerWidth > 1365) delay = 2000;

					setTimeout(function() {
						nav.scrollEnabled = true;
					}, delay);

				}, delay);
				
			}
		}

		return true;
	}

}

export default Page;