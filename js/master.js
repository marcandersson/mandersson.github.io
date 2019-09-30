import Nav from './materials/nav.js';
import Router from './general/router.js';

/* Load chain */

setTimeout(function(){
	document.querySelector('.loader').setAttribute('state', 'ready');

	setTimeout(function() {
		document.querySelector('.menu_button').setAttribute('state','ready');
	}, 850);
	
	setTimeout(function(){
		document.querySelector('.logo').setAttribute('state', 'ready');
	}, 1000);

	setTimeout(function(){
		new Nav();
		document.querySelector('.menu').setAttribute('state', 'ready');
	}, 1500);

	setTimeout(function(){
		document.querySelector('.menu .contact').setAttribute('state', 'ready');
	}, 1950);

	setTimeout(function(){
		document.querySelector('.responsive_title').setAttribute('state','ready');
	}, 2000);

	var delay = 2250;
	if (window.innerWidth < 1366) delay = 1000;

	setTimeout(function(){
		Router.pushToHistory('programming_design');
	}, delay);
}, 4000);