import Page from '../materials/page.js';

class Router {

	static pushToHistory (state, replaceState = false) {

		new Page(state);

		return true;
	}

}

export default Router;